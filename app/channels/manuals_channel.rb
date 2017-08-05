class ManualsChannel < ApplicationCable::Channel
  MANUAL_CHANNEL = 'Manuals_%s_channel'.freeze

  def subscribed
    stream_from self.class.channel_for_manual(params[:manual_id])
  end

  def unsubscribed
  end

  def add_page(data)
    Page.create(title: data['title'], manual_id: data['manual_id']) if can_update?
  end

  def delete_page(data)
    Page.where(id: data['id']).first.destroy if can_update?
  end

  def sort_pages(data)
    Page.where(id: data['id']).first.update(position: data['newPosition']) if can_update?
  end

  def update_pages_title(data)
    Page.where(id: data['id']).first.update(title: data['title']) if can_update?
  end

  def add_block(data)
    Block.create(page_id: data['page_id'], type: data['type'], data: data['data']) if can_update?
  end

  def update_block(data)
    Block.where(id: data['id']).first.update_attributes(data: data['data']) if can_update?
  end

  def delete_block(data)
    Block.where(id: data['id']).first.destroy if can_update?
  end

  def send_comment(data)
    Comment.create(user_id: current_user.id, page_id: data['page_id'], comment: data['comment'])
  end

  def self.channel_for_manual(manual_id)
    format(MANUAL_CHANNEL, manual_id)
  end

  private

  def current_manual
    Manual.where(id: params[:manual_id]).first
  end

  def can_update?
    ability.can? :update, current_manual
  end
end
