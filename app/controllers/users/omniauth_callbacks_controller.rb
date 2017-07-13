class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  SOCIAL = %w[facebook twitter vkontakte].freeze

  SOCIAL.each do |social|
    define_method(social.to_s) do
      @user = User.from_omniauth(request.env['omniauth.auth'])
      if @user.persisted?
        sign_in_and_redirect @user, event: :authentication
        set_flash_message(:notice, :success, kind: social.capitalize) if is_navigational_format?
      else
        session["devise.#{social}_data"] = request.env['omniauth.auth'].except('extra')
        redirect_to new_user_registration_url
      end
    end
  end
end
