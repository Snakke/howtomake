# == Schema Information
#
# Table name: manuals
#
#  id          :integer          not null, primary key
#  title       :string
#  category_id :string
#  user_id     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Manual < ApplicationRecord
  validates :title, :category_id, presence: true

  has_many :pages, -> { order(position: :asc) }
  belongs_to :category
  belongs_to :user
end
