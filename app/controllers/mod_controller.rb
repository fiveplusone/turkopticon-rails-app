class ModController < ApplicationController

  before_action :authorize, :authorize_as_moderator, :load_person
  layout "moderator"

  # TODO: remove?
  def authorize_as_moderator
    pid = session[:person_id]
    if pid.nil?
      session[:original_uri] = request.url
      flash[:notice] = "Please log in as a moderator."
      redirect_to :controller => "reg", :action => "login"
    else
      @person = Person.find(pid)
      unless !@person.nil? and @person.is_moderator
        session[:original_uri] = request.url
        flash[:notice] = "Please log in as a moderator."
        redirect_to :controller => "reg", :action => "login"
      end
    end
  end

  def utils
  end

  def close_account

  end

  def do_close_account
    person = Person.find(params[:person][:id].to_i)
    if person.nil?
      flash[:error] = "Sorry, couldn't find an account with person ID " + params[:person][:id] + "."
      redirect_to :action => "close_account"
    elsif person.close
      flash[:notice] = "Account with person ID " + params[:person][:id] + " closed."
      redirect_to :action => "close_account"
    else
      flash[:error] = "An unexpected error occurred. The user account was found but for some reason could not be closed."
      redirect_to :action => "close_account"
    end
  end

  def mute_person
  end

  def do_mute_person
    begin
      person_to_mute = Person.find(params[:person][:id])
    rescue ActiveRecord::RecordNotFound
      flash[:error] = "Sorry, there doesn't seem to be an account with that person ID."
      redirect_to :action => "mute_person" and return
    end
    person_to_mute.update_attributes(:muted => true, :muted_by_person_id => session[:person_id], :muted_until => Time.now + 48.hours)
    flash[:notice] = "Account with ID #{person_to_mute.id.to_s} muted for 48 hours."
    redirect_to :action => "mute_person"
  end

  def search_by_email
    if request.post?
      @searched = true
      @email = params[:person][:email]
      @result = Person.find_by_email(@email)
    end
  end

  def reassign_report_to_different_requester
  end

  def do_reassign_report_to_different_requester
    begin
      report = Report.find(params[:report][:id].strip)
    rescue ActiveRecord::RecordNotFound
      flash[:error] = "Sorry, there doesn't seem to be a review with that ID (#{params[:report][:id].strip}) in the Turkopticon database."
      redirect_to :action => "reassign_report_to_different_requester" and return
    end
    begin
      newreq = Requester.find(params[:report][:new_req_id].strip)
    rescue ActiveRecord::RecordNotFound
      flash[:error] = "Sorry, there doesn't seem to be a requester with that ID (#{params[:report][:new_req_id].strip}) in the Turkopticon database."
      redirect_to :action => "reassign_report_to_different_requester" and return
    end
    oldreq = report.requester
    report.update_attributes(:requester_id => params[:report][:new_req_id].strip, :amzn_requester_name => newreq.amzn_requester_name, :amzn_requester_id => newreq.amzn_requester_id)
    oldreq.cache_columns
    newreq.cache_columns
    # log:
    t = Time.now.strftime("%H:%M %a %b %d %Y")
    ip = request.remote_ip
    person_id = session[:person_id]
    ReviewReassignLogger.info "[#{t}] User #{person_id.to_s} (#{ip}) reassigned review #{report.id.to_s} from requester #{oldreq.id.to_s} to requester #{newreq.id.to_s}"
    flash[:notice] = "Review #{report.id.to_s} assigned to new requester."
    redirect_to :action => "reassign_report_to_different_requester"
  end

  # TODO: remove
  def xxx_do_reassign_report_to_different_requester
    @report = Report.find(params[:report_id])
    newreqid = params[:new_req_id]
    oldreq = @report.requester
    newreq = Requester.find(newreqid)
    if true
    end
    if params[:new_req_id] and params[:new_req_name]
      # see if requester object with that amzn id and name exists; if yes, get TO req id; if not, create, then get TO req id
      # update report attributes (requester_id, amzn req id, amzn req name)
      # update old requester object cache columns
      # update new requester object cache columns
    else
      # error (display in flash notice)
    end
  end

  def lock_thread
    @report = Report.find(params[:id])
    locktime = Time.now + 48.hours
    @report.update_attributes(:locked_by_person_id => session[:person_id], :locked_until => locktime)
    flash[:notice] = "The thread will be locked until " + locktime.strftime("%a %b %d %Y %H:%M %Z")
    redirect_to :controller => "main", :action => "report", :id => @report.id
  end

  def edit_rules
    @rv = RulesVersion.new(params[:rules_version])
    if request.post?
      @rv.edited_by_person_id = session[:person_id]
      @rv.save
      old = RulesVersion.current
      old.update_attributes(:is_current => nil)
      new_body = @rv.body.gsub("\n", "<br/>")
      @rv.update_attributes(:parent_id => old.id, :body => new_body, :is_current => true)
      render :text => "Instructions updated."
    end
  end

  def index
    @title = "Reviews with no flags"
    @reports = Report
      .where("requester_id is not null and ignore_count = 0 and is_flagged is null")
      .paginate(:page => params[:page])
      .order("id DESC")
  end

  def flagged
    @title = "Reviews with new flags"
    @reports = Report
      .where("is_flagged = 1 and ignore_count = 0 and is_hidden is null")
      .paginate(:page => params[:page])
      .order("id DESC")
    render :action => "index"
  end

  def ignored
    @title = "Reviews with ignored flags"
    @reports = Report
      .where("is_flagged = 1 and ignore_count > 0")
      .paginate(:page => params[:page])
      .order("updated_at DESC")
    render :action => "index"
  end

  def multi_ignored
    @title = "Reviews with ignored flags"
    @reports = Report
      .where("is_flagged = 1 and ignore_count > 1")
      .paginate(:page => params[:page])
      .order("id DESC")
    render :action => "index"
  end

  def hidden
    @title = "Hidden reviews"
    @reports = Report
      .where("is_flagged = 1 and is_hidden = 1")
      .paginate(:page => params[:page])
      .order("id DESC")
    render :action => "index"
  end

  def flag
    @report = Report.find(params[:id])
    if request.post?
      @flag = Flag.new(report: @report, person_id: session[:person_id], comment: params[:flag][:comment])
      if params[:flag][:comment].blank?
        @flag.errors[:base] << 'Please add a comment'
        render partial: 'flag', status: :unprocessable_entity
        return
      end
      pfc = params[:flag][:comment]
      @other_explanation = params[:flag][:other_explanation].to_s
      if pfc == "other"
        if @other_explanation.length < 20 || @other_explanation.length > 500
          @flag.errors[:base] << 'Explanation must be between 20 and 500 characters'
          render partial: 'flag', status: :unprocessable_entity
          return
        else
          @flag.comment = pfc + ": " + @other_explanation
        end
      end
      if @flag.save and @report.update_flag_data
        @report.update_attributes(:flag_count => @report.flags.count)
        flash.now[:success] = 'Report was flagged.'
        render partial: 'report', locals: { report: @report }
      end
    else
      @flag = Flag.new
      render partial: 'flag'
    end
  end

  def agree_with_flagger
    Flag.create(:person_id => session[:person_id], :report_id => params[:id], :comment => "agree w/ flagger")
    report = Report.find(params[:id])
    report.update_flag_data
    report.update_attributes(:flag_count => report.flags.count)
    flash[:notice] = "Added new flag to report #{params[:id]} with text 'agree w/ flagger'."
    redirect_to :action => "flagged"
  end

  def ignore
    Ignore.create(:person_id => session[:person_id], :report_id => params[:id])
    report = Report.find(params[:id])
    report.update_attributes(:ignore_count => report.ignores.count)
    flash[:notice] = "Ignored flags on report #{params[:id]}."
    redirect_to :action => "flagged"
  end

  def comment
    @report = Report.find(params[:id])
    if request.post?
      @comment = Comment.new(report: @report, person_id: session[:person_id], body: params[:comment][:body])

      if @comment.valid?
        ActiveRecord::Base.transaction do
          @comment.save!
          @report.update!(comment_count: @report.comments.count)
        end

        flash.now[:success] = "Comment added to report #{params[:id]}."
        render partial: 'report', locals: { report: @report }
      else
        render partial: 'comment', status: :unprocessable_entity
      end
    else
      render partial: 'comment'
    end
  end

  def disable_commenting
    # remember @person is the logged in person
    p = Person.find(params[:id])
    p.update_attributes(:can_comment => false, :commenting_request_ignored => true, :commenting_disabled_by => @person.id, :commenting_disabled_at => Time.now)
    render :text => "Disabled commenting for user #{params[:id]} / #{p.public_email}."
  end

  def enable_commenting
    # remember @person is the logged in person
    p = Person.find(params[:id])
    p.update_attributes(:can_comment => true, :commenting_enabled_by => @person.id, :commenting_enabled_at => Time.now)
    render :text => "Enabled commenting for user #{params[:id]} / #{p.public_email}."
  end

  def enable_commenting_form
  end

  def disable_commenting_form
  end

  def do_enable_commenting
    # remember @person is the logged in person
    p = Person.find(params[:person][:id])
    p.update_attributes(:can_comment => true, :commenting_enabled_by => @person.id, :commenting_enabled_at => Time.now)
    flash[:notice] = "Enabled commenting for user #{params[:person][:id]} / #{p.public_email}."
    redirect_to :controller => "mod", :action => "enable_commenting_form"
  end

  def do_disable_commenting
    # remember @person is the logged in person
    p = Person.find(params[:person][:id])
    p.update_attributes(:can_comment => false, :commenting_request_ignored => true, :commenting_disabled_by => @person.id, :commenting_disabled_at => Time.now)
    flash[:notice] = "Disabled commenting for user #{params[:person][:id]} / #{p.public_email}."
    redirect_to :controller => "mod", :action => "disable_commenting_form"
  end

  def convert_other_persons_flag
    @flag = Flag.find(params[:id])
    @requester = @flag.report.requester
    @report = @flag.report
    @flag.convert_to_comment_by(@flag.person, @person)
    @report.update_attributes(:flag_count => @report.flags.count, :comment_count => @report.comments.count)
    redirect_to :controller => "main", :action => "report", :id => @report.id
  end

  # TODO: remove?
  def convert_other_mods_flag
    @flag = Flag.find(params[:id])
    @requester = @flag.report.requester
    @report = @flag.report
    @flag.convert_to_comment_by(@person)
    @report.update_attributes(:flag_count => @report.flags.count, :comment_count => @report.comments.count)
    redirect_to :controller => "main", :action => "report", :id => @report.id
  end

  private

  def load_person
    @person = Person.find(session[:person_id])
  end
end
