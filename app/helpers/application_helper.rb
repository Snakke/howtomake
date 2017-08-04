module ApplicationHelper
  def table_column(klass, column, title: nil, sortable: true)
    title ||= klass.human_attribute_name(column)
    return title unless sortable
    css_class = column == sort_column ? "current-#{sort_direction}" : nil
    direction = column == sort_column && sort_direction == 'asc' ? 'desc' : 'asc'
    if @user.blank?
      link_to title, manuals_path(sort: column, direction: direction), remote: true
    else
      link_to title, user_manuals_path(@user, sort: column, direction: direction), {class: css_class, remote: true}
    end
  end
end
