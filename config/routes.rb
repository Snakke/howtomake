Rails.application.routes.draw do
  resources :manuals
  resources :pages
  root 'home#index'
  get 'tags/:tag', to: 'manuals#index', as: :tag
  post 'set_new_locale', to: 'users#set_new_locale', as: :user_locale

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users do
    resources :manuals
  end
  resources :categories
end
