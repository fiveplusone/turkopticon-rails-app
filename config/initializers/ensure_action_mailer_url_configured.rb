# frozen_string_literal: true

Rails.application.config.after_initialize do |app|
  if app.config.action_mailer.delivery_method == :sendmail && app.config.action_mailer.default_url_options.blank?
    raise 'action_mailer default_url_options should be configured'
  end
end
