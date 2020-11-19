class AddOldNameToRequesters < ActiveRecord::Migration[4.2]
  def self.up
    add_column :requesters, :old_name, :string
  end

  def self.down
    remove_column :requesters, :old_name
  end
end
