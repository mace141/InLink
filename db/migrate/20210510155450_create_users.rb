class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      t.string :fname, null: false
      t.string :lname, null: false
      t.string :location, null: false
      t.string :headline, null: false
      t.string :industry, null: false
      t.text :summary

      t.timestamps
    end

    add_index :users, :email, unique: true
    add_index :users, :session_token, unique: true
    add_index :users, :fname
    add_index :users, :lname
    add_index :users, :location
    add_index :users, :headline
    add_index :users, :industry
  end
end
