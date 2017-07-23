module ManualsHelper
  def manual_json(manual)
    { manual_id: manual.id, pages: manual.pages.to_a, current_page: 0 }.to_json
  end
end
