class Post < ApplicationRecord
  # validates :body, presence: true #, length: { minimum: 1 }
  validate :ensure_content

  belongs_to :user

  has_one_attached :media, dependent: :destroy

  def ensure_content
    unless self.body.length > 0 || self.media.attached?
      errors.add(:post, 'must have content')
    end
  end
end