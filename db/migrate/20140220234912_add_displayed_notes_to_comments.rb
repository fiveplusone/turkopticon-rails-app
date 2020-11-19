class AddDisplayedNotesToComments < ActiveRecord::Migration[4.2]
  def self.up
    add_column :comments, :displayed_notes, :text
  end

  def self.down
    remove_column :comments, :displayed_notes
  end
end
