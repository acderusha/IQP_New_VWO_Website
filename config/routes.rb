Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "home#index"

  resources :home do
    get :index, :on => :collection

    get :maps, :on => :collection
    get :map, :on => :collection

    get :arrival, :on => :collection

    get :explore, :on => :collection

    get :attractions, :on => :collection

    get :organizations, :on => :collection
    get :gondolas4all, :on => :collection
    get :cittapertutti, :on => :collection
    get :villageforall, :on => :collection
    get :sanitrans, :on => :collection

    get :applications, :on => :collection
    get :blindSquare, :on => :collection

  end
end
