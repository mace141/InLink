class EditConnections < ActiveRecord::Migration[5.2]
  def change
    add_index :connections, [:connector_id, :connected_id], unique: true
  end
end
