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
  belongs_to :user
  belongs_to :page

  def date_format
    created_at.to_s(:db)
  end

  def serializable_hash(options = nil)
    options[:methods] = :date_format
    super(options)
  end
end
