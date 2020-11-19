class AddPayBucketToReports < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reports, :pay_bucket, :string
  end

  def self.down
    remove_column :reports, :pay_bucket
  end
end
