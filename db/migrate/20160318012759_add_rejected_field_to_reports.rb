class AddRejectedFieldToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :rejected, :string
  end

  def self.down
    remove_column :reports, :rejected
  end
end
