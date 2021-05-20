# == Route Map
#
#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      root GET    /                                                                                        static_pages#root
#           api_users_email GET    /api/users/email(.:format)                                                               api/users#email
#   api_comments_root_count GET    /api/comments/root_count(.:format)                                                       api/comments#root_comment_count
#  api_comments_reply_count GET    /api/comments/reply_count(.:format)                                                      api/comments#reply_comment_count
#      api_likes_user_liked GET    /api/likes/user_liked(.:format)                                                          api/likes#user_liked
#                 api_users POST   /api/users(.:format)                                                                     api/users#create {:format=>:json}
#                  api_user GET    /api/users/:id(.:format)                                                                 api/users#show {:format=>:json}
#                 api_posts GET    /api/posts(.:format)                                                                     api/posts#index {:format=>:json}
#                           POST   /api/posts(.:format)                                                                     api/posts#create {:format=>:json}
#                  api_post GET    /api/posts/:id(.:format)                                                                 api/posts#show {:format=>:json}
#                           PATCH  /api/posts/:id(.:format)                                                                 api/posts#update {:format=>:json}
#                           PUT    /api/posts/:id(.:format)                                                                 api/posts#update {:format=>:json}
#                           DELETE /api/posts/:id(.:format)                                                                 api/posts#destroy {:format=>:json}
#              api_comments GET    /api/comments(.:format)                                                                  api/comments#index {:format=>:json}
#                           POST   /api/comments(.:format)                                                                  api/comments#create {:format=>:json}
#               api_comment PATCH  /api/comments/:id(.:format)                                                              api/comments#update {:format=>:json}
#                           PUT    /api/comments/:id(.:format)                                                              api/comments#update {:format=>:json}
#                           DELETE /api/comments/:id(.:format)                                                              api/comments#destroy {:format=>:json}
#                 api_likes GET    /api/likes(.:format)                                                                     api/likes#index {:format=>:json}
#                           POST   /api/likes(.:format)                                                                     api/likes#create {:format=>:json}
#                  api_like DELETE /api/likes/:id(.:format)                                                                 api/likes#destroy {:format=>:json}
#           api_experiences GET    /api/experiences(.:format)                                                               api/experiences#index {:format=>:json}
#                           POST   /api/experiences(.:format)                                                               api/experiences#create {:format=>:json}
#            api_experience DELETE /api/experiences/:id(.:format)                                                           api/experiences#destroy {:format=>:json}
#            api_educations GET    /api/educations(.:format)                                                                api/educations#index {:format=>:json}
#                           POST   /api/educations(.:format)                                                                api/educations#create {:format=>:json}
#             api_education DELETE /api/educations/:id(.:format)                                                            api/educations#destroy {:format=>:json}
#               api_session DELETE /api/session(.:format)                                                                   api/sessions#destroy {:format=>:json}
#                           POST   /api/session(.:format)                                                                   api/sessions#create {:format=>:json}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'
  get '/api/users/email', to: 'api/users#email'
  get '/api/comments/root_count', to: 'api/comments#root_comment_count'
  get '/api/comments/reply_count', to: 'api/comments#reply_comment_count'
  get '/api/likes/user_liked', to: 'api/likes#user_liked'
  get '/api/connections/connected', to: 'api/connections#connected'

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:create, :show, :update]
    resources :posts, except: [:edit, :new]
    resources :comments, only: [:index, :create, :update, :destroy]
    resources :likes, only: [:index, :create, :destroy]
    resources :experiences, only: [:index, :create, :update, :destroy]
    resources :educations, only: [:index, :create, :update, :destroy]
    resources :connections, only: [:index, :create, :update, :destroy]

    resource :session, only: [:create, :destroy]
  end
end
