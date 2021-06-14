class Experience < ApplicationRecord
  validates :title, :company, presence: true 

  belongs_to :user
end