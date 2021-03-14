class AddStateToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :state, :string
  end

  def self.down
    remove_column :people, :state
  end
end
