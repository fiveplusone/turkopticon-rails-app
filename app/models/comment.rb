# == Schema Information
#
# Table name: comments
#
#  id              :integer          not null, primary key
#  report_id       :integer
#  person_id       :integer
#  body            :text(65535)
#  created_at      :datetime
#  updated_at      :datetime
#  notes           :text(65535)
#  displayed_notes :text(65535)
#

class Comment < ApplicationRecord

  belongs_to :person
  belongs_to :report
  validates_presence_of :body

end
