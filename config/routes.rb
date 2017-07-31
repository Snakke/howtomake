Rails.application.routes.draw do
  resources :manuals
  resources :pages
  root 'home#index'
  get 'tags/:tag', to: 'manuals#index', as: :tag

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  scope '/admin' do
    resources :users
    resources :categories
  end
end
