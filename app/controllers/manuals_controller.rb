class ManualsController < ApplicationController
  before_action :set_manual, only: %i[edit update destroy]

  helper_method :sort_column, :sort_direction

  respond_to :html, :js

  def index
    @manuals = Manual.includes(:user, :category)
    if params[:user_id]
      @user = User.find(params[:user_id])
      @manuals = @manuals.where(user_id: params[:user_id])
    end 
    @manuals = @manuals.tagged_with(params[:tag]) if params[:tag]
    @manuals = @manuals.order(sort_column + " " + sort_direction)
    respond_with(@manuals)
  end

  def show
    @manual = Manual.includes(:category, :user, pages: [:blocks, comments: :user ]).find(params[:id])
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

  private

  def sort_column
    Manual.column_names.include?(params[:sort]) ? params[:sort] : "title"
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : "asc"
  end

  def set_manual
    @manual = Manual.find(params[:id])
  end

  def manual_params
    params.require(:manual).permit(:title, :category_id, :user_id, :tag_list)
  end
end
