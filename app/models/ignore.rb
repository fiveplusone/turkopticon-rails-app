# == Schema Information
#
# Table name: ignores
#
#  id         :integer          not null, primary key
#  person_id  :integer
#  report_id  :integer
#  created_at :datetime
#  updated_at :datetime
#
class Ignore < ApplicationRecord

  belongs_to :person
  belongs_to :report

end
