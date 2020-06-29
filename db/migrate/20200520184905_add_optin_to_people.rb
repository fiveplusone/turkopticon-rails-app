class AddOptinToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :optin, :boolean, :default => false
  end

  def self.down
    remove_column :people, :optin
  end
end
