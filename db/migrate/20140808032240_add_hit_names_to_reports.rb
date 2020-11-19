class AddHitNamesToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :hit_names, :text
  end

  def self.down
    remove_column :reports, :hit_names
  end
end
