class AddIsClosedToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :is_closed, :boolean
    add_column :people, :closed_at, :datetime
  end

  def self.down
    remove_column :people, :is_closed
    remove_column :people, :closed_at
  end
end
