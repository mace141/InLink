class Like < ApplicationRecord 
  validates :user_id, uniqueness: { scope: [:likeable_type, :likeable_id ] }

  belongs_to :user

  belongs_to :likeable, polymorphic: true
end