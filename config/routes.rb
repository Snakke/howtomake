Rails.application.routes.draw do
  resources :manuals
  resources :pages
  root 'home#index'
  get 'tags/:tag', to: 'manuals#index', as: :tag

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :users do
    resources :manuals
    post 'set_new_locale', on: :member
  end
  resources :categories
end
