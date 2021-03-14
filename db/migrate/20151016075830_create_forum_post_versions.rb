class CreateForumPostVersions < ActiveRecord::Migration[4.2]
  def self.up
    create_table :forum_post_versions do |t|
      t.integer :post_id
      t.string :ip
      t.text :title
      t.text :body
      t.integer :next
      t.timestamps
    end
  end

  def self.down
    drop_table :forum_post_versions
  end
end