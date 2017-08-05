module ApplicationHelper
  def table_column(klass, column, title: nil, sortable: true)
    title ||= klass.human_attribute_name(column)
    return title unless sortable
    css_class = column == sort_column ? "current-#{sort_direction}" : nil
    direction = column == sort_column && sort_direction == 'asc' ? 'desc' : 'asc'
    if @user.blank?
      link_to title, manuals_path(sort: column, direction: direction), { class: "dropdown-item", remote: true }
    else
      link_to title, user_manuals_path(@user, sort: column, direction: direction), { class: "dropdown-item", remote: true }
    end
  end

  def can_edit(object)
    can? :update, object
  end

  def editable(user, activator)
    icon = content_tag(:i, "", {class: ["fa", "fa-pencil"], "aria-hidden": "true"})
    content_tag :button, icon, {class: ["btn", "btn-outline-primary", "btn-sm", "edit-button"], id: activator} if can_edit(user)
  end
end
