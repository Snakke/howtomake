class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.string :title
      t.integer :manual_id

      t.timestamps
    end
  end
end
