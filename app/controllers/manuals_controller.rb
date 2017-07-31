class ManualsController < ApplicationController
  before_action :set_manual, only: %i[show edit update destroy]

  respond_to :html

  def index
    if params[:tag]
      @manuals = Manual.tagged_with(params[:tag])
    else
      @manuals = Manual.all
    end
    respond_with(@manuals)
  end

  def show
    @manual = Manual.includes(pages: [:blocks, :comments]).find(params[:id])
    respond_with(@manual)
  end

  def new
    @manual = Manual.new
    @categories = Category.order(:title)
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

  def set_manual
    @manual = Manual.find(params[:id])
  end

  def manual_params
    params.require(:manual).permit(:title, :category_id, :user_id, :tag_list)
  end
end
