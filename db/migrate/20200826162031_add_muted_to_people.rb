class AddMutedToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :muted, :boolean
    add_column :people, :muted_until, :timestamp
    add_column :people, :muted_by_person_id, :integer
  end

  def self.down
    remove_column :people, :muted
    remove_column :people, :muted_until
    remove_column :people, :muted_by_person_id
  end
end
