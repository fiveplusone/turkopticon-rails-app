class AddDisplayedNotesToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :displayed_notes, :text
  end

  def self.down
    remove_column :reports, :displayed_notes
  end
end
