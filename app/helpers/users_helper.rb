module UsersHelper
  def can_edit(user)
    can? :update, user
  end

  def editable(user)
    icon = content_tag(:i, "", {class: ["fa", "fa-pencil"], "aria-hidden": "true"})
    content_tag :button, icon, {class: ["btn", "btn-outline-primary", "btn-sm"], id: "bio-edit"} if can_edit(user)
  end
end
