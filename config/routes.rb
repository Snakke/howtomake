Rails.application.routes.draw do
  root 'home#index'

  resources :manuals do
    post 'rate', on: :member
  end

  resources :pages

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users, only: %i[index show update] do
    resources :manuals
  end

  namespace :admin do
    resources :users
    resources :categories
  end

  get 'tags/:tag', to: 'manuals#index', as: :tag
  post 'set_locale', to: 'preferences#set_locale', as: :user_set_locale
end
