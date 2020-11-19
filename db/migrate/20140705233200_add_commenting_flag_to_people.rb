class AddCommentingFlagToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :can_comment, :boolean
  end

  def self.down
    remove_column :people, :can_comment
  end
end
