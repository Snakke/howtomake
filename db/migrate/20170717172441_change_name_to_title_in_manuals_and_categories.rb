class ChangeNameToTitleInManualsAndCategories < ActiveRecord::Migration[5.1]
  def change
    rename_column :manuals, :name, :title
    rename_column :categories, :name, :title
  end
end
