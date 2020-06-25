class AddLatestLoginAtToPeople < ActiveRecord::Migration
  def self.up
    add_column :people, :latest_login_at, :datetime
  end

  def self.down
    remove_column :people, :latest_login_at
  end
end
