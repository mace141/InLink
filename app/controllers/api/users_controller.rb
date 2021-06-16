class Api::UsersController < ApplicationController
  def index 
    search = params[:search]
  end

  def create
    @user = User.new(user_params)

    if @user.save 
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 401
    end
  end

  def show 
    @user = User.includes(:educations)
                .includes(:experiences)
                .includes(:in_connects)
                .includes(:out_connects)
                .find(params[:id])
  end

  def update 
    @user = User.find(params[:id])

    if @user.update(user_params)
      render :show 
    else
      render json: @user.errors.full_messages
    end
  end

  def email 
    @user = User.find_by(email: params[:user][:email])

    if @user 
      render :show
    else
      render json: 0
    end
  end

  private 

  def user_params 
    params.require(:user).permit(:email, :password, :fname, :lname, :location, :headline, :industry, :summary, :avatar, :background)
  end
end