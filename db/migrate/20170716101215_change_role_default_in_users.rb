class ChangeRoleDefaultInUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_default :users, :role, 'author'
  end
end
