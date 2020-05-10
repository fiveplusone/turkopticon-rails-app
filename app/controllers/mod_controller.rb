class ModController < ApplicationController

  before_filter :authorize, :authorize_as_moderator, :load_person
  layout "moderator"

  def authorize_as_moderator
    pid = session[:person_id]
    if pid.nil?
      session[:original_uri] = request.request_uri
      flash[:notice] = "Please log in as a moderator."
      redirect_to :controller => "reg", :action => "login"
    else
      @person = Person.find(pid)
      unless !@person.nil? and @person.is_moderator
        session[:original_uri] = request.request_uri
        flash[:notice] = "Please log in as a moderator."
        redirect_to :controller => "reg", :action => "login"
      end
    end
  end

  def utils
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

  def load_person
    @person = Person.find(session[:person_id])
  end

  def index
    @title = "Reviews with no flags"
    @reports = Report.paginate(:page => params[:page],
                               :order => "id DESC",
                               :conditions => "requester_id is not null and ignore_count = 0 and is_flagged is null")
  end

  def flagged
    @title = "Reviews with new flags"
    @reports = Report.paginate(:page => params[:page],
                               :order => "id DESC",
                               :conditions => "is_flagged = 1 and ignore_count = 0 and is_hidden is null")
    render :action => "index"
  end

  def ignored
    @title = "Reviews with ignored flags"
    @reports = Report.paginate(:page => params[:page],
#                               :order => "id DESC",
                               :order => "updated_at DESC",
                               :conditions => "is_flagged = 1 and ignore_count > 0")
    render :action => "index"
  end

  def multi_ignored
    @title = "Reviews with ignored flags"
    @reports = Report.paginate(:page => params[:page],
                               :order => "id DESC",
                               :conditions => "is_flagged = 1 and ignore_count > 1")
    render :action => "index"
  end

  def hidden
    @title = "Hidden reviews"
    @reports = Report.paginate(:page => params[:page],
                               :order => "id DESC",
                               :conditions => "is_flagged = 1 and is_hidden = 1")
    render :action => "index"
  end

  def flag
    @report = Report.find(params[:id])
    @flag = Flag.new(params[:flag])
    if request.post? and @flag.save and @report.update_flag_data
      @report.update_attributes(:flag_count => @report.flags.count)
      flash[:notice] = "Flagged report #{params[:id]}."
      redirect_to :action => "index"
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
    @comment = Comment.new(params[:comment])
    if request.post? and @comment.save
      @report.update_attributes(:comment_count => @report.comments.count)
      flash[:notice] = "Comment added to report #{params[:id]}."
      redirect_to :action => "flagged"
    end
  end

  def cancel_lightbox
    @id = params[:id]
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

  def convert_other_persons_flag
    @flag = Flag.find(params[:id])
    @requester = @flag.report.requester
    @report = @flag.report
    @flag.convert_to_comment_by(@flag.person, @person)
    @report.update_attributes(:flag_count => @report.flags.count, :comment_count => @report.comments.count)
    redirect_to :controller => "main", :action => "report", :id => @report.id
  end

  def convert_other_mods_flag
    @flag = Flag.find(params[:id])
    @requester = @flag.report.requester
    @report = @flag.report
    @flag.convert_to_comment_by(@person)
    @report.update_attributes(:flag_count => @report.flags.count, :comment_count => @report.comments.count)
    redirect_to :controller => "main", :action => "report", :id => @report.id
  end

end
