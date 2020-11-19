class AddConfirmationTokenToPeople < ActiveRecord::Migration[4.2]
  def change
    add_column :people, :confirmation_token, :string
  end
end
