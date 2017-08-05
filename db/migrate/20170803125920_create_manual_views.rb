class CreateManualViews < ActiveRecord::Migration[5.1]
  def change
    create_table :manual_views do |t|
      t.integer :user_id
      t.integer :manual_id

      t.timestamps
    end
    add_index :manual_views, %i[user_id manual_id], unique: true
  end
end
