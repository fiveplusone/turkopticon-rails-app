# == Schema Information
#
# Table name: rules_versions
#
#  id                  :integer          not null, primary key
#  body                :text(16777215)
#  is_current          :boolean
#  created_at          :datetime
#  updated_at          :datetime
#  edited_by_person_id :integer
#  parent_id           :integer
#
class RulesVersion < ApplicationRecord
  def parent
    RulesVersion.find(parent_id)
  end
  def self.current
    RulesVersion.where(:is_current => true).last
  end
end
