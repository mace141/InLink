class Post < ApplicationRecord
  validate :ensure_content

  belongs_to :user

  has_many :in_connected_users,
    through: :user,
    source: :in_connects

  has_many :out_connected_users,
    through: :user,
    source: :out_connects

  has_many :comments, dependent: :destroy

  has_many :likes, as: :likeable, dependent: :destroy

  has_one_attached :media, dependent: :destroy

  def ensure_content
    unless self.body.length > 0 || self.media.attached?
      errors.add(:post, 'must have content')
    end
  end
end