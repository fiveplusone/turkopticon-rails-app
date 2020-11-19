class AddCountryToPeople < ActiveRecord::Migration[4.2]
  def self.up
    add_column :people, :country, :string
  end

  def self.down
    remove_column :people, :country
  end
end
