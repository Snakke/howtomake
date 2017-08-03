# == Schema Information
#
# Table name: pages
#
#  id         :integer          not null, primary key
#  title      :string
#  manual_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer
#

class Page < ApplicationRecord
  has_many :blocks, dependent: :destroy
  has_many :comments, dependent: :destroy
  belongs_to :manual
  acts_as_list scope: :manual

  after_create_commit { ActionCable.server.broadcast ManualsChannel.channel_for_manual(manual_id), create_page_data }
  after_update_commit { ActionCable.server.broadcast ManualsChannel.channel_for_manual(manual_id), update_page_data }
  after_destroy_commit { ActionCable.server.broadcast ManualsChannel.channel_for_manual(manual_id), destroy_page_data }

  def create_page_data
    { type: 'ADD_PAGE', page: as_json }
  end

  def destroy_page_data
    { type: 'DELETE_PAGE', id: id }
  end

  def update_page_data
    { type: 'UPDATE_PAGES', newOrder: Page.where(manual_id: manual_id).order(:position).pluck(:id).as_json }
  end

  def as_json(options = {})
    options[:include] = :blocks, { comments: { include: { user: { only: %i[name image] } } } }
    super(options)
  end
end
