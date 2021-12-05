# frozen_string_literal: true

class ConvertToUtf8Mb4 < ActiveRecord::Migration[6.0]
  TABLES = %w[
    aliases
    comments
    flags
    follows
    forum_person_info
    forum_post_versions
    forum_posts
    ignores
    notifications
    people
    posts
    reports
    reputation_statements
    requesters
    rules_versions
  ].freeze

  def up
    TABLES.each do |table|
      execute "ALTER TABLE `#{table}` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    end
  end

  def down
    TABLES.each do |table|
      execute "ALTER TABLE `#{table}` CONVERT TO CHARACTER SET latin1 COLLATE latin1_swedish_ci"
    end
  end
end
