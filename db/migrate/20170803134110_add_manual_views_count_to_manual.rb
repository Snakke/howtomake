class AddManualViewsCountToManual < ActiveRecord::Migration[5.1]
  def change
    add_column :manuals, :manual_views_count, :integer
  end
end
