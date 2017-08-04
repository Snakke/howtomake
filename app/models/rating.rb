class Rating < ApplicationRecord
  belongs_to :manual

  def self.rate(manual_id, user_id, value)
    find_or_initialize_by(user_id: user_id, manual_id: manual_id).update_attributes!(value: value)
  end
end
