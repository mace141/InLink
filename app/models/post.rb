class Post < ApplicationRecord
  validate :ensure_content

  belongs_to :user

  has_many :comments, dependent: :destroy

  has_many :likes, as: :likeable, dependent: :destroy

  has_one_attached :media, dependent: :destroy

  def ensure_content
    unless self.body.length > 0 || self.media.attached?
      errors.add(:post, 'must have content')
    end
  end
end