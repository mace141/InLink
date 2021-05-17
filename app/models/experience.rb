class Experience < ApplicationRecord
  validates :title, :company, :start_date, presence: true 

  belongs_to :user
end