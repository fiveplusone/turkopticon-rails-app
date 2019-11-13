class AddHideLongReviewsToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :hide_long_reviews, :boolean
  end

  def self.down
    remove_column :people, :hide_long_reviews
  end
end
