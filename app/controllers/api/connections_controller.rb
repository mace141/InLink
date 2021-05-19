class Api::ConnectionsController < ApplicationController
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

    if @connection.update(connection_params)
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