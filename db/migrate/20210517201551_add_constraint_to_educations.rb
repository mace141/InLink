class AddConstraintToEducations < ActiveRecord::Migration[5.2]
  def change
    change_column :educations, :user_id, :integer, null: false
    change_column :educations, :school, :string, null: false
  end
end
