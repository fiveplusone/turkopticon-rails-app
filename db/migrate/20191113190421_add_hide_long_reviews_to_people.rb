class AddHideLongReviewsToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :hide_long_reviews, :boolean
  end

  def self.down
    remove_column :people, :hide_long_reviews
  end
end
