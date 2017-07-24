class ManualUpdateBroadcastJob < ApplicationJob
  queue_as :default

  def perform(manual_id, data)
    ActionCable.server.broadcast ManualsChannel.channel_for_manual(manual_id), data
  end
end
