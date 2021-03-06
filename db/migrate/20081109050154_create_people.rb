class CreatePeople < ActiveRecord::Migration[4.2]
  def self.up
    create_table :people do |t|
      t.string :email
      t.string :hashed_password
      t.string :salt
      t.boolean :email_verified

      t.timestamps
    end
  end

  def self.down
    drop_table :people
  end
end
