class Api::LikesController < ApplicationController
  def index 
    case params[:type]
    when 'comment'
      @likes = Comment.find(params[:comment_id]).likes
    when 'post'
      @likes = Post.find(params[:post_id]).likes
    end
  end

  def create 
    @like = Like.new(like_params)

    if @like.save 
      render :show 
    else
      render json: @like.errors.full_messages
    end
  end

  def destroy 
    @like = Like.find(params[:id])

    @like.destroy 
    render :show
  end

  private 

  def like_params
    params.require(:like).permit(:user_id, :likeable_id, :likeable_type)
  end
end