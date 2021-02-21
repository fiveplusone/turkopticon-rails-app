Rails.application.routes.draw do
  root :controller => "main", :action => "info"
  match 'forum', :controller => "forum", :action => "index", :via => :all
  match 'rules', :controller => "main", :action => "rules", :via => :all
  match 'stats', :controller => "stats", :action => "index", :via => :all
  match 'pri', :controller => "main", :action => "pri", :via => :all
  match 'issues', :controller => "main", :action => "issues", :via => :all
  match 'login', :controller => "reg", :action => "login", :via => :all
  match 'logout', :controller => "reg", :action => "logout", :via => :all
  match 'register', :controller => "reg", :action => "register", :via => :all
  match 'report', :controller => "main", :action => "add_report", :via => :all
  match 'edit/:id', :controller => "main", :action => "edit_report", :via => :all
  match 'reports', :controller => "main", :action => "index", :via => :all
  match 'info', :controller => "main", :action => "info", :via => :all
  match 'blog', :controller => "main", :action => "blog", :via => :all
  match 'help', :controller => "main", :action => "help", :via => :all
  match 'aves/:id', :controller => "main", :action => "averages", :via => :all
  match 'post/:id', :controller => "main", :action => "post", :via => :all
  match 'flag/:id', :controller => "main", :action => "flag", :via => :all
  match 'add_flag/:id', :controller => "main", :action => "add_flag", :via => :all
  match 'requesters', :controller => "main", :action => "requesters", :via => :all
  match 'all_requesters', :controller => "main", :action => "all_requesters", :via => :all
  match 'requesters.csv', :controller => "main", :action => "requesters", :format => "csv", :via => :all
  match 'settings', :controller => "reg", :action => "settings", :via => :all
  match 'my_flagged', :controller => "main", :action => "my_flagged", :via => :all
  match 'flagged', :controller => "main", :action => "flagged", :via => :all
  match 'hidden', :controller => "main", :action => "hidden", :via => :all
  match 'my_reviews', :controller => "main", :action => "my_reviews", :via => :all
  match 'by/:id', :controller => "main", :action => "reports_by", :via => :all
  match 'flagged_by/:id', :controller => "main", :action => "flagged_by", :via => :all
  match 'comments_by/:id', :controller => "main", :action => "comments_by", :via => :all
  match 'all_by/:id', :controller => "main", :action => "all_by", :via => :all
  match 'reviews_by_one_page/:id', :controller => "main", :action => "reports_by_one_page", :via => :all
  match 'admin', :controller => "admin", :action => "index", :via => :all
  match ':id', :controller => "main", :action => "index", :via => :all
  match 'get_report/:id', :controller => "main", :action => "report", :via => :all
  match 'attrs/:id', :controller => "main", :action => "requester_attrs", :via => :all
  match 'attrsv2/:id', :controller => "main", :action => "requester_attrs_v2", :via => :all
  match 'confirm/:hash', :controller => "reg", :action => "confirm", :via => :all
  match 'enable_commenting_form', :controller => "mod", :action => "enable_commenting_form", :via => :get
  match 'disable_commenting_form', :controller => "mod", :action => "disable_commenting", :via => :get
  match 'do_enable_commenting', :controller => "mod", :action => "do_enable_commenting", :via => :post
  match 'do_disable_commenting', :controller => "mod", :action => "do_disable_commenting", :via => :post

  match 'admin/dashboard', :controller => "admin", :action => "dashboard", :via => :get
  match 'admin/decline_commenting_request/:id', :controller => "admin", :action => "decline_commenting_request", :via => :get
  match 'admin/approve_commenting_requests', :controller => "admin", :action => "approve_commenting_requests", :via => :get
  match 'admin/decline_commenting_requests', :controller => "admin", :action => "decline_commenting_requests", :via => :get
  match 'admin/ignore_commenting_request_quietly/:id', :controller => "admin", :action => "ignore_commenting_request_quietly", :via => :get
  match 'admin/fetch_contacts_csv', :controller => "admin", :action => "fetch_contacts_csv", :via => :post

  match 'forum/new_post', :controller => "forum", :action => "new_post", :via => %i[get post]
  match 'forum/show_post/:id', :controller => "forum", :action => "show_post", :via => :get
  match 'forum/post_versions/:id', :controller => "forum", :action => "post_versions", :via => :get
  match 'forum/edit_post/:id', :controller => "forum", :action => "edit_post", :via => %i[get post]
  match 'forum/delete_post/:id', :controller => "forum", :action => "delete_post", :via => :get
  match 'forum/thank/:id', :controller => "forum", :action => "thank", :via => :get
  match 'forum/inappropriate/:id', :controller => "forum", :action => "inappropriate", :via => :get
  match 'forum/unthank/:id', :controller => "forum", :action => "unthank", :via => :get
  match 'forum/uninappropriate/:id', :controller => "forum", :action => "uninappropriate", :via => :get
  match 'forum/posts_by/:id', :controller => "forum", :action => "posts_by", :via => :get
  match 'forum/about', :controller => "forum", :action => "about", :via => :get

  match 'main/data_use_policy', :controller => "main", :action => "data_use_policy", :via => :get
  match 'main/request_commenting', :controller => "main", :action => "request_commenting", :via => :get
  match 'main/reports_by_ip', :controller => "main", :action => "reports_by_ip", :via => :get
  match 'main/php_search', :controller => "main", :action => "php_search", :via => :post
  match 'main/unflag/:id', :controller => "main", :action => "unflag", :via => :get
  match 'main/convert_flag/:id', :controller => "main", :action => "convert_flag", :via => :get
  match 'main/add_comment/:id', :controller => "main", :action => "add_comment", :via => %i[get post]
  match 'main/edit_comment/:id', :controller => "main", :action => "edit_comment", :via => %i[get post]
  match 'main/add_post', :controller => "main", :action => "add_post", :via => %i[get post]
  match 'main/edit_post/:id', :controller => "main", :action => "edit_post", :via => %i[get post]

  match 'mod/utils', :controller => "mod", :action => "utils", :via => :get
  match 'mod/close_account', :controller => "mod", :action => "close_account", :via => :get
  match 'mod/do_close_account', :controller => "mod", :action => "do_close_account", :via => :post
  match 'mod/mute_person', :controller => "mod", :action => "mute_person", :via => :get
  match 'mod/do_mute_person', :controller => "mod", :action => "do_mute_person", :via => :post
  match 'mod/search_by_email', :controller => "mod", :action => "search_by_email", :via => :get
  match 'mod/reassign_report_to_different_requester', :controller => "mod", :action => "reassign_report_to_different_requester", :via => :get
  match 'mod/do_reassign_report_to_different_requester', :controller => "mod", :action => "do_reassign_report_to_different_requester", :via => :post
  match 'mod/lock_thread/:id', :controller => "mod", :action => "lock_thread", :via => :get
  match 'mod/edit_rules', :controller => "mod", :action => "edit_rules", :via => :post
  match 'mod/index', :controller => "mod", :action => "index", :via => :get
  match 'mod/flagged', :controller => "mod", :action => "flagged", :via => :get
  match 'mod/ignored', :controller => "mod", :action => "ignored", :via => :get
  match 'mod/multi_ignored', :controller => "mod", :action => "multi_ignored", :via => :get
  match 'mod/hidden', :controller => "mod", :action => "hidden", :via => :get
  match 'mod/flag/:id', :controller => "mod", :action => "flag", :via => %i[get post]
  match 'mod/agree_with_flagger/:id', :controller => "mod", :action => "agree_with_flagger", :via => :get
  match 'mod/ignore/:id', :controller => "mod", :action => "ignore", :via => :get
  match 'mod/comment/:id', :controller => "mod", :action => "comment", :via => %i[get post]
  match 'mod/convert_other_persons_flag/:id', :controller => "mod", :action => "convert_other_persons_flag", :via => :get

  match 'reg/close', :controller => "reg", :action => "close", via: :get
  match 'reg/change_email', :controller => "reg", :action => "change_email", via: :post
  match 'reg/robot', :controller => "reg", :action => "robot", via: :get
  match 'reg/set_display_name', :controller => "reg", :action => "set_display_name", via: :post
  match 'reg/change_location', :controller => "reg", :action => "change_location", via: :post
  match 'reg/change_phone', :controller => "reg", :action => "change_phone", via: :post
  match 'reg/change_phone_and_location', :controller => "reg", :action => "change_phone_and_location", via: :post
  match 'reg/change_optin', :controller => "reg", :action => "change_optin", via: :post
  match 'reg/change_password', :controller => "reg", :action => "change_password", via: :post
  match 'reg/reset_password', :controller => "reg", :action => "reset_password", via: %i[get post]
  match 'reg/send_verification_email', :controller => "reg", :action => "send_verification_email", via: :get
  match 'reg/toggle_my_reviews_order_flag', :controller => "reg", :action => "toggle_my_reviews_order_flag", via: :get
  match 'reg/toggle_order_by_flag', :controller => "reg", :action => "toggle_order_by_flag", via: :get
  match 'reg/fancy_links_off', :controller => "reg", :action => "fancy_links_off", via: :get
  match 'reg/fancy_links_on', :controller => "reg", :action => "fancy_links_on", via: :get
  match 'reg/hide_long_reviews_off', :controller => "reg", :action => "hide_long_reviews_off", via: :get
  match 'reg/hide_long_reviews_on', :controller => "reg", :action => "hide_long_reviews_on", via: :get

  match 'stats/reviews', :controller => "stats", :action => "reviews", via: :get
end
