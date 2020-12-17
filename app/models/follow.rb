# == Schema Information
#
# Table name: follows
#
#  id          :integer          not null, primary key
#  person_id   :integer
#  follow_type :string(255)
#  follow_id   :integer
#  created_at  :datetime
#  updated_at  :datetime
#
class Follow < ApplicationRecord
end
