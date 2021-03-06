# == Schema Information
#
# Table name: flags
#
#  id              :integer          not null, primary key
#  report_id       :integer
#  person_id       :integer
#  comment         :text(65535)
#  created_at      :datetime
#  updated_at      :datetime
#  displayed_notes :text(65535)
#

class Flag < ApplicationRecord

  belongs_to :person
  belongs_to :report

  validates_presence_of :comment

  def convert_to_comment_by(person, converted_by)
    person_name = converted_by.public_email
    pid = person.id
    note = "\n\nThis comment used to be a flag. "
    note += "It was converted by <strong>" + person_name + "</strong> at "
    note += Time.now.strftime("%l:%M %p %b %d %Y %Z") + "."
    rid = self.report_id
    Comment.new(:report_id => self.report_id,
                :person_id => pid,
                :body => self.comment,
                :displayed_notes => note,
                :created_at => self.created_at).save
    self.destroy
    Report.find(rid).update_flag_data
  end

  def convert_to_comment
    note = "\n\nThis comment used to be a flag. "
    note += "It was converted by the author at "
    note += Time.now.strftime("%l:%M %p %b %d %Y %Z") + "."
    rid = self.report_id
    Comment.new(:report_id => self.report_id,
                :person_id => self.person_id,
                :body => self.comment,
                :displayed_notes => note,
                :created_at => self.created_at).save
    self.destroy
    Report.find(rid).update_flag_data
  end

end
