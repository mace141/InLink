class Post < ApplicationRecord
  validates :body, presence: true, length: { minimum: 1 }

  belongs_to :user
end