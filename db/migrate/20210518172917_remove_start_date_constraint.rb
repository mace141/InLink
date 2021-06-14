class RemoveStartDateConstraint < ActiveRecord::Migration[5.2]
  def change
    change_column :experiences, :start_date, :date
  end
end
