# == Schema Information
#
# Table name: forum_person_info
#
#  id                       :integer          not null, primary key
#  person_id                :integer
#  karma                    :decimal(5, 2)
#  mail_forum_notifications :string(255)
#  created_at               :datetime
#  updated_at               :datetime
#
class ForumPersonInfo < ApplicationRecord
  self.table_name = 'forum_person_info'

  def up_effect
    self.initialize_karma
    self.karma < 0.0 ? 0.0 : self.karma
  end

  def down_effect
    self.initialize_karma
    self.karma < 0.0 ? 0.0 : -1.0 * self.karma
  end

  def initialize_karma
    if self.karma.nil?
      self.karma = 1
      self.save
    end
  end

end
