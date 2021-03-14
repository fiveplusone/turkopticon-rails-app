class AddDisplayedNotesToFlags < ActiveRecord::Migration[4.2]
  def self.up
    add_column :flags, :displayed_notes, :text
  end

  def self.down
    remove_column :flags, :displayed_notes
  end
end
