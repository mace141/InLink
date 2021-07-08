class Api::ConnectionsController < ApplicationController
  def index 
    user_id = current_user.id
    @connections = Connection.includes(:connector)
                             .where("connector_id = #{user_id} OR connected_id = #{user_id}")
  end

  def connected
    @out_connection = Connection.find_by(
      connector_id: params[:connector_id],
      connected_id: params[:connected_id] 
    )

    @in_connection = Connection.find_by(
      connected_id: params[:connector_id],
      connector_id: params[:connected_id] 
    )
    
    if @out_connection || @in_connection
      @connection = @out_connection || @in_connection
      render :show
    else 
      render json: { accepted: nil }
    end
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