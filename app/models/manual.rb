# == Schema Information
#
# Table name: manuals
#
#  id          :integer          not null, primary key
#  name        :string
#  category_id :string
#  user_id     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Manual < ApplicationRecord
  validates :name, :category_id, presence: true
  belongs_to :category
  belongs_to :user
end
