class ManualsController < ApplicationController
  before_action :set_manual, only: %i[edit update destroy]
  skip_before_action :authenticate_user!, only: %i[show index]

  helper_method :sort_column, :sort_direction

  # load_and_authorize_resource

  respond_to :html, :js, :json

  def index
    @manuals = Manual.includes(:user, :category, :ratings).order(:title).page params[:page]
    if params[:user_id]
      @user = User.find(params[:user_id])
      @manuals = @manuals.where(user_id: params[:user_id])
    end
    @manuals = @manuals.tagged_with(params[:tag]) if params[:tag]
    @ratings = @manuals.ratings
    @manuals = @manuals.order(sort_column + ' ' + sort_direction)
    respond_with(@manuals)
  end

  def show
    ManualView.add(current_user.id, params[:id]) if current_user
    @manual = Manual.includes(:user, :category, :ratings, pages: [:blocks, comments: :user]).find(params[:id])
    @tags = Tag.pluck(:name)
    @rating = @manual.ratings.average(:value).to_f
    respond_with(@manual)
  end

  def new
    @manual = Manual.new
    @categories = Category.order(:title)
    @tags = Tag.pluck(:name)
    respond_with(@manual)
  end

  def edit
    @categories = Category.order(:title)
    @tags = Tag.pluck(:name)
  end

  def create
    @manual = current_user.manuals.create(manual_params)
    @manual.save
    respond_with(@manual)
  end

  def update
    @manual.update(manual_params)
    respond_with(@manual)
  end

  def destroy
    @manual.destroy
    respond_with(@manual)
  end

  def rate
    Rating.rate(params[:id], current_user.id, params[:value])
    head :ok
  end

  def search
    if params[:term].blank?
      @manuals = []
    else
      @manuals = Manual.search(params[:term]).records
      @ratings = @manuals.ratings
    end
    @manuals = @manuals.order(:title).page params[:page]
    render action: :index
  end

  def typeahead
    render json: Manual.search(query: { match_phrase_prefix: { title: params[:term] } }).map(&:title)
  end

  private

  def sort_column
    Manual.column_names.include?(params[:sort]) ? params[:sort] : 'title'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def set_manual
    @manual = Manual.find(params[:id])
  end

  def manual_params
    params.require(:manual).permit(:title, :category_id, :user_id, :tag_list)
  end
end
