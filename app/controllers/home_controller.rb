class HomeController < ApplicationController
  helper_method :sort_column, :sort_direction

  def index
    @new_manuals = Manual.order(created_at: :desc).limit(5)
  end

  def tag_cloud
    @tags = Manual.tag_counts_on(:tags)
  end

  private

  def sort_column
    Manual.column_names.include?(params[:sort]) ? params[:sort] : 'title'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end
end
