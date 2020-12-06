class RulesVersion < ApplicationRecord
  def parent
    RulesVersion.find(parent_id)
  end
  def self.current
    RulesVersion.where(:is_current => true).last
  end
end
