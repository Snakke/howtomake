Rails.application.routes.draw do
  root 'home#index'

  resources :manuals do
    post 'rate', on: :member
    get 'search', on: :collection
    get 'typeahead', on: :collection
  end

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users, only: %i[index show update] do
    resources :manuals
  end

  namespace :admin do
    resources :users do
      post 'lock_user', on: :member
      post 'unlock_user', on: :member
    end
    resources :categories
  end

  get 'tags/:tag', to: 'manuals#index', as: :tag
  post 'set_locale', to: 'preferences#set_locale', as: :user_set_locale
end
