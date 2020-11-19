class AddDisplayNameToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :display_name, :string
  end

  def self.down
    remove_column :people, :display_name
  end
end
