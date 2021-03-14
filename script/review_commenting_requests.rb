#!/usr/bin/ruby

likely = Person.where(:can_comment  => nil, :commenting_requested => true, :commenting_request_ignored => nil).select{|p| p.reports.count >= 5}
out = "Enabled commenting for:\n"
likely.each{|person|
  person.update_attributes(:can_comment => true)
  AdminMailer.enabled(person).deliver_now
  out += "#{person.id.to_s}    #{person.public_email}\n"
}
out += "\n\n"
unlikely = Person.where(:can_comment  => nil, :commenting_requested => true, :commenting_request_ignored => nil).select{|p| p.reports.count < 5}
unlikely.each{|person|
  person.update_attributes(:commenting_requested => nil, :commenting_requested_at => nil)
  AdminMailer.declined(person).deliver_now
}
out += "Declined commenting for " + unlikely.join(", ")
