Rails.application.routes.draw do

	root 'index#index'
	get '/fetch_new_book/:category', to: 'index#fetch_new_book', as: 'fetch_new_book'
	get '/fetch_related_book/:asin', to: 'index#fetch_related_book', as: 'fetch_related_book'
  match '*all', to: 'application#preflight', via: [:options]
  # resources :blabs, only: [:index]

end
