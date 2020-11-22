class RegController < ApplicationController
  before_action :authorize, :only => :settings
  before_action :check_ip, :only => :register

  def close
    Person.find(session[:person_id]).close
    session[:person_id] = nil
    flash[:notice] = "Your account was closed."
    redirect_to :controller => "main", :action => "index"
  end

  def change_email
    @person = Person.find(session[:person_id])
    if request.post?
      @new_email = params[:person][:email]

      @person.email = @new_email
      @person.email_verified = false
      if @person.save
        RegMailer.confirm(@person, confirmation_hash(@person.email)).deliver_now
        flash[:notice] = "An email has been sent to #{@person.email}. Please click the link in the email to verify your email address."
        redirect_to :controller => "main", :action => "index"
      end
    end
  end

  def register
    @pagetitle = "register"
    @person = Person.new(params[:person])
    if request.post?
      if params[:robot_check][:check] == "1"
        if @person.save
          @person.update_attributes(:display_name => @person.public_email, :show_fancy_links => true, :confirmation_token => confirmation_hash(@person.email))
          RegMailer.confirm(@person, @person.confirmation_token).deliver_now
          session[:person_id] = @person.id
          flash[:notice] = "Thanks for signing up. We've sent an email to #{@person.email}. Please click the link in the email to verify your address."

          redirect_to :controller => "main", :action => "index"
        end
      else
        redirect_to :action => "robot"
      end
    end
  end

  def robot
  end

  def login
    session[:person_id] = nil

    if request.post? # or cookies[:person_id]
      # if cookies[:person_id]
        # session[:person_id] = cookies[:person_id].to_i
        # person = Person.find(session[:person_id])
        #if person
          #uri = session[:original_uri]
          #session[:original_uri] = nil
          #redirect_to uri || {:controller => "main", :action => "index"}
        #else
          #render :text => "invalid cookie"
        #end
      #else
      # NEED TO INDENT TWO SPACES HERE
      person = Person.authenticate(params[:email], params[:password])
      if person and !person.is_closed
        # Continue normal login process
        session[:person_id] = person.id
        person.update_attributes(:latest_login_at => DateTime.now)
        if person.id == 1
          cookies['person_id'] = "1" # {:value => person.id.to_s, :expires => Time.now + 3600 * 24 * 30}
        end

        t = Time.now.strftime("%H:%M %a %b %d %Y")
        ip = request.remote_ip
        logger.info "[#{t}] #{person.email} logged in from #{ip}"

        # Check if email is verified
        if person.email_verified.nil? or person.email_verified == false
          flash[:notice] = "Please verify your current email address, or update your email address, to continue using Turkopticon."
          RegMailer.confirm(person, confirmation_hash(person.email)).deliver_now
          redirect_to :action => "change_email"
        else
          uri = session[:original_uri]
          session[:original_uri] = nil
          redirect_to (uri || {:controller => "main", :action => "index"})
        end
      else
        flash[:notice] = "Sorry, invalid username/password combination."
      end
      # END NEW INDENT
      #end
    end
  end

  def logout
    session[:person_id] = nil
    #cookies.delete :person_id
    flash[:notice] = "Logged out."
    redirect_to :controller => "main", :action => "index"
  end

  def settings
    @person = Person.find(session[:person_id])
  end

  def set_display_name
    @person = Person.find(session[:person_id])
    if @person.display_name and @person.display_name != @person.public_email
      flash[:errors] = {}
      flash[:errors][:display_name] = "You already have a display name."
    elsif Person.find_by_display_name(params[:person][:display_name])
      flash[:errors] = {}
      flash[:errors][:display_name] = "The display name '#{params[:person][:display_name]}' is taken."
    else
      @person.update_attributes(params[:person])
    end
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_location
    @person = Person.find(session[:person_id])
    if request.post?
      @new_country = params[:person][:country]
      @new_state = params[:person][:state]

      @person.country = @new_country
      @person.state = @new_state

      if @person.save
        flash[:notice] = "Your location has been updated."
      end
    end
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_phone
    @person = Person.find(session[:person_id])
    if request.post?
      @new_phone = params[:person][:phone]

      @person.phone = @new_phone

      if @person.save
        flash[:notice] = "Your phone number has been updated."
      end
    end
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_phone_and_location
    @person = Person.find(params[:person][:id])
    if request.post?
      @new_phone = params[:person][:phone]
      @new_country = params[:person][:country]
      @new_state = params[:person][:state]

      @person.country = @new_country
      @person.state = @new_state
      @person.phone = @new_phone

      if @person.save
        flash[:notice] = "This person's info has been updated."
      end
    end
    redirect_to :controller => "main", :action => "reports_by", :id => @person.id
  end

  def change_optin
    @person = Person.find(session[:person_id])
    if request.post?
      @new_optin = params[:person][:optin]

      @person.optin = @new_optin

      if @person.save
        flash[:notice] = "You have opted #{@new_optin == "1" ? "in to" : "out of"} our Newsletter"
      end
    end
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_password
    @person = Person.find(session[:person_id])
    if request.post?
      if params[:person][:password] != params[:person][:password_confirmation]
        flash[:errors] = {}
        flash[:errors][:password] = "Password and confirmation must match."
        redirect_to :action => "settings"
      else
        @new_password = params[:person][:password]
        @person.password=(@new_password)
        if @person.save
          RegMailer.password_change(@person, @new_password).deliver_now
          flash[:notice] = "Your password has been changed. A confirmation email has been sent to #{@person.email}."
          redirect_to :controller => "main", :action => "index"
        end
      end
    end
  end

  def reset_password
    if request.post?
      @person = Person.find_by_email(params[:person][:email])
      if @person.nil?
        flash[:notice] = "Sorry, that email isn't in the database."
      else
        @new_password = @person.object_id.to_s.gsub(/0/, 'j').gsub(/4/, 'x_')
        @person.password=(@new_password)
        if @person.save
          RegMailer.password_reset(@person, @new_password).deliver_now
          flash[:notice] = "Your password has been reset. An email containing the new password has been sent to to #{@person.email}."
          redirect_to :controller => "reg", :action => "login"
        end
      end
    end
  end

  def send_verification_email
    @person = Person.find(session[:person_id])
    @person.update_attributes(:confirmation_token => confirmation_hash(@person.email))
    RegMailer.confirm(@person, @person.confirmation_token).deliver_now
    flash[:notice] = "An email has been sent to #{@person.email}. Please click the link in the email to verify your email address."
    redirect_to :controller => "main", :action => "index"
  end

  def confirm
    person = Person.find_by_confirmation_token(params[:hash])

    if person.nil? 
      flash[:notice] = "Sorry, we don't recognize that confirmation link. Please re-send confirmation email."
      redirect_to :controller => "main", :action => "index" and return
    end

    person.update_attributes(:email_verified => true, :confirmation_token => nil)
    if session[:person_id].blank?
      session[:person_id] = person.id
    end
    flash[:notice] = "Thank you for confirming your email address."

    redirect_to :controller => "main", :action => "index"
  end

  def toggle_my_reviews_order_flag
    Person.find(session[:person_id]).toggle_my_reviews_order_flag
    redirect_to :controller => "main", :action => "my_reviews"
  end

  def toggle_order_by_flag
    Person.find(session[:person_id]).toggle_order_by_flag
    redirect_to :controller => "main", :action => "index"
  end

  def fancy_links_off
    Person.find(session[:person_id]).update_attributes(:show_fancy_links => nil)
    flash[:notice] = "Extra links turned off."
    redirect_to :action => "settings"
  end

  def fancy_links_on
    Person.find(session[:person_id]).update_attributes(:show_fancy_links => true)
    flash[:notice] = "Extra links turned on."
    redirect_to :action => "settings"
  end

  def hide_long_reviews_off
    Person.find(session[:person_id]).update_attributes(:hide_long_reviews => nil)
    flash[:notice] = "Hide long reviews turned off."
    redirect_to :action => "settings"
  end

  def hide_long_reviews_on
    Person.find(session[:person_id]).update_attributes(:hide_long_reviews => true)
    flash[:notice] = "Hide long reviews turned on."
    redirect_to :action => "settings"
  end

  private
  def confirmation_hash(string)
    Digest::SHA1.hexdigest(string + "sauron_is_watching_you")
  end

end
