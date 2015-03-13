Rails.application.routes.draw do
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]

  resources :subs, except: [:destroy]

  resources :posts, only: [:new, :create, :edit, :update, :show] do
    resources :comments, only: [:new]
  end

  resources :comments, only: [:create, :show]
end
