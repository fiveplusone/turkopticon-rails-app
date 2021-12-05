# == Schema Information
#
# Table name: forum_post_versions
#
#  id         :integer          not null, primary key
#  body       :text(16777215)
#  ip         :string(255)
#  next       :integer
#  title      :text(16777215)
#  created_at :datetime
#  updated_at :datetime
#  person_id  :integer
#  post_id    :integer
#
class ForumPostVersion < ApplicationRecord

  def person
    Person.find(self.person_id)
  end

  def author_name
    person.public_email
  end

end
