class CreateEducations < ActiveRecord::Migration[5.2]
  def change
    create_table :educations do |t|
      t.integer :user_id
      t.string :school
      t.string :degree
      t.string :field
      t.integer :start_year
      t.integer :end_year
      t.string :grade
      t.text :activities
      t.text :description

      t.timestamps
    end
  end
end
