class PreferencesController < ApplicationController
  skip_before_action :authenticate_user!

  def set_locale
    current_user.update(locale: params[:locale]) if current_user
    cookies[:locale] = params[:locale]
    logger.debug "* COOKIES: #{cookies[:locale]}"
    redirect_back fallback_location: root_path
  end

  def set_theme
  end
end
