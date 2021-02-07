# == Schema Information
#
# Table name: reputation_statements
#
#  id         :integer          not null, primary key
#  person_id  :integer
#  post_id    :integer
#  statement  :string(255)
#  effect     :decimal(3, 2)
#  created_at :datetime
#  updated_at :datetime
#  ip         :string(255)
#
class ReputationStatement < ApplicationRecord
  belongs_to :person
end
