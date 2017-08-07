module ManualsHelper
  include ActsAsTaggableOn::TagsHelper

  def manual_data(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0, edit_mode: false, can_edit: can?(:update, manual) }
  end

  def categories_list
    Category.order(:title)
  end

  def tags_list
    Tag.pluck(:name).map(&:inspect).join(', ').delete('"')
  end
end
