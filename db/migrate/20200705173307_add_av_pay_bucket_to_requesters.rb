class AddAvPayBucketToRequesters < ActiveRecord::Migration
  def self.up
    add_column :requesters, :av_pay_bucket, :string
  end

  def self.down
    remove_column :requesters, :av_pay_bucket
  end
end
