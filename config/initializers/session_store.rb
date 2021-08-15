# frozen_string_literal: true

cookie_session_key = "_#{Rails.application.railtie_name.chomp('_application')}_session"

Rails.application.config.session_store :cookie_store, expire_after: 30.days, key: cookie_session_key
