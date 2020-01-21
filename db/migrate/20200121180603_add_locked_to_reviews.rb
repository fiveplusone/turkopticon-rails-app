class AddLockedToReviews < ActiveRecord::Migration
  def self.up
    add_column :reports, :locked, :boolean
    add_column :reports, :locked_until, :timestamp
    add_column :reports, :locked_by_person_id, :integer
  end

  def self.down
    remove_column :reports, :locked
    remove_column :reports, :locked_until
    remove_column :reports, :locked_by_person_id
  end
end
