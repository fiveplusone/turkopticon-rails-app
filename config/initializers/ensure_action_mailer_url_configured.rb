# frozen_string_literal: true

Rails.application.config.after_initialize do |app|
  config = app.config.action_mailer

  next unless %i[smtp sendmail].include? config.delivery_method

  unless config.default_url_options.present? && config.default_url_options.key?(:host)
    raise 'action_mailer default_url_options should be configured'
  end

  unless config.default_options.present? && config.default_options.key?(:from)
    raise 'action_mailer default_from should be configured'
  end
end
