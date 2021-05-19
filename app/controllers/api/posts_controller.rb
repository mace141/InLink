class Api::PostsController < ApplicationController 
  def index 
    user_id = current_user.id
    connected_users = User.joins(:in_connects)
                          .where("connections.accepted = true AND (connections.connector_id = #{user_id} OR connections.connected_id = #{user_id})")
                          .pluck(:id)

    @posts = Post.includes(:user)
                 .where(user_id: connected_users)
                 .order(created_at: :desc)
                 .includes(:likes)
                 #  .offset(params[:offset] * 10)
                 #  .limit(10)
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