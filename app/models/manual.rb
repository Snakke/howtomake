# == Schema Information
#
# Table name: manuals
#
#  id          :integer          not null, primary key
#  title       :string
#  category_id :integer
#  user_id     :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Manual < ApplicationRecord
  validates :title, presence: true, length: { within: 6..40 }
  validates :category_id, presence: true
  acts_as_taggable_on :tags

  has_many :pages, -> { order(position: :asc) }
  belongs_to :category
  belongs_to :user
end
