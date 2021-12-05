# == Schema Information
#
# Table name: notifications
#
#  id         :integer          not null, primary key
#  body       :text(16777215)
#  read       :boolean
#  read_at    :datetime
#  title      :text(16777215)
#  created_at :datetime
#  updated_at :datetime
#  person_id  :integer
#
class Notification < ApplicationRecord
end
