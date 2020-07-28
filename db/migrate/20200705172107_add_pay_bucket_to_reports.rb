class AddPayBucketToReports < ActiveRecord::Migration
  def self.up
    add_column :reports, :pay_bucket, :string
  end

  def self.down
    remove_column :reports, :pay_bucket
  end
end
