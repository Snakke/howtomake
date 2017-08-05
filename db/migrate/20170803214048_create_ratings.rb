class CreateRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :ratings do |t|
      t.integer :user_id
      t.integer :manual_id
      t.integer :value

      t.timestamps
    end
    add_index :ratings, %i[user_id manual_id], unique: true
  end
end
