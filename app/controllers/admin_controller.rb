class AdminController < ApplicationController

  before_action :authorize, :authorize_as_admin, :except => [:review_commenting_requests]
  layout nil

  def authorize_as_admin
    pid = session[:person_id]
    unless !pid.nil? and Person.find(pid) and Person.find(pid).is_admin
      session[:original_uri] = request.request_uri
      flash[:notice] = "Please log in as an administrator."
      redirect_to :controller => "reg", :action => "login"
    end
  end

  def index
  end

#  def all_emails
#    @emails = Person.all.collect{|p| p.email}
    # @emails = ["a@b.c", "b@c.net", "d@f.net"]
#  end

#  def emails_of_reviewers
#    @emails = Report.all.collect{|r| r.person.email}
#    render :action => "all_emails"
#  end

#  def emails_of_reviewers_who_have_left_reviews_since_date
#    reports = Report.find_by_sql('select id, person_id from reports where created_at > "2020-01-31"')
#    @emails = reports.collect{|r| Person.find(r[:person_id]).email}.uniq
#    render :action => "all_emails"
#  end

#  def emails_of_people_who_have_signed_up_since_date
#    new_users = Person.find_by_sql('select id, email from people where created_at > "2020-01-31"')
#    @emails = new_users.collect{|p| p[:email]}.uniq
#    render :action => "all_emails"
#  end

#  def emails_of_people_who_have_signed_up_since_date_and_left_reviews
#    reports = Report.find_by_sql('select id, person_id from reports where created_at > "2020-01-31"')
#    @emails = reports.select{|r| Person.find(r[:person_id]).created_at > "2020-01-31".to_date}.collect{|r| Person.find(r[:person_id]).email}.uniq
#    render :action => "all_emails"
#  end

#  def emails_of_reviewers_by_req
#    @emails = Requester.find_by_amzn_requester_id(params[:amzn_id]).reports.collect{|r| r.person.email}.uniq
#    render :action => "all_emails"
#  end

#  def emails_of_commenters_with_no_reviews
#    @emails = []
#    Person.find_all_by_can_comment(true).each do |p|
#      @emails << p.email if p.reports.empty?
#    end
#    render :action => "all_emails"
#  end

#  def send_facilitator_info_mails
    # precondition: run:
    # ~/src/turkopticon/log$ tail -n 500000 ip.log > ip500k.log
#    emails = []
#    File.open("log/ip500k.log").each{|line| emails << line.split("]")[1].split(" ")[0] if line[0, 1] == "[" and !line.split("]")[1].nil?}
#    emails.uniq!
#    emails.each{|e| AdminMailer::deliver_facilitator(Person.find_by_email(e).id.to_s, e)}
#    render :text => "Sent #{emails.count.to_s} emails."
#  end

#  def send_facilitator_followup_emails
    # precondition:
    # emails, one per line, in ~/src/turkopticon/log/facilitator_emails.txt
    ## out = ""
#    emails = []
#    File.open("log/facilitator_emails.txt").each{|e|
#      AdminMailer::deliver_facilitator_followup(e)
#      emails << e
      ## out += e + "<br/>"
#    }
#    count = emails.length
#    render :text => "Sent " + count.to_s + " emails."
#  end

#  def send_workshopinfo_emails
#    emails = []
#    File.open("log/facilitator_emails.txt").each{|e|
#      AdminMailer::deliver_workshopinfo(e)
#      emails << e
#    }
#    count = emails.length
#    render :text => "Sent " + count.to_s + " emails."
#  end

#  def pwd
#    out = `pwd`
#    render :text => out
#  end

  def dashboard
    @user_count = Person.count
    @new_user_count = Person.all(:conditions => ["created_at > ?", Time.now - 1.month]).count
    @active_user_count = Report.all(:conditions => ["created_at > ?", Time.now - 1.month]).collect{|r| r.person_id}.uniq.count
    # @active_user_count = Report.all.select{|r| r.created_at > Time.now - 1.month}.collect{|r| r.person_id}.uniq.count  # slow, don't do that
    @report_count = Report.count
    @requester_count = Requester.count
    @recent_reports = Report.all(:conditions => ["created_at > ?", Time.now - 1.month])
    @recent_report_count = @recent_reports.count
    authors = @recent_reports.map{|r| {"id" => r.person_id, "name" => r.person.display_name.nil? ? r.person.email : r.person.display_name}}
    @author_count = authors.uniq.count
    @authors_with_counts = authors.group_by{|a| [a["id"], a["name"]]}.map{|k, v| [k, v.length]}.sort_by{|a| a[1]}.reverse
    @recent_flags = Flag.all(:conditions => ["created_at > ?", Time.now - 1.month])
    # @recent_flags = Flag.all.select{|f| f.created_at > Time.now - 1.month}  # slow
    @recently_flagged_reports = @recent_flags.collect{|f| f.report_id}
    @recent_flaggers = @recent_flags.collect{|f| f.person_id}
    top_flaggers = {}
    @recent_flaggers.each do |pid|
      if top_flaggers[pid].nil?
        top_flaggers[pid] = 1
      else
        top_flaggers[pid] += 1
      end
    end
    @ordered_flaggers = top_flaggers.sort_by{|k, v| v}.reverse
  end

  def reviewers
    reviewers = {}
    Report.all.each{|r|
      pid = r.person_id
      if reviewers[pid].nil?
        p = Person.find(pid)
        reviewers[pid] = {:public_email => p.public_email,
                          :acct_date => p.created_at.strftime("%b %d %Y"),
                          :can_comment => p.can_comment.to_s,
                          :review_count => 0}
      end
      reviewers[pid][:review_count] += 1
    }
    @review_counts = []
    reviewers.each_pair{|pid, info|
      @review_counts << {:person_id => pid,
                         :review_count => info[:review_count],
                         :public_email => info[:public_email],
                         :acct_date => info[:acct_date],
                         :can_comment => info[:can_comment]}
    }
    @review_counts = @review_counts.sort_by{|e| e[:review_count]}.reverse
  end

  def commenters
    @commenters_and_comments = {}
    Comment.all.each{|c|
      if c.person_id
        if @commenters_and_comments[c.person_id].nil?
          p = Person.find(c.person_id)
          @commenters_and_comments[c.person_id] = {:public_email => p.public_email, :mod_display_name => p.mod_display_name, :acct_date => p.created_at.strftime("%b %d %Y"), :can_comment => p.can_comment.to_s, :comments => []}
        end
        @commenters_and_comments[c.person_id][:comments] << {:comment_id => c.id, :date => c.created_at.strftime("%b %d %Y %H:%M"), :body => c.body}
      end
    }

    @comment_counts = []
    @commenters_and_comments.each_pair{|person_id, info|
      @comment_counts << {:person_id => person_id, :comment_count => info[:comments].count, :last_comment_date => info[:comments].last[:date], :acct_date => info[:acct_date], :can_comment => info[:can_comment]}
    }
    @comment_counts = @comment_counts.sort_by{|e| e[:comment_count]}
  end

  def enable_commenting
    Person.find(params[:id]).update_attributes(:can_comment => true)
    render :text => "Enabled commenting for user #{params[:id]}."
  end

  def enable_commenting_and_send_email
    person = Person.find(params[:id])
    person.update_attributes(:can_comment => true)
    AdminMailer::deliver_enabled(person)
    render :text => "Enabled commenting for user #{params[:id]}."
  end

  def decline_commenting_request
    person = Person.find(params[:id])
    person.update_attributes(:commenting_requested => nil, :commenting_requested_at => nil)
    render :text => "Declined commenting request for user #{params[:id]}."
  end

  def decline_commenting_request_and_send_email
    person = Person.find(params[:id])
    person.update_attributes(:commenting_requested => nil, :commenting_requested_at => nil)
    AdminMailer::deliver_declined(person)
    render :text => "Declined commenting request for user #{params[:id]}. Email sent."
  end

  def approve_commenting_requests
    ids = params[:ids].split(",")
    ids.each{|i| Person.find(i).update_attributes(:can_comment => true)}
    render :text => "Approved commenting requests for users #{ids.join(", ")}."
  end

  def decline_commenting_requests
    ids = params[:ids].split(",")
    ids.each{|i| Person.find(i).update_attributes(:commenting_requested => nil, :commenting_requested_at => nil)}
    render :text => "Declined commenting requests for users #{ids.join(", ")}."
  end

  def disable_commenting
    Person.find(params[:id]).update_attributes(:can_comment => false)
    render :text => "Disabled commenting for user #{params[:id]}."
  end

  def commenting_requests
    @people = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).sort_by{|p| p.commenting_requested_at}
    @all_emails = @people.collect{|p| p.email}
    @all_ids = @people.collect{|p| p.id}
  end

  def likely_commenting_requests
    @people = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count >= 5}.sort_by{|p| p.commenting_requested_at}
    @all_emails = @people.collect{|p| p.email}
    @all_ids = @people.collect{|p| p.id}
    render :action => "commenting_requests"
  end

  def unlikely_commenting_requests
    @people = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count < 5}.sort_by{|p| p.commenting_requested_at}
    @all_emails = @people.collect{|p| p.email}
    @all_ids = @people.collect{|p| p.id}
  end

  def zero_rev_commenting_requests
    @people = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count < 1}.sort_by{|p| p.commenting_requested_at}
    @all_emails = @people.collect{|p| p.email}
    @all_ids = @people.collect{|p| p.id}
  end

  def ignore_commenting_request_quietly
    Person.find(params[:id]).update_attributes(:commenting_request_ignored => true)
    render :text => "Ignored commenting request from user #{params[:id]}."
  end

  def enabled_commenters
    @commenters = Person.find_all_by_can_comment(true).sort_by{|p| p.comments.count}.reverse
  end

  def review_commenting_requests
    enable = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil)
    out = "Enabled commenting for:\n"
    enable.each{|person|
      person.update_attributes(:can_comment => true, :commenting_enabled_at => Time.now, :commenting_enabled_by => 0)
      AdminMailer::deliver_enabled(person)
      out += "#{person.id.to_s}\n"
    }
    render :text => out
  end

  def old_review_commenting_requests  # 2018 Jul 9
    likely = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count >= 5}
    out = "Enabled commenting for:\n"
    likely.each{|person|
      person.update_attributes(:can_comment => true)
      AdminMailer::deliver_enabled(person)
        out += "#{person.id.to_s}    #{person.public_email}\n"
    }
    out += "\n\n"
    unlikely = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count < 5}
    unlikely.each{|person|
      person.update_attributes(:commenting_requested => nil, :commenting_requested_at => nil)
      AdminMailer::deliver_declined(person)
    }
    out += "Declined commenting for " + unlikely.map{|p| p.id}.join(", ")
    AdminMailer::deliver_report(out)
  end

  def duplicated_requesters
    ids = Requester.all.map{|r| r.amzn_requester_id}.delete_if{|i| i.blank?}
    hash = ids.group_by{|i| i}  # slow
    duplicates = hash.select{|k, v| v.size > 1}.map(&:first)
    render :text => duplicates.join(", ")
  end

  def login_as
    session[:person_id] = params[:id]
    redirect_to :controller => "main", :action => "index"
  end

  def condition_date(params)
    year = params[:"filter(1i)"] != "" ? params[:"filter(1i)"].to_f : 2008
    month = params[:"filter(2i)"] != "" ? params[:"filter(2i)"].to_f : 1
    date = params[:"filter(3i)"] != "" ? params[:"filter(3i)"].to_f : 1
    Date.new(year, month, date)
  end

  def fetch_contacts_csv
    require 'csv'
    title = ""
    conditions = "true"
    args = []

    if params[:created_since][:"filter(1i)"] != ""
      created_since = condition_date(params[:created_since])
      conditions = conditions + " and created_at > ?"
      args = args + [created_since]
      title = title + "registered_since_#{created_since.strftime}-"
    end
    if params[:logged_since][:"filter(1i)"] != ""
      logged_since = condition_date(params[:logged_since])
      conditions = conditions + " and latest_login_at > ?"
      args = args + [logged_since]
      title = title + "logged_since_#{logged_since.strftime}-"
    end
    if params[:reviewed_since][:"filter(1i)"] != ""
      reviewed_since = condition_date(params[:reviewed_since])
      conditions = conditions + " and latest_review_at > ?"
      args = args + [reviewed_since]
      title = title + "reviewed_since_#{reviewed_since.strftime}-"
    end
    if params[:opted_in][:filter] == "1"
      conditions = conditions + " and optin = true"
      title = title + "opted_in-"
    end
    if params[:email_verified][:filter] == "1"
      conditions = conditions + " and email_verified = true"
      title = title + "email_verified-"
    end
    if params[:country][:filter] != ""
      conditions = conditions + " and country = '" + params[:country][:filter] + "'"
      title = title + "from_" + params[:country][:filter] + "-"
    end
    if params[:state][:filter] != ""
      conditions = conditions + " and state = '" + params[:state][:filter] + "'"
      title = title + "from_" + params[:state][:filter] + "-"
    end

    @contacts = Person.find(:all, :conditions => [conditions] + args)
    csv = CSV.generate_line(%w(email, verified, phone, state, country, optin, last_review, last_login, created_at))
    csv << "\n"
    @contacts.each { |contact| csv << CSV.generate_line([contact.email, contact.email_verified, contact.phone, contact.state, contact.country, contact.optin, contact.latest_review_at, contact.latest_login_at, contact.created_at]) and csv << "\n"}

    send_data(csv, :type => 'text/csv', :disposition => 'attachment', :filename => title + "contacts-#{Date.today}.csv")
  end

end
