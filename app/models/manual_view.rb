# == Schema Information
#
# Table name: manual_views
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  manual_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ManualView < ApplicationRecord
  belongs_to :manual, counter_cache: true

  def self.add(user_id, manual_id)
    where(user_id: user_id, manual_id: manual_id).first_or_create
  end
end
