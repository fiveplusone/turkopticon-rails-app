class AddIpToReputationStatements < ActiveRecord::Migration[4.2]
  def self.up
    add_column :reputation_statements, :ip, :string
  end

  def self.down
    remove_column :reputation_statements, :ip
  end
end
