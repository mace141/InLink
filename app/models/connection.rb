class Connection < ApplicationRecord
  belongs_to :connector,
    class_name: :User

  belongs_to :connected,
    class_name: :User
end