class AddFlaggedAndHiddenFlagsToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :is_flagged, :boolean
    add_column :reports, :is_hidden, :boolean
  end

  def self.down
    remove_column :reports, :is_flagged
    remove_column :reports, :is_hidden
  end
end
