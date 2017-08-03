module UsersHelper
  def can_edit(user)
    can? :update, user
  end
end
