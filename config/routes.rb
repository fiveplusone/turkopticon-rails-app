Rails.application.routes.draw do
  root :controller => "main", :action => "info"
  match '2016survey', :controller => "main", :action => "survey2016", :via => :all
  match 'forum', :controller => "forum", :action => "index", :via => :all
  match 'rules', :controller => "main", :action => "rules", :via => :all
  match 'stats', :controller => "stats", :via => :all
  match 'mod', :controller => "mod", :via => :all
  match 'x', :controller => "main", :action => "x", :via => :all
  match 'pri', :controller => "main", :action => "pri", :via => :all
  match 'issues', :controller => "main", :action => "issues", :via => :all
  match 'login', :controller => "reg", :action => "login", :via => :all
  match 'logout', :controller => "reg", :action => "logout", :via => :all
  match 'register', :controller => "reg", :action => "register", :via => :all
  match 'report', :controller => "main", :action => "add_report", :via => :all
  match 'edit/:id', :controller => "main", :action => "edit_report", :via => :all
  match 'reports', :controller => "main", :action => "index", :via => :all
  match 'edit/:id', :controller => "main", :action => "edit_report", :via => :all
  match 'info', :controller => "main", :action => "info", :via => :all
  match 'ditz', :controller => "main", :action => "ditz", :via => :all
  match 'blog', :controller => "main", :action => "blog", :via => :all
  match 'feed', :controller => "main", :action => "blogfeed", :via => :all
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
  match 'wth', :controller => "main", :action => "wth", :via => :all
  match ':id', :controller => "main", :action => "index", :via => :all
  match 'get_report/:id', :controller => "main", :action => "report", :via => :all
  match 'requester_stats/:id', :controller => "main", :action => "requester_stats", :via => :all
  match 'attrs/:id', :controller => "main", :action => "requester_attrs", :via => :all
  match 'attrsv2/:id', :controller => "main", :action => "requester_attrs_v2", :via => :all
  match 'confirm/:hash', :controller => "reg", :action => "confirm", :via => :all
  match 'enable_commenting/:id', :controller => "mod", :action => "enable_commenting", :via => :all
  match 'disable_commenting/:id', :controller => "mod", :action => "disable_commenting", :via => :all
  match ':controller/:action/:id', :via => :all
  match ':controller/:action/:id.:format', :via => :all
  match ':controller/:action', :via => :all
end
