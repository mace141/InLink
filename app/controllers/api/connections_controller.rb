class Api::ConnectionsController < ApplicationController
  def index 
    user_id = current_user.id
    @connections = Connection.includes(:connector)
                             .where("connector_id = #{user_id} OR connected_id = #{user_id}")
  end

  def show 
    @connection = Connection.find(params[:id]).includes(:user)
  end

  def create 
    @connection = Connection.new(connection_params)

    if @connection.save 
      render :show
    else
      render json: @connection.errors.full_messages, status: 400
    end
  end

  def update 
    @connection = Connection.find(params[:id])
    
    if @connection.update({ accepted: true })
      render :show 
    else
      render json: @connection.errors.full_messages, status: 400
    end
  end

  def destroy
    @connection = Connection.find(params[:id])

    @connection.destroy 
    render :show
  end

  private 

  def connection_params 
    params.require(:connection).permit(:connector_id, :connected_id, :accepted)
  end
end