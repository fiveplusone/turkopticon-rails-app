class AddThreadHeadToForumPosts < ActiveRecord::Migration[4.2]
  def self.up
    add_column :forum_posts, :thread_head, :integer
  end

  def self.down
    remove_column :forum_posts, :thread_head
  end
end
