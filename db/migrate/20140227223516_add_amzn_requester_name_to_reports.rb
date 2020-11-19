class AddAmznRequesterNameToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :amzn_requester_name, :string
  end

  def self.down
    remove_column :reports, :amzn_requester_name
  end
end
