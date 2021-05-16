class Api::CommentsController < ApplicationController
  def index 
    @comments = params[:parent_comment_id] ? 
      Comment.find_by(parent_comment_id: params[:parent_comment_id]).comments :
      Comment.find_by(post_id: params[:post_id]).comments
  end

  def create
    @comment = Comment.new(comment_params)

    if @comment.save 
      render :show 
    else
      render json: @comment.errors.full_messages, status: 400
    end
  end

  def update 
    @comment = Comment.find(params[:id])

    if @comment.update(comment_params)
      render :show 
    else
      render json: @comment.errors.full_messages
    end
  end

  def destroy 
    @comment = Comment.find(params[:id])

    @comment.destroy 
    render :show
  end

  private 

  def comment_params 
    params.require(:comment).permit(:body, :user_id, :post_id, :media, :parent_comment_id)
  end
end