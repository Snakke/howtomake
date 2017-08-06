class HomeController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    @manuals = Manual.includes(:user, :category).all
    @ratings = @manuals.get_ratings
    @new_manuals = @manuals.order(created_at: :desc).limit(6)
    @popular_manuals = @manuals.order(manual_views_count: :desc).limit(6)
    @tags = @manuals.tag_counts_on(:tags)
  end
end
