class Comment < ApplicationRecord
  validate :ensure_content

  belongs_to :user

  belongs_to :post

  belongs_to :parent_comment,
    class_name: :Comment,
    optional: true

  has_many :comments,
    foreign_key: :parent_comment_id,
    dependent: :destroy

  has_many :likes, as: :likeable, dependent: :destroy

  has_one_attached :media, dependent: :destroy

  def ensure_content
    unless self.body.length > 0 || self.media.attached?
      errors.add(:comment, 'must have content')
    end
  end
end