# == Schema Information
#
# Table name: notifications
#
#  id         :integer          not null, primary key
#  person_id  :integer
#  title      :text(65535)
#  body       :text(65535)
#  read       :boolean
#  read_at    :datetime
#  created_at :datetime
#  updated_at :datetime
#
class Notification < ApplicationRecord
end
