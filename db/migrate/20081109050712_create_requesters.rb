class CreateRequesters < ActiveRecord::Migration[4.2]
  def self.up
    create_table :requesters do |t|
      t.string :amzn_requester_id
      t.string :amzn_requester_name

      t.timestamps
    end
  end

  def self.down
    drop_table :requesters
  end
end
