class Page < ApplicationRecord
  belongs_to :manual
  has_many :blocks
end
