class CreateBlocks < ActiveRecord::Migration[5.1]
  def change
    create_table :blocks do |t|
      t.integer :page_id
      t.text :data
      t.string :type

      t.timestamps
    end
  end
end
