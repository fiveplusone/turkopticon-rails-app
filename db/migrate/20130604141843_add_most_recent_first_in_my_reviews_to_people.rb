class AddMostRecentFirstInMyReviewsToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :most_recent_first_in_my_reviews, :boolean
  end

  def self.down
    remove_column :people, :most_recent_first_in_my_reviews
  end
end
