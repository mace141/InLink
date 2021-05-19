class Api::PostsController < ApplicationController 
  def index 
    @posts = Post.all.includes(:likes)

    # INFINITE SCROLLING: 
    # fetch 10 posts by connections, order by created time. save the created time of the last post
    # fetch 10 more posts starting from saved created time, order by created time
  end

  def comment_count 
    @post = Post.find(params[:id]).includes(:comments)

    render json: @post.comments.count
  end

  def create 
    @post = Post.new(post_params)
    
    if @post.save
      render :show
    else
      render json: @post.errors.full_messages, status: 400
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  def update 
    @post = Post.find(params[:id])

    if @post.update(post_params)
      render :show 
    else 
      render json: @post.errors.full_messages
    end
  end

  def destroy 
    @post = Post.find(params[:id])
    
    @post.destroy
    render :show
  end

  private 

  def post_params
    params.require(:post).permit(:body, :user_id, :media)
  end
end