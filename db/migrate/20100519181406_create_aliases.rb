class CreateAliases < ActiveRecord::Migration[4.2]
  def self.up
    create_table :aliases do |t|
      t.integer :requester_id
      t.integer :formerly

      t.timestamps
    end
  end

  def self.down
    drop_table :aliases
  end
end
