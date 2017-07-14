class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy]

  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    flash[:notice] = 'Ticket was created successfully.' if @user.save
    respond_with(@user)
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    flash[:notice] = 'User was successfully updated.' if @user.update(user_params)
    sign_in :user, @user, bypass: true if current_user == @user
    respond_with(@user)
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    flash[:notice] = 'User was successfully destroyed.' if @user.destroy
    respond_with(@user)
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:uid, :name, :password, :password_confirmation)
  end
end
