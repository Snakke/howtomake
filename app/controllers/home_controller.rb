class HomeController < ApplicationController
  def index
    @manual = Manual.includes(:user, :category).all
    @new_manuals = @manual.order(created_at: :desc).limit(5)
    @popular_manuals = @manual.order(manual_views_count: :desc).limit(5)
    @tags = @manual.tag_counts_on(:tags)
  end
end
