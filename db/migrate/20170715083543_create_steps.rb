class CreateSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :steps do |t|
      t.integer :name
      t.integer :manual_id

      t.timestamps
    end
  end
end
