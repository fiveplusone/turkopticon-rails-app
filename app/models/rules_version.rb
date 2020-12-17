# == Schema Information
#
# Table name: rules_versions
#
#  id                  :integer          not null, primary key
#  parent_id           :integer
#  is_current          :boolean
#  edited_by_person_id :integer
#  created_at          :datetime
#  updated_at          :datetime
#  body                :text(65535)
#
class RulesVersion < ApplicationRecord
  def parent
    RulesVersion.find(parent_id)
  end
  def self.current
    RulesVersion.where(:is_current => true).last
  end
end
