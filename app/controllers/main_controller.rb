class MainController < ApplicationController

  before_action :authorize, :except => [:info, :help, :blog, :post, :requesters, :rules, :data_use_policy]
  before_action :check_for_existing_report, :only => :add_report
  before_action :verify, :only => :add_report
  before_action :authorize_as_commenter, :only => [:add_comment, :add_flag]

  # TODO: add a link to this
  def pri
  end

  def data_use_policy
  end

  # TODO: check into version control - it's a static page right now just on the server
  def survey2016
    redirect_to "/2016survey/"
  end

  def request_commenting
    Person.find(session[:person_id]).update_attributes(:commenting_requested => true, :commenting_requested_at => Time.now)
    flash[:notice] = "You've requested commenting. Commenting should be enabled within 24 hours if your account is in good standing. If you don't get an email indicating you have received commenting, check back tomorrow anyway."
    redirect_to :action => "index"
  end

  def index
    @pagetitle = "reports"
    @location = "reports" #if params[:id].nil? # commented this out to get the order option link (see ll. 45-46 below and ./_tabs.haml)
    if params[:id].nil?
      cond = "requester_id is not null and is_hidden is not true"
    elsif !Requester.find_by_amzn_requester_id(params[:id]).nil?
      cond = {:amzn_requester_id => params[:id]}
      if params[:hidden]
        cond[:is_hidden] = true
      else
        cond[:is_hidden] = nil
      end
    elsif !Requester.find(params[:id]).nil?
      cond = {:requester_id => params[:id]}
    end
    default_order = Person.find(session[:person_id]).order_reviews_by_edit_date ? "updated_at DESC" : "id DESC"
    @reports = Report.where(cond).paginate(:page => params[:page]).order(default_order)
  end

  def averages
    @pagetitle = "stats"
    if params[:id].nil?
      render :text => "Which requester were you looking for stats for? Try turkopticon.info/aves/[AMT requester ID]."
    else
      @requesters = [Requester.find_by_amzn_requester_id(params[:id])]
    end
  end

  def report
    @pagetitle = "report"
    @reports = Report.find(params[:id])
    render :action => "index"
  end

  def reports_by
    @person = Person.find(params[:id])
    @display_name = Person.find(session[:person_id]).is_moderator ? @person.mod_display_name : @person.public_email
    @pagetitle = "reports by " + @display_name
    default_order = Person.find(session[:person_id]).order_reviews_by_edit_date ? "updated_at DESC" : "id DESC"
    @reports = Report.where(:person_id => params[:id]).paginate(:page => params[:page]).order(params[:order] ||= default_order)
    @location = "reports by"
    render :action => "index"
  end

  def reports_by_ip
    @reports = Report.where(:ip => params[:ip])
    render :action => "flagged_by"
  end

  def reports_by_one_page
    @person = Person.find(params[:id])
    @display_name = Person.find(session[:person_id]).is_moderator ? @person.mod_display_name : @person.public_email
    @pagetitle = "reports by " + @display_name + " (one page)"
    @reports = @person.reports.reverse
    render :action => "flagged_by"
  end

  def flagged_by
    @person = Person.find(params[:id])
    @display_name = Person.find(session[:person_id]).is_moderator ? @person.mod_display_name : @person.public_email
    @pagetitle = "reports flagged by " + @display_name
    @reports = @person.flags.map{|f| f.report}
  end

  def comments_by
    @person = Person.find(params[:id])
    @display_name = Person.find(session[:person_id]).is_moderator ? @person.mod_display_name : @person.public_email
    @pagetitle = "reports commented on by " + @display_name
    @reports = @person.comments.map{|f| f.report}
    render :action => "flagged_by"
  end

  def all_by
    @person = Person.find(params[:id])
    @display_name = Person.find(session[:person_id]).is_moderator ? @person.mod_display_name : @person.public_email
    @pagetitle = "reports flagged or commented on by " + @display_name
    @reports = @person.flags.map{|f| f.report} + @person.comments.map{|f| f.report}
    render :action => "flagged_by"
  end

  def my_flagged
    @pagetitle = "reviews flagged by you"
    @location = "my_flagged"
    @reports = Report.joins(:flags).where(flags: { person_id: session[:person_id] }).distinct.paginate :page => params[:page]
    @no_flags = true if @reports.empty?
    render :action => "index"
  end

  def flagged
    @pagetitle = "flagged reviews"
    @location = "flagged"
    @reports = Report.where(:is_flagged => true, :is_hidden => nil).paginate(:page => params[:page]).order("id DESC")
    @no_flags = true if @reports.empty?
    render :action => "index"
  end

  def hidden
    @pagetitle = "hidden reviews"
    @location = "hidden"
    @reports = Report.where(:is_hidden => true).paginate(:page => params[:page]).order("id DESC")
    render :action => "index"
  end

  def my_reviews
    @pagetitle = "your reviews"
    @location = "my_reviews"
    if Person.find(session[:person_id]).most_recent_first_in_my_reviews
      @reports = Report.where(:person_id => session[:person_id]).paginate(:page => params[:page]).order("id DESC")
    else
      @reports = Report.where(:person_id => session[:person_id]).paginate(:page => params[:page])
    end
    @no_reviews = true if @reports.empty?
    render :action => "index"
  end

  def php_search
    search_term = params[:query]
    if search_term.match?(/\AA[0-9A-Z]{9,}\z/)
      search_condition = 'reports.amzn_requester_id = ?'
      search_string = search_term
    else
      search_condition = 'reports.amzn_requester_name like ?'
      search_string = "%#{search_term}%"
    end

    sql = <<~SQL
      SELECT
        reports.amzn_requester_id,
        reports.amzn_requester_name,
        reports.id AS to_report_id,
        reports.fair,
        reports.fast,
        reports.pay,
        reports.comm,
        reports.description AS text,
        reports.person_id AS reviewer_id,
        reports.created_at,
        reports.tos_viol,
        reports.displayed_notes,
        reports.is_flagged,
        reports.is_hidden,
        reports.flag_count,
        reports.comment_count,
        people.id,
        people.display_name
      FROM people, reports
      WHERE #{search_condition}
      AND reports.amzn_requester_id IS NOT NULL
      AND reports.amzn_requester_name IS NOT NULL
      AND reports.is_hidden IS NULL
      AND people.id = reports.person_id
      ORDER BY reports.amzn_requester_name, to_report_id DESC
    SQL

    sql = ActiveRecord::Base.sanitize_sql([sql, search_string])

    query_start_time = Time.now
    @reports = ActiveRecord::Base.connection.select_all(sql)
    @query_time = Time.now - query_start_time

    @result_count = @reports.count
    @requester_count = @reports.map { |r| r['amzn_requester_id'] }.uniq.count
  end

  def requesters
    @pagetitle = "requesters"
    @location = "requesters"
    order = params[:order] ||= "updated_at DESC"
    safe_order_values = ["updated_at DESC", "updated_at ASC", "amzn_requester_name DESC", "amzn_requester_name ASC", "nrs ASC", "nrs DESC", "ava ASC", "ava DESC"]
    if safe_order_values.include?(order)
      cond = ["updated_at > ?", Time.now - 5.days]
      page = params[:page]
      @requesters = Requester.where(cond).paginate(:page => page).order(order)
    else
      render :text => "Sorry, something broke."
    end
  end

  def all_requesters
    @pagetitle = "requesters"
    @location = "requesters"
    @requesters = Requester.paginate :page => params[:page], :order => params[:order] ||= "amzn_requester_name ASC"
    respond_to do |format|
      format.html  # requesters.haml
      format.csv {
        content = Requester.report_table(:all,
					:only => ['amzn_requester_id', 'amzn_requester_name'],
					:methods => [:comm, :pay, :fair, :fast, :report_count, :reporter_count]).as(:csv)
        send_data(content, :filename => 'turkopticon_report_' + Time.now.strftime("%Y%m%d_%H%M") + ".csv", :type => "application/csv")
      }
    end
  end

  def add_report
    @pagetitle = "add report"
    @report = Report.new(params[:report])
    if request.post?
      if params[:requester][:amzn_id].blank?
        flash[:notice] = "<div class=\"error\">Please fill in the requester ID.</div>"
        render :action => "add_report" and return
      end
      unless params[:requester][:amzn_id] =~ /\AA[0-9A-Z]{9,}\z/
        flash[:notice] = "<div class=\"error\">Please enter a Mechanical Turk requester ID in the requester ID field.</div>"
        render :action => "add_report" and return
      end
      if params[:requester][:amzn_name].blank? or params[:requester][:amzn_name] == "null"
        flash[:notice] = "<div class=\"error\">Please fill in the requester name.</div>"
        render :action => "add_report" and return
      end
      if params[:requester][:amzn_name] == "undefined"
        flash[:notice] = "<div class=\"error\">Please fill in the requester name and update your version of Turkopticon.</div>"
        render :action => "add_report" and return
      end
      if params[:requester][:amzn_name] != ActionView::Base.full_sanitizer.sanitize(params[:requester][:amzn_name])
        flash[:notice] = "<div class=\"error\">Please remove the HTML from the requester name and update your version of Turkopticon.</div>"
        render :action => "add_report" and return
      end
      if params[:report][:description].blank?
        flash[:notice] = "<div class=\"error\">Please fill in the report description.</div>"
        render :action => "add_report" and return
      end
      if params[:report][:fair] == "1" and params[:report][:fast] == "1" and params[:report][:pay] == "1" and params[:report][:comm] == "1"
        unless params[:onebomb] and params[:onebomb][:onebomb] == "1"
          flash[:notice] = "<p class=\"box error\">It looks like you rated <strong>all</strong> the fields 1. Please only rate applicable attributes. Examples: Select \"N/A\" for communication if you have not tried to contact the requester. Also, if you just submitted the hit, please wait to rate the requester's speed. For any other questions please check <a href=\"#howto\" style=\"color: #000; text-decoration: underline\">our information on how to review</a>. If you have tried to contact the requester, have received an approval or rejection, and you really meant to rate all 1s, you can check the appropriate box below. Thank you!</p>"
          params[:onebombbox] = true
          render :action => "add_report" and return
        end
      end
      if params[:report][:pay_bucket] == "nil"
        params[:report][:pay_bucket] = nil
      end
      if @report.save
        Person.find(session[:person_id]).update_attributes(:latest_review_at => @report.created_at)
        @report.update_attributes(:amzn_requester_name => params[:requester][:amzn_name])
        r = Requester.find_by_amzn_requester_id(params[:requester][:amzn_id])
        if !r.nil? and r.amzn_requester_name == "null"
          r.update_attributes(:amzn_requester_name => params[:requester][:amzn_name])
        end
        if r.nil?
          Requester.new(:amzn_requester_id => params[:requester][:amzn_id], :amzn_requester_name => params[:requester][:amzn_name]).save
          r = Requester.find_by_amzn_requester_id(params[:requester][:amzn_id])
        end
        if @report.update_attributes(:requester_id => r.id, :amzn_requester_id => r.amzn_requester_id)

          t = Time.now.strftime("%H:%M %a %b %d %Y")
          ip = request.remote_ip

          %w{comm pay fair fast}.each do |a|
            @report.update(a => 0) if @report.public_send(a).nil?
          end
          r.cache_columns
          flash[:notice] = "<div class=\"success\">Report successfully saved.</div>"
          rurl = params[:url][:url].blank? ? "https://www.mturk.com/mturk/findhits?match=false" : params[:url][:url]
          redirect_to rurl + "&updated=" + params[:requester][:amzn_id]
        end
      end
    end
  end

  def add_flag
    @report = Report.find(params[:id])
    @flag = Flag.new(report: @report, person_id: session[:person_id], comment: params[:flag][:comment])
    if request.post?
      if params[:flag][:comment].blank?
        @flag.errors[:base] << 'Please add a comment'
        render partial: 'flag', status: :unprocessable_entity
        return
      end
      pfc = params[:flag][:comment]
      pfce = params[:flag][:other_explanation]
      l = pfce.length if pfce
      default_pfce = "explanation for 'other', min. 20 chars, max. 500"
      if pfc == "other"
        if pfce == default_pfce or (!l.nil? and (l < 20 or l > 500))
          @other_explanation = pfce
          @flag.errors[:base] << 'Explanation must be between 20 and 500 characters'
          render partial: 'flag', status: :unprocessable_entity
          return
        else
          @flag.comment = pfc + ": " + pfce
        end
      end
      if @flag.save and @report.update_flag_data
        @report.update_attributes(:flag_count => @report.flags.count)
        flash.now[:success] = 'Report was flagged.'
        render partial: 'main/report', locals: { report: @report }
      end
    end
  end

  def flag
    @report = Report.find(params[:id])
    @flag = Flag.new

    render partial: 'flag'
  end

  # this one is deprecated in favor of convert_flag below
  def unflag
    @flag = Flag.find(params[:id])
    @requester = @flag.report.requester
    @report = @flag.report
    @flag.destroy
    @report.update_flag_data
    flash[:notice] = "Your flag was removed from the review."
    redirect_to :action => "index", :id => @requester.amzn_requester_id
  end

  def convert_flag
    @flag = Flag.find(params[:id])
    @requester = @flag.report.requester
    @report = @flag.report
    @flag.convert_to_comment
    @report.update_attributes(:flag_count => @report.flags.count, :comment_count => @report.comments.count)
    # @report.update_flag_data  # this is handled by Flag::convert_to_comment
    redirect_to :action => "index", :id => @requester.amzn_requester_id
  end

  def add_comment
    @report = Report.find(params[:id])
    @comment = Comment.new(params[:comment])
    if request.post?
      if params[:comment][:body].blank?
        flash[:notice] = "<div class=\"error\">Please add a comment.</div>"
        render :action => "add_comment", :id => @report.id and return
      end
      if @comment.save
        @report.update_attributes(:comment_count => @report.comments.count)
        flash[:notice] = "<div class=\"success\">Comment added.</div>"
        redirect_to :controller => "main", :action => "index", :id => @report.requester_amzn_id
      end
    end
  end

  def report
    @report = Report.find(params[:id])
  end

  def edit_report
    @pagetitle = "edit report"
    @report = Report.find(params[:id])
    if session[:person_id] == @report.person_id or Person.find(session[:person_id]).is_admin or Person.find(session[:person_id]).is_moderator
      @requester = Requester.find(@report.requester_id)
      if request.post? and @report.update_attributes(params[:report])
        editor = ""
        if session[:person_id] == @report.person_id
          editor = "the author "
        else
          editor = "<strong>" + Person.find(session[:person_id]).public_email + "</strong> "
        end
        note = "This review was edited by " + editor + Time.now.strftime("%a %b %d %H:%M %Z") + ".<br/>"
        @report.update_attributes(:displayed_notes => note + @report.displayed_notes.to_s)
        @requester.cache_columns
        flash[:notice] = "<div class=\"success\">Report updated.</div>"
        redirect_to :action => "index"
      end
    else
      flash[:notice] = "<div class=\"error\">You can't edit that review.</div>"
      redirect_to :action => "index"
    end
  end

  def edit_comment
    @pagetitle = "edit comment"
    @comment = Comment.find(params[:id])
    if session[:person_id] == @comment.person_id or Person.find(session[:person_id]).is_admin or Person.find(session[:person_id]).is_moderator
      @report = @comment.report
      if request.post? and @comment.update_attributes(params[:comment])
        if session[:person_id] == @comment.person_id
          editor = "the author "
        else
          editor = "<strong>" + Person.find(session[:person_id]).public_email + " </strong> "
        end
        note = "This comment was edited by " + editor + Time.now.strftime("%a %b %d %H:%M %Z") + ".<br/>"
        @comment.update_attributes(:displayed_notes => note + @comment.displayed_notes.to_s)
        flash[:notice] = "<div class=\"success\">Comment updated.</div>"
        redirect_to :action => "report", :id => @comment.report_id.to_s
      end
    else
      flash[:notice] = "<div class=\"error\">You can't edit that comment.</div>"
      redirect_to :action => "index"
    end
  end

  def info
    @location = "about"
  end

  def help
    @pagetitle = "help"
    @location = "help"
  end

  def blog
    @location = "blog"
    @posts = Post.where(parent_id: nil).order(created_at: :desc)
  end

  def post
    @post = Post.find_by_slug(params[:id])
    if @post.nil?
      @post = Post.find(params[:id])
      if @post.nil?
        flash[:notice] = "<div class='error'>Sorry, couldn't find that post.</div>"
        redirect_to :action => "blog"
      end
    end
  end

  def add_post
    @post = Post.new(params[:post])
    if request.post? and @post.save
      @post.update_attributes(:slug => @post.title.downcase.gsub(/ /,"_"))
      # insert slug uniqueness checking here if this becomes an issue
      flash[:notice] = "<div class='success'>Post \"#{@post.title}\" saved.</div>"
      if @post.parent_id.nil?
        redirect_to :action => "blog"
      else
        redirect_to :action => "post", :id => @post.parent.id
      end
    end
  end

  def edit_post
    @post = Post.find(params[:id])
    if request.post? and @post.update_attributes(params[:post])
      flash[:notice] = "<div class='success'>Post updated.</div>"
      redirect_to :action => "post", :id => @post.id
    end
  end

  def rules
    @location = "rules"
  end

  private

  def check_for_existing_report
    if session[:person_id] and Person.find(session[:person_id]) and params[:requester]
      @requester = Requester.find_by_amzn_requester_id(params[:requester][:amzn_id])
      unless @requester.nil?
        @report = Report.find_by_person_id_and_requester_id(session[:person_id], @requester.id)
        unless @report.nil? #or session[:person_id] == 1
          flash[:notice] = "<div class=\"success\">You have a review for that requester already. You can update it if you would like.</div>"
          redirect_to :action => "edit_report", :id => @report.id
        end
      end
    end
  end
end
