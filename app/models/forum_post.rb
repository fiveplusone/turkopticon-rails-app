# == Schema Information
#
# Table name: forum_posts
#
#  id                      :integer          not null, primary key
#  person_id               :integer
#  parent_id               :integer
#  slug                    :string(255)
#  sticky                  :boolean
#  score                   :decimal(5, 2)
#  replies                 :integer
#  views                   :integer
#  last_reply_display_name :string(255)
#  last_reply_person_id    :string(255)
#  last_reply_id           :integer
#  last_reply_at           :datetime
#  created_at              :datetime
#  updated_at              :datetime
#  thread_head             :integer
#  deleted                 :boolean
#  initial_score           :decimal(5, 2)
#
class ForumPost < ApplicationRecord

  def current_version
    ForumPostVersion.find_by_post_id_and_next(self.id, nil)
  end

  def title
    current_version.title
  end

  def author_name
    Person.find(self.person_id).public_email
  end

  def body
    current_version.body
  end

  def increment_views
    if self.views.nil?
      self.views = 0
    end
    self.views +=1
    self.save
  end

  def update_replies
    if self.replies.nil?
      self.replies = 0
    end
    self.replies += 1
    last_reply = reply_posts.last
    self.last_reply_person_id = last_reply.person_id
    self.last_reply_display_name = last_reply.author_name
    self.last_reply_at = Time.now
    self.last_reply_id = last_reply.id
    self.save
  end

  def versions
    ForumPostVersion.where(:post_id => self.id)
  end

  def version_count
    versions.count
  end

  def reply_posts
    ForumPost.where(:thread_head => self.id)
  end

  def undelete
    self.deleted = nil
    self.save
    self.current_version.destroy
    self.current_version.update_attributes(:next => nil)
  end

  def thanks
    ReputationStatement.where(:post_id=> self.id, :statement => "thanks")
  end

  def inappropriate
    ReputationStatement.where(:post_id => self.id, :statement => "inappropriate")
  end

  def has_inappro
    !self.inappropriate.empty?
  end

  def update_score
    score = initial_score + thanks.map{|t| t.effect}.sum + inappropriate.map{|i| i.effect}.sum
  end

end
