class CreateReports < ActiveRecord::Migration[4.2]
  def self.up
    create_table :reports, options: 'ENGINE=MyISAM DEFAULT CHARSET=latin1' do |t|
      t.integer :person_id
      t.integer :requester_id
      t.string :hit_id
      t.text :description

      t.timestamps
    end
  end

  def self.down
    drop_table :reports
  end
end
