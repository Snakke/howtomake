class PagesController < ApplicationController
  before_action :set_page, only: %i[show edit update destroy]

  respond_to :json

  def index
    @pages = Page.where(manual_id: params[:manual_id]).all
    respond_with(@pages)
  end

  def show
    respond_with(@page)
  end

  def new
    @page = Page.new
    respond_with(@page)
  end

  def edit
  end

  def create
    @page = Page.create(page_params)
    respond_with(@page)
  end

  def update
    @page.update(page_params)
    respond_with(@page)
  end

  def destroy
    @page.destroy
    respond_with(@page)
  end

  private

  def set_page
    @page = Page.find(params[:id])
  end

  def page_params
    params.require(:page).permit(:title, :manual_id)
  end
end
