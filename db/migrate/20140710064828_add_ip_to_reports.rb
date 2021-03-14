class AddIpToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :ip, :string
  end

  def self.down
    remove_column :reports, :ip
  end
end
