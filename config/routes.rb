Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"

  resources :home do
    get :index, :on => :collection
    get :home, :on => :collection

  end
end
