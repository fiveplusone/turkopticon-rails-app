class AddLatestReviewAtToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :latest_review_at, :datetime
  end

  def self.down
    remove_column :people, :latest_review_at
  end
end
