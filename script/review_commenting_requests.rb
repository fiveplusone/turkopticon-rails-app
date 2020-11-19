#!/usr/bin/ruby

likely = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count >= 5}
out = "Enabled commenting for:\n"
likely.each{|person|
  person.update_attributes(:can_comment => true)
  AdminMailer.enabled(person).deliver_now
  out += "#{person.id.to_s}    #{person.public_email}\n"
}
out += "\n\n"
unlikely = Person.find_all_by_can_comment_and_commenting_requested_and_commenting_request_ignored(nil, true, nil).select{|p| p.reports.count < 5}
unlikely.each{|person|
  person.update_attributes(:commenting_requested => nil, :commenting_requested_at => nil)
  AdminMailer.declined(person).deliver_now
}
out += "Declined commenting for " + unlikely.join(", ")
