class AddAdminFlagToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :is_admin, :boolean
  end

  def self.down
    remove_column :people, :is_admin
  end
end
