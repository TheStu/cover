class IndexController < ApplicationController

  def index
    render file: 'public/index.html'
  end

  def fetch_new_book # fetch a new book from Amazon, based on category (amazon browse node == category id -- see ChooseGenre.jsx)
  	results = Amazon::Ecs.browse_node_lookup(params[:category].to_i, {response_group: 'TopSellers'})
  	books = []
  	results.get_elements("TopItem").each do |r|
  		author = r.get('Author').split(', ').reverse.join(' ').gsub(/[^\w\s]/, '') # browse_node_lookup returns author name in 'last name, first name' format
  		books << { asin: r.get('ASIN'), author: author }
  	end
  	render json: books.reverse.to_json # reversed so that the handleBookData function grabs the most related book from the end of the array
  end

  def fetch_related_book # take a given book (asin), and fetch similar books from the Amazon API
  	results = Amazon::Ecs.similarity_lookup(params[:asin], {response_group: 'ItemAttributes'})
  	books = []
  	results.items.each do |r|
  		books << { asin: r.get('ASIN'), author: r.get('ItemAttributes/Author').gsub(/[^\w\s]/, '') } unless r.get('ItemAttributes/Author').gsub(/[^\w\s]/, '') == params[:author]
  	end
  	render json: books.reverse.to_json # reversed so that the handleBookData function grabs the most related book from the end of the array
  end
end
