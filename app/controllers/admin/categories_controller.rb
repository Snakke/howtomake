class Admin::CategoriesController < ApplicationController
  before_action :set_category, only: %i[show edit update destroy]

  load_and_authorize_resource

  respond_to :html

  def index
    @categories = Category.all
    respond_with(@categories)
  end

  def show
    respond_with(@category)
  end

  def new
    @category = Category.new
    respond_with(@category)
  end

  def edit
  end

  def create
    @category = Category.new(category_params)
    @category.save
    respond_with(@category, location: admin_categories_path)
  end

  def update
    @category.update(category_params)
    respond_with(@category, location: admin_categories_path)
  end

  def destroy
    @category.destroy
    respond_with(@category, location: admin_categories_path)
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:title)
  end
end
