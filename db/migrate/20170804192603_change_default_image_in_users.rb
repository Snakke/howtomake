class ChangeDefaultImageInUsers < ActiveRecord::Migration[5.1]
  def change
    change_column_default :users, :image, "default/default-image.jpg"
  end
end
