# == Schema Information
#
# Table name: forum_post_versions
#
#  id         :integer          not null, primary key
#  post_id    :integer
#  ip         :string(255)
#  title      :text(65535)
#  body       :text(65535)
#  next       :integer
#  created_at :datetime
#  updated_at :datetime
#  person_id  :integer
#
class ForumPostVersion < ApplicationRecord
  belongs_to :person

  def author_name
    person.public_email
  end

end
