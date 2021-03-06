class Api::SessionsController < ApplicationController
  def create 
    user_par = params[:user]
    @user = User.includes(:in_connects)
                .includes(:out_connects)
                .find_by_credentials(user_par[:email], user_par[:password])

    if @user 
      login!(@user)
      render '/api/users/show'
    else 
      render json: User.login_errors(user_par), status: 401
    end
  end

  def destroy 
    if current_user 
      logout!
      render json: {}
    else
      render json: ["Can't log out if you're not logged in"], status: 401
    end
  end
end