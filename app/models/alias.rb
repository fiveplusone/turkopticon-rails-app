# == Schema Information
#
# Table name: aliases
#
#  id           :integer          not null, primary key
#  requester_id :integer
#  formerly     :integer
#  created_at   :datetime
#  updated_at   :datetime
#

class Alias < ApplicationRecord
end
