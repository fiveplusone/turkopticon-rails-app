class AddOptinToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :optin, :boolean, :default => false
  end

  def self.down
    remove_column :people, :optin
  end
end
