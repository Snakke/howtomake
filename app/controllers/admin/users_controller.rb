class Admin::UsersController < ApplicationController
  before_action :verify_admin
  before_action :set_user, only: %i[show edit update destroy]
  skip_before_action :authenticate_user!, only: %i[show index]
  helper_method :sort_column, :sort_direction

  respond_to :html, :js, :json

  def index
    @users = User.order(:id)
    respond_with(@users)
  end

  def show
    @user = User.includes(manuals: %i[category user]).find(params[:id])
    respond_with(@user)
  end

  def new
    @user = User.new
    respond_with(@user)
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    @user.save
    respond_with(@user)
  end

  def update
    @user.update(user_params)
    sign_in :user, @user, bypass_sign_in: true if current_user == @user
    respond_with(@user)
  end

  def lock_user
    User.where(id: params[:id]).first.lock_access!
    redirect_back fallback_location: root_path
  end

  def unlock_user
    User.where(id: params[:id]).first.unlock_access!
    redirect_back fallback_location: root_path
  end

  def destroy
    @user.destroy
    respond_with(@user)
  end

  private

  def sort_column
    Manual.column_names.include?(params[:sort]) ? params[:sort] : 'title'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:uid, :name, :password, :password_confirmation, :role, :image, :locale)
  end

  def verify_admin
    redirect_to root_url unless current_user.admin?
  end
end
