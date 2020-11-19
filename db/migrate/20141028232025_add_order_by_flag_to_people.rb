class AddOrderByFlagToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :order_reviews_by_edit_date, :boolean
  end

  def self.down
    remove_column :people, :order_reviews_by_edit_date
  end
end
