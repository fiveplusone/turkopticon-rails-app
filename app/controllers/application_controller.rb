# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base

  layout "generic"

  helper :all # include all helpers, all the time

  before_action :title, :check_ip

  after_action :set_flash_for_partial_replacer, :set_partial_replacer_response_header

  def title
  end

  def check_ip
    render :text => "Sorry, something went wrong." if ["74.96.142.81"].include? current_ip_address
  end

  def current_ip_address
    request.env['HTTP_X_REAL_IP'] || request.env['REMOTE_ADDR']
  end


  def authorize
    unless !session[:person_id].nil? and Person.find(session[:person_id]) and !Person.find(session[:person_id]).is_closed
      session[:original_uri] = request.url
      flash[:notice] = "Please log in."
      redirect_to :controller => "reg", :action => "login"
    end
  end

  def verify
    unless Person.find(session[:person_id]).email_verified
      session[:original_url] = request.url
      flash[:notice] = "You must verify your email address before you can post."
      redirect_to :controller => "main", :action => "index", :id => nil
    end
  end

  def authorize_as_commenter
    unless Person.find(session[:person_id]).can_comment
      flash[:notice] = "Sorry, your account doesn't seem to have commenting and flagging enabled."
      redirect_to :controller => "main", :action => "index", :id => nil
    end
  end

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => 'e7c170de675a44f45aebb8b8108212a5'

  # See ActionController::Base for details
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password").
  # filter_parameter_logging :password

  def set_flash_for_partial_replacer
    return unless partial_replacer_remote?

    response.headers['X-Partial-Replacer-Flash-Success'] = flash[:success] if flash[:success]
    response.headers['X-Partial-Replacer-Flash-Notice'] = flash[:notice] if flash[:notice]
    response.headers['X-Partial-Replacer-Flash-Warning'] = flash[:warning] if flash[:warning]
    response.headers['X-Partial-Replacer-Flash-Error'] = flash[:error] if flash[:error]
  end

  def set_partial_replacer_response_header
    return unless partial_replacer_remote?

    response.headers['X-Partial-Replacer-Remote'] = true
  end

  def partial_replacer_remote?
    request.headers['X-Partial-Replacer-Remote'].present?
  end
end
