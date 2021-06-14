json.connection do 
  json.set! @connection.id do 
    json.partial! '/api/connections/connection', connection: @connection
  end
end

json.user do 
  if @connection.connector.id == current_user.id 
    json.set! @connection.connected.id do 
      json.partial! '/api/users/user', user: @connection.connected 
    end
  else
    json.set! @connection.connector.id do 
      json.partial! '/api/users/user', user: @connection.connector
    end
  end
end