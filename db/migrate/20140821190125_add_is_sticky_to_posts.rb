class AddIsStickyToPosts < ActiveRecord::Migration[4.2]
  def self.up
    add_column :posts, :is_sticky, :boolean
  end

  def self.down
    remove_column :posts, :is_sticky
  end
end
