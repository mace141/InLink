class Api::PostsController < ApplicationController 
  def index 
    @posts = Post.all

    # INFINITE SCROLLING: 
    # fetch 10 posts by connections, order by updated time. save the updated time of the last post
    # fetch 10 more posts starting from saved updated time, order by updated time
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