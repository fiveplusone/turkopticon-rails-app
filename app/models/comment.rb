# == Schema Information
#
# Table name: comments
#
#  id              :integer          not null, primary key
#  body            :text(16777215)
#  displayed_notes :text(16777215)
#  notes           :text(16777215)
#  created_at      :datetime
#  updated_at      :datetime
#  person_id       :integer
#  report_id       :integer
#

class Comment < ApplicationRecord

  belongs_to :person
  belongs_to :report
  validates_presence_of :body

end
