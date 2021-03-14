class AddNotesToComments < ActiveRecord::Migration[4.2]
  def self.up
    add_column :comments, :notes, :text
  end

  def self.down
    remove_column :comments, :notes
  end
end
