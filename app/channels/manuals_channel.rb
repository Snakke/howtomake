class ManualsChannel < ApplicationCable::Channel
  MANUAL_CHANNEL = 'Manuals_%s_channel'.freeze

  def subscribed
    stream_from self.class.channel_for_manual(params[:manual_id])
  end

  def unsubscribed
  end

  def add_page(data)
    current_user.manuals.where(id: params[:manual_id]).first.pages.create(title: data['title'], manual_id: data['manual_id'])
  end

  def delete_page(data)
    current_user.manuals.where(id: params[:manual_id]).first.pages.find(data['id']).destroy
  end

  def self.channel_for_manual(manual_id)
    format(MANUAL_CHANNEL, manual_id)
  end
end
