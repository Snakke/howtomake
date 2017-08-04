Rails.application.routes.draw do
  root 'home#index'

  resources :manuals do
    post 'rate', on: :member
  end

  resources :categories
  resources :pages

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users do
    resources :manuals
  end

  get 'tags/:tag', to: 'manuals#index', as: :tag
  post 'set_locale', to: 'preferences#set_locale', as: :user_set_locale
end
