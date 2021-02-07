# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  person_id  :integer
#  parent_id  :integer
#  title      :text(65535)
#  body       :text(65535)
#  created_at :datetime
#  updated_at :datetime
#  slug       :string(255)
#  is_sticky  :boolean
#

class Post < ApplicationRecord
  belongs_to :person

  def children
    Post.where(:parent_id => id)
  end

  def parent
    Post.find(parent_id)
  end

  def author_email
    person.public_email
  end

end
