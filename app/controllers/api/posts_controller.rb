class Api::PostsController < ApplicationController 
  def index 
    user_id = current_user.id
    in_connects = Connection.where(connected_id: user_id, accepted: true)
                            .pluck(:connector_id)

    out_connects = Connection.where(connector_id: user_id, accepted: true)
                             .pluck(:connected_id)

    connected_users = in_connects | out_connects
    connected_users.push(user_id)
    
    @posts = Post.includes(:user)
                 .where(user_id: connected_users)
                 .order(created_at: :desc)
                 .includes(:likes)
                 .offset(params[:offset].to_i * 10)
                 .limit(10)
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
    @post = Post.includes(:user).find(params[:id])
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