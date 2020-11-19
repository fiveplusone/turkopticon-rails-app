class AddCommentingRequestedAtToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :commenting_requested_at, :datetime
  end

  def self.down
    remove_column :people, :commenting_requested_at
  end
end
