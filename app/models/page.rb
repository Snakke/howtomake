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
  has_many :blocks
  belongs_to :manual
  acts_as_list scope: :manual

  def as_json(options = {})
    options[:include] = :blocks
    super(options)
  end
end
