class AddConfirmationTokenToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :confirmation_token, :string
  end

  def self.down
    remove_column :people, :confirmation_token
  end
end
