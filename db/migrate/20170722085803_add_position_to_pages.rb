class AddPositionToPages < ActiveRecord::Migration[5.1]
  def change
    add_column :pages, :position, :integer
  end
end
