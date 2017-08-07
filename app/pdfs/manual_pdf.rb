class ManualPdf < Prawn::Document
  PAGE_HEIGHT = 595.28
  PAGE_WIDTH = 841.89
  HTML_HEIGHT = 469
  HTML_WIDTH = 663
  OFFSET = 2

  def initialize(manual)
    super(page_layout: :landscape, margin: 0, page_size: 'A4')
    print_pages(manual.pages)
  end

  def print_pages(pages)
    pages.each_with_index do |page, index|
      start_new_page if index > 0 
      page_header(page)
      page.blocks.each do |block|
        try("#{block.type}_block".parameterize.underscore.to_sym, block)
      end
    end
  end

  def pdf_size(size)
    size * PAGE_HEIGHT / HTML_HEIGHT
  end

  def page_header(page)
    move_to 0, 0
    span(100, position: :center) do
      text page.title
    end
  end

  def text_block(block)
    bounding_box([pdf_size(block.data['x']), PAGE_HEIGHT - pdf_size(block.data['y'])],
                 width: pdf_size(block.data['width']),
                 height: pdf_size(block.data['height'])) do
      font('./public/arial.ttf') do
        text block.data['content']
      end
    end
  end

  def image_block(block)
    img = open block.data['content']
    image img, at: [pdf_size(block.data['x']), PAGE_HEIGHT - pdf_size(block.data['y'])],
               width: pdf_size(block.data['width']),
               height: pdf_size(block.data['height'])
  end

  def video_block(block)
    cover = open "https://img.youtube.com/vi/#{block.data['content']}/0.jpg"

    image cover, at: [pdf_size(block.data['x']), PAGE_HEIGHT - pdf_size(block.data['y'])],
                 width: pdf_size(block.data['width']),
                 height: pdf_size(block.data['height'])
    bounding_box([pdf_size(block.data['x']), PAGE_HEIGHT - pdf_size(block.data['y']) - pdf_size(block.data['height']) - OFFSET],
                 width: 50,
                 height: 15) do
      font('./public/arial.ttf') do
        text "<u><link href='https://www.youtube.com/watch?v=#{block.data['content']}'>YouTube</link></u>",
             inline_format: true
      end
    end
  end
end
