class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.integer :connector_id, null: false
      t.integer :connected_id, null: false
      t.boolean :accepted, null: false, default: false

      t.timestamps
    end
  end
end
