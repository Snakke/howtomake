module ManualsHelper
  def manual_json(manual)
    { manual_id: manual.id, pages: manual.pages.to_a}.to_json
  end

end
