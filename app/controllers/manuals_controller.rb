class ManualsController < ApplicationController
  before_action :set_manual, only: %i[show edit update destroy]

  respond_to :html

  def index
    @manuals = Manual.all
    respond_with(@manuals)
  end

  def show
    respond_with(@manual)
  end

  def new
    @manual = Manual.new
    respond_with(@manual)
  end

  def edit
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
    params.require(:manual).permit(:name, :category_id, :user_id)
  end
end
