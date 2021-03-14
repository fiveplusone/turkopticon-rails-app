class MoveEditNotesToDisplayedNotes < ActiveRecord::Migration[6.0]
  def up
    sql = <<~SQL
      SELECT id, body, displayed_notes
      FROM comments
      WHERE body LIKE "%<span class='edit_note'>%"
    SQL

    select_all(sql).each do |comment|
      splits = comment['body'].split("<span class='edit_note'>")
      leading_body = splits[0].strip
      edit_note_splits = splits[1].split('</span>')
      edit_note = edit_note_splits[0]
      trailing_body = edit_note_splits[1]&.strip
      new_displayed_notes = comment['displayed_notes'].to_s + edit_note + '<br/>'
      new_body = [leading_body, trailing_body].compact.join("\n\n")

      execute(
        ActiveRecord::Base.sanitize_sql(
          [
            'UPDATE comments SET body = :body, displayed_notes = :displayed_notes WHERE id = :id',
            id: comment['id'],
            body: new_body,
            displayed_notes: new_displayed_notes
          ]
        )
      )

    end
  end

  def down; end
end
