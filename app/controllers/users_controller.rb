class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]

  load_and_authorize_resource
  respond_to :html

  def index
    @users = User.all
    respond_with(@users)
  end

  def show
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
    sign_in :user, @user, bypass: true if current_user == @user
    respond_with(@user)
  end

  def destroy
    @user.destroy
    respond_with(@user)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:uid, :name, :password, :password_confirmation, :role)
  end
end
