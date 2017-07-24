module ManualsHelper
  def manual_json(manual)
    { manual_id: manual.id, pages: manual.pages, current_page: 0 }.to_json(include: :blocks)
  end
end
