# == Schema Information
#
# Table name: steps
#
#  id         :integer          not null, primary key
#  name       :integer
#  manual_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Step < ApplicationRecord
  validates :manual_id, :name, presence: true
  belongs_to :manual
end
