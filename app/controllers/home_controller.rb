class HomeController < ApplicationController
  def index
    @new_manuals = Manual.order(created_at: :desc).limit(5)
    @tags = Manual.tag_counts_on(:tags)
  end
end
