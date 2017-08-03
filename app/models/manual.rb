# == Schema Information
#
# Table name: manuals
#
#  id                 :integer          not null, primary key
#  title              :string
#  category_id        :integer
#  user_id            :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  manual_views_count :integer
#

class Manual < ApplicationRecord
  validates :title, presence: true, length: { within: 6..40 }
  validates :category_id, presence: true
  acts_as_taggable_on :tags

  has_many :pages, -> { order(position: :asc) }
  has_many :manual_views
  belongs_to :category
  belongs_to :user
end
