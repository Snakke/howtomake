module ApplicationHelper
  def sortable(column, title = nil)
    title ||= column.titleize
    css_class = column == sort_column ? "current #{sort_direction}" : nil
    direction = column == sort_column && sort_direction == "asc" ? "desc" : "asc"
    if @user.blank?
      link_to title, manuals_path(sort: column, direction: direction ), remote: true
    else
      link_to title, user_manuals_path(@user, sort: column, direction: direction), remote: true
    end
  end
end
