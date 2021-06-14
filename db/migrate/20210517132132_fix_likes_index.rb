class FixLikesIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :likes, name: :index_likes_on_likeable_id
    add_index :likes, [:likeable_id, :likeable_type, :user_id], unique: true
  end
end
