class IndexController < ApplicationController

  def index
  	render json: @book
  end

  def fetch_new_book # fetch a new book from Amazon
  	render json: { asin: 'B00GEEB9YC', author: 'Sam Harris', category: 'Religion' }
  end

  def fetch_related_book
  	render json: { asin: 'B00GEEB9YC', author: 'Sam Harris', category: 'Religion' }
  end
end
