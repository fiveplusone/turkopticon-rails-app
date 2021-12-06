# frozen_string_literal: true

class ChangeReportsToInnodb < ActiveRecord::Migration[6.0]
  def up
    execute <<~SQL
      ALTER TABLE `reports` ENGINE=InnoDB
    SQL
  end

  def down
    execute <<~SQL
      ALTER TABLE `reports` ENGINE=MyISAM
    SQL
  end
end
