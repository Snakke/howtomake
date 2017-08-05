# == Schema Information
#
# Table name: comments
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  page_id    :integer
#  comment    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Comment < ApplicationRecord
  validates :comment, presence: true

  belongs_to :user
  belongs_to :page

  after_create_commit { ActionCable.server.broadcast ManualsChannel.channel_for_manual(page.manual_id), create_comment_data }

  def create_comment_data
    { type: 'ADD_COMMENT', comment: as_json }
  end

  def date_format
    created_at.to_s(:db)
  end

  def serializable_hash(options = nil)
    options ||= {}
    options[:methods] = :date_format
    super(options)
  end

  def as_json(options = {})
    options[:include] = { user: { only: %i[name image] } }
    super(options)
  end
end
