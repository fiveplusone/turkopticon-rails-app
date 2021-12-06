# == Schema Information
#
# Table name: posts
#
#  id         :integer          not null, primary key
#  body       :text(16777215)
#  is_sticky  :boolean
#  slug       :string(255)
#  title      :text(16777215)
#  created_at :datetime
#  updated_at :datetime
#  parent_id  :integer
#  person_id  :integer
#

class Post < ApplicationRecord

  def children
    Post.where(:parent_id => id)
  end

  def parent
    Post.find(parent_id)
  end

  def author_email
    Person.find(person_id).public_email
  end

end
