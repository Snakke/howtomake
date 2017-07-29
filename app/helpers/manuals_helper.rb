module ManualsHelper
  def manual_data(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0 }
  end
end
