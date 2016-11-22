class Category < ApplicationRecord

	validates_presence_of :name, :group, :amazon_node_id
end
