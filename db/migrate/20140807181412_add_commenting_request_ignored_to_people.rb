class AddCommentingRequestIgnoredToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :commenting_request_ignored, :boolean
  end

  def self.down
    remove_column :people,:commenting_request_ignored
  end
end
