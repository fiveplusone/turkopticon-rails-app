class RegController < ApplicationController
  before_action :authorize, except: %i[register robot login reset_password confirm]
  before_action :check_ip, :only => :register

  def close
    current_user.close
    session[:person_id] = nil
    flash[:notice] = "Your account was closed."
    redirect_to :controller => "main", :action => "index", :id => nil
  end

  def change_email
    new_email = params[:user][:email]
    current_user.update!(email: new_email, email_verified: false, confirmation_token: confirmation_hash(new_email))
    RegMailer.confirm(current_user, current_user.confirmation_token).deliver_now
    flash[:notice] = "An email has been sent to #{new_email}. Please click the link in the email to verify your email address."
    redirect_to controller: 'main', action: 'index', id: nil
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

          redirect_to :controller => "main", :action => "index", :id => nil
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
          #redirect_to uri || {:controller => "main", :action => "index", :id => nil}
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
          redirect_to (uri || {:controller => "main", :action => "index", :id => nil})
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
    redirect_to :controller => "main", :action => "index", :id => nil
  end

  def settings
  end

  def set_display_name
    if current_user.display_name && current_user.display_name != current_user.public_email
      flash[:errors] = {}
      flash[:errors][:display_name] = "You already have a display name."
    elsif Person.find_by_display_name(params[:person][:display_name])
      flash[:errors] = {}
      flash[:errors][:display_name] = "The display name '#{params[:person][:display_name]}' is taken."
    else
      current_user.update!(display_name: params[:person][:display_name])
    end
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_location
    current_user.update!(**params[:person].permit(:country, :state))
    flash[:notice] = 'Your location has been updated.'
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_phone
    current_user.update!(phone: params[:person][:phone])
    flash[:notice] = 'Your phone number has been updated.'
    redirect_to :controller => "reg", :action => "settings"
  end

  # This looks weird because it's called from index.haml not from settings
  def change_phone_and_location
    person = Person.find(params[:person][:id])
    person.update!(params[:person].permit(:phone, :country, :state))

    flash[:notice] = "This person's info has been updated."
    redirect_to controller: 'main', action: 'reports_by', id: person.id
  end

  def change_optin
    current_user.update!(optin: params[:person][:optin])
    flash[:notice] = "You have opted #{current_user.optin? ? 'in to' : 'out of'} our Newsletter"
    redirect_to :controller => "reg", :action => "settings"
  end

  def change_password
    if params[:person][:password] != params[:person][:password_confirmation]
      flash[:errors] = { password: 'Password and confirmation must match.' }
      return redirect_to action: 'settings'
    end
    current_user.update!(password: params[:person][:password])
    RegMailer.password_change(current_user).deliver_now
    flash[:notice] = "Your password has been changed. A confirmation email has been sent to #{current_user.email}."
    redirect_to controller: 'main', action: 'index', id: nil
  end

  def reset_password
    if request.post?
      person = Person.find_by_email(params[:person][:email])
      if person.nil?
        flash[:notice] = "Sorry, that email isn't in the database."
      else
        new_password = person.object_id.to_s.gsub(/0/, 'j').gsub(/4/, 'x_')
        person.password = new_password
        if person.save
          RegMailer.password_reset(person, new_password).deliver_now
          flash[:notice] = "Your password has been reset. An email containing the new password has been sent to to #{person.email}."
          redirect_to :controller => "reg", :action => "login"
        end
      end
    end
  end

  def send_verification_email
    current_user.update!(confirmation_token: confirmation_hash(current_user.email))
    RegMailer.confirm(current_user, current_user.confirmation_token).deliver_now
    flash[:notice] = "An email has been sent to #{current_user.email}. Please click the link in the email to verify your email address."
    redirect_to :controller => "main", :action => "index", :id => nil
  end

  def confirm
    person = Person.find_by(confirmation_token: params[:hash])

    if person.nil? 
      flash[:notice] = "Sorry, we don't recognize that confirmation link. Please re-send confirmation email."
      redirect_to :controller => "main", :action => "index", :id => nil and return
    end

    person.update_attributes(:email_verified => true, :confirmation_token => nil)
    if session[:person_id].blank?
      session[:person_id] = person.id
    end
    flash[:notice] = "Thank you for confirming your email address."

    redirect_to :controller => "main", :action => "index", :id => nil
  end

  def toggle_my_reviews_order_flag
    current_user.toggle_my_reviews_order_flag
    redirect_to :controller => "main", :action => "my_reviews"
  end

  def toggle_order_by_flag
    current_user.toggle_order_by_flag
    redirect_to :controller => "main", :action => "index", :id => nil
  end

  def fancy_links_off
    current_user.update!(show_fancy_links: nil)
    flash[:notice] = "Extra links turned off."
    redirect_to :action => "settings"
  end

  def fancy_links_on
    current_user.update!(show_fancy_links: true)
    flash[:notice] = "Extra links turned on."
    redirect_to :action => "settings"
  end

  def hide_long_reviews_off
    current_user.update!(hide_long_reviews: nil)
    flash[:notice] = "Hide long reviews turned off."
    redirect_to :action => "settings"
  end

  def hide_long_reviews_on
    current_user.update!(hide_long_reviews: true)
    flash[:notice] = "Hide long reviews turned on."
    redirect_to :action => "settings"
  end

  private
  def confirmation_hash(string)
    Digest::SHA1.hexdigest(string + "sauron_is_watching_you")
  end

end
