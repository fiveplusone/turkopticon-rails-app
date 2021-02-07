class ForumController < ApplicationController

  before_action :authorize
  before_action :authorize_as_commenter, :only => [:new_post, :edit_post, :delete_post, :thank, :inappropriate, :unthank, :uninappropriate]

  layout "forum"

  def index
    # get all posts with null parent ID
    @posts = ForumPost.where(:parent_id => nil, :deleted => nil).reject{|p| p.score <= -5.0 and p.has_inappro}.sort_by{|p| p.last_reply_at || p.updated_at}.reverse
  end

  def new_post
    # make new post and post_version objects
    # if request is post, check for errors, save new objects if OK
    @post = ForumPost.new(params[:forum_post].permit(:parent_id), person: current_user)
    @post.thread_head = ForumPost.find(@post.parent_id).thread_head if @post.parent_id
    @thread_head = ForumPost.find(@post.thread_head) if @post.thread_head
    @post_version = ForumPostVersion.new(**params[:forum_post_version].permit(:title, :body), person: current_user, ip: request.remote_ip)
    if request.post?
      unless current_user.email_verified
        flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Sorry, you must verify your email address before you can post. You may #{helpers.link_to 'send the verification email again', controller: 'reg', action: 'send_verification_email'}."
        render :action => "new_post" and return
      end
      if params[:forum_post_version][:body].blank?
        flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Please put something in the post body."
        render :action => "new_post" and return
      end
      if params[:forum_post][:parent_id].nil? and params[:forum_post_version][:title].blank?
        flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Please give the post a title."
        render :action => "new_post" and return
      end
      ActiveRecord::Base.transaction do
        # set initial post score to user's karma
        # create FPI object if it doesn't exist yet (and set karma to 1)
        fpi = ForumPersonInfo.create_with(karma: 1).find_or_create_by!(person: current_user)

        @post.score = fpi.karma
        @post.save!
        @post_version.post_id = @post.id
        @post_version.save!
        @thread_head&.update_replies
        @post.update!(thread_head: @post.id) if @post.parent_id.blank?
      end

      flash[:notice] = "Post saved."
      rid = @post.parent_id.nil? ? @post.id : @post.thread_head
      redirect_to controller: 'forum', action: 'show_post', id: rid, anchor: "post-#{@post.id}"
    end
  end

  def show_post
    post = ForumPost.find(params[:id])
    if post.parent_id.nil?
      # user requested a thread head
      post.increment_views
      @posts = post.reply_posts
    else
      # user is requesting a post in the middle of a thread
      # redirect to thread head with anchor
      redirect_to controller: 'forum', action: 'show_post', id: post.thread_head, anchor: "post-#{post.id}"
    end
  end

  def post_versions
    @post = ForumPost.find(params[:id])
    @versions = @post.versions.reverse
  end

  def edit_post
    @post = ForumPost.find(params[:id])
    @current_version = @post.current_version
    @post_version = ForumPostVersion.new(
      **params[:forum_post_version].permit(:title, :body),
      person: current_user,
      ip: request.remote_ip,
    )
    if request.post?
      if params[:forum_post_version][:body].blank?
        flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Please put something in the post body."
        render :action => "edit_post" and return
      end
      if @post.nil? and params[:forum_post_version][:title].blank?
        flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Please give the post a title."
        render :action => "edit_post" and return
      end
      if @post.save and @post_version.save and @post_version.update_attributes(:post_id => @post.id) and @current_version.update_attributes(:next => @post_version.id)
        flash[:notice] = "Post saved."
        redirect_to :action => "show_post", :id => @post.id
      end
    end
  end

  def delete_post
    @post = ForumPost.find(params[:id])
    @post_version = ForumPostVersion.create(
      person: current_user,
      post_id: @post.id,
      body: 'This post was deleted.',
      ip: request.remote_ip,
    )
    @post.current_version.update_attributes(:next => @post_version.id)
    @post.update_attributes(:deleted => true)
    flash[:notice] = "The post was deleted."
    if @post.parent_id.nil?
      redirect_to :action => "index"
    else
      redirect_to :action => "show_post", :id => @post.parent_id
    end
  end

  def thank
    # if this person has already thanked this post, tell them and send them back
    if ReputationStatement.find_by(person: current_user, post_id: params[:id], statement: 'thanks')
      flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Sorry, you have already given thanks for this post!"
      redirect_to :action => "show_post", :id => params[:id] and return
    end

    # if this person has already thanked three times in the last 24 hours,
    # tell them they have to wait and send them back
    if ReputationStatement.where(person: current_user, statement: 'thanks').where('created_at > ?', Time.now - 1.day).count >= 3
      flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Sorry, you can only leave 3 \"thanks\" per day, and you have already left 3 in the last 24 hours. You can delete one or wait."
      redirect_to :action => "show_post", :id => params[:id] and return
    end

    person_info = ForumPersonInfo.find_by(person: current_user)
    if person_info.nil?
      person_info = ForumPersonInfo.create(person: current_user)
    end
    effect = person_info.up_effect
    pid = ForumPost.find(params[:id]).person_id  # person who posted the post
                                                 # being rated

    # block self-thanking
    if pid == current_user.id
      flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Please don't try to thank yourself :-/"
      redirect_to :action => "show_post", :id => params[:id] and return
    end

    ReputationStatement.create(
      person: current_user,
      post_id: params[:id],
      statement: "thanks",
      effect: effect,
      ip: request.remote_ip,
    )
    fpi = ForumPersonInfo.find_by_person_id(pid)
    if fpi.nil?
      fpi = ForumPersonInfo.create(:person_id => pid, :karma => 1)
    end
    current_karma = fpi.karma
    fpi.update_attributes(:karma => current_karma + 0.1 * effect)
    fp = ForumPost.find(params[:id])
    if fp.score.nil?
      new_score = effect
    else
      new_score = fp.score + effect
    end
    fp.update_attributes(:score => new_score)
    redirect_to :action => "show_post", :id => params[:id]
  end

  def inappropriate
    # if the user flagging has already flagged this post, say so and send them back
    if ReputationStatement.find_by(person: current_user, post_id: params[:id], statement: 'inappropriate')
      flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>You've already flagged this post as inappropriate."
      redirect_to :action => "show_post", :id => params[:id] and return
    end

    # if this person has already left 1 'inappropriate' flag in the last 24 hours
    # tell them they have to wait and send them back
    if ReputationStatement.where(person: current_user, statement: 'inappropriate').where('created_at > ?', Time.now - 1.day).count >= 1
      flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Sorry, you can only leave 1 \"inappropriate\" flag per day, and you have already left one in the last 24 hours. You can delete it or wait."
      redirect_to :action => "show_post", :id => params[:id] and return
    end

    person_info = ForumPersonInfo.find_by(person: current_user)
    if person_info.nil?
      person_info = ForumPersonInfo.create(person: current_user)
    end
    effect = person_info.down_effect
    pid = ForumPost.find(params[:id]).person_id  # person who posted the post
                                                 # being rated
    ReputationStatement.create(
      person: current_user,
      post_id: params[:id],
      statement: 'inappropriate',
      effect: effect,
      ip: request.remote_ip,
    )
    fpi = ForumPersonInfo.find_by_person_id(pid)
    if fpi.nil?
      fpi = ForumPersonInfo.create(:person_id => pid, :karma => 1)
    end
    current_karma = fpi.karma
    fpi.update_attributes(:karma => current_karma + 0.1 * effect)
    fp = ForumPost.find(params[:id])
    if fp.score.nil?
      new_score = effect
    else
      new_score = fp.score + effect
    end
    fp.update_attributes(:score => new_score)
    redirect_to :action => "show_post", :id => params[:id]
  end

  def unthank
    rs = ReputationStatement.find_by(person: current_user, post_id: params[:id])
    # update post score
    fp = ForumPost.find(params[:id])
    fp.update_attributes(:score => fp.score - rs.effect)
    # update posting user karma
    fpi = ForumPersonInfo.find_by_person_id(fp.person_id)
    fpi.update_attributes(:karma => fpi.karma - 0.1 * rs.effect)
    rs.destroy
    redirect_to :action => "show_post", :id => params[:id]
  end

  def uninappropriate
    # assume each user only has a "thank" OR an "inappropriate" on any post;
    # as a result we can use the same method for both
    redirect_to :action => "unthank", :id => params[:id]
  end

  def posts_by
    @posts = ForumPost.where(:person_id => params[:id])
    render :action => "show_post"  # this is currently a confusing view; should be improved before making public
  end

  def about
  end

  private

  def authorize_as_commenter
    return true if current_user.can_comment?

    flash[:notice] = "<style type='text/css'>#notice { background-color: #f00; }</style>Sorry, only people with commenting ability can do that.</style>"
    redirect_to action: 'index'
  end
end
