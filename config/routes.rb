Rails.application.routes.draw do
  root to: 'root#root'

  namespace 'api' do
    resources :posts, default: { format: :json }
  end

end
