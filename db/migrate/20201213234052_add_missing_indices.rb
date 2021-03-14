class AddMissingIndices < ActiveRecord::Migration[6.0]
  def change
    add_index :reports, :amzn_requester_name, name: 'reports_requester_name_index', type: :fulltext
    add_index :reports, :requester_id, name: 'requester_id_index'
    add_index :requesters, :amzn_requester_id, name: 'amzn_requester_id_index'
  end
end
