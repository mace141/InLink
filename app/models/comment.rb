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

  def self.two_comments(post_id)
    comments = Comment.where(post_id: post_id, parent_comment_id: nil)

    if comments 
      comments = comments.order(created_at: :desc)
                         .limit(2)
      return comments 
    else
      return []
    end
  end

  def self.more_comments(post_id, limit)
    comments = Comment.where(post_id: post_id, parent_comment_id: nil)

    if comments 
      comments = comments.order(created_at: :desc)
                         .limit(limit * 10)
      return comments
    else
      return []
    end
  end

  def self.last_reply(parent_comment_id)
    comments = Comment.where(parent_comment_id: parent_comment_id)
    
    if comments 
      comment = comments.order(created_at: :desc).limit(1)
      return comment 
    else
      return []
    end
  end

  def self.more_replies(parent_comment_id, limit)
    comments = Comment.where(parent_comment_id: parent_comment_id)

    if comments 
      comments = comments.order(created_at: :desc)
                         .limit(limit * 10)
      return comments 
    else
      return []
    end
  end
end