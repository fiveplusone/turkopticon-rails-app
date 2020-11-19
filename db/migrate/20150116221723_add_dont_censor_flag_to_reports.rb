class AddDontCensorFlagToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :dont_censor, :boolean
  end

  def self.down
    remove_column :reports, :dont_censor
  end
end
