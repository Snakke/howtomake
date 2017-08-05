class ChangeColumnInManuals < ActiveRecord::Migration[5.1]
  def change
    change_column :manuals, :user_id, 'integer USING CAST(user_id AS integer)'
    change_column :manuals, :category_id, 'integer USING CAST(category_id AS integer)'
  end
end
