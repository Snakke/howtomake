module UsersHelper
  def lock_unlock_user(user)
    unlock = content_tag(:i, '', class: ['fa', 'fa-unlock'], :"aria-hidden" => 'true')
    if user.unlock_token.present?
      return link_to unlock, unlock_user_admin_user_path(user), class: 'btn btn-sm btn-secondary',
                                                                method: :post,
                                                                remote: true
    end
    lock = content_tag(:i, '', class: ['fa', 'fa-lock'], :"aria-hidden" => 'true')
    link_to lock, lock_user_admin_user_path(user), class: 'btn btn-sm btn-secondary', method: :post, remote: true
  end
end
