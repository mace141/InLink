class Comment < ApplicationRecord
  validate :ensure_content

  has_many :likes, as: :likeable, dependent: :destroy

  has_one_attached :media, dependent: :destroy

  def ensure_content
    unless self.body.length > 0 || self.media.attached?
      errors.add(:post, 'must have content')
    end
  end
end