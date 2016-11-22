class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :group
      t.integer :amazon_node_id, limit: 8

      t.timestamps
    end
  end
end
