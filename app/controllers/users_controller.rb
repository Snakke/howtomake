class UsersController < ApplicationController
  skip_before_action :authenticate_user!, only: %i[show index]

  load_and_authorize_resource

  respond_to :html, :json

  helper_method :sort_column, :sort_direction

  def index
    @users = User.all
    respond_with(@users)
  end

  def show
    @user = User.includes(manuals: %i[category user]).find(params[:id])
    respond_with(@user)
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    sign_in :user, @user, bypass_sign_in: true if current_user == @user
  end

  private

  def sort_column
    Manual.column_names.include?(params[:sort]) ? params[:sort] : 'title'
  end

  def sort_direction
    %w[asc desc].include?(params[:direction]) ? params[:direction] : 'asc'
  end

  def user_params
    params.require(:user).permit(:name, :image)
  end
end
