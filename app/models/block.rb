# == Schema Information
#
# Table name: blocks
#
#  id         :integer          not null, primary key
#  page_id    :integer
#  data       :text
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Block < ApplicationRecord
  belongs_to :page
  serialize :data, JSON

  after_create_commit { ActionCable.server.broadcast ManualsChannel.channel_for_manual(page.manual_id), create_block_data }

  def create_block_data
    { type: 'ADD_BLOCK', block: as_json }
  end

  def serializable_hash(options = nil)
    super.merge 'type' => type
  end
end
