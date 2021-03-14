class AddCommentingRequestedToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :commenting_requested, :boolean
  end

  def self.down
    remove_column :people, :commenting_requested
  end
end
