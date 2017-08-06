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
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
  
  validates :title, presence: true, length: { within: 6..40 }
  validates :category_id, presence: true
  acts_as_taggable_on :tags

  has_many :pages, -> { order(position: :asc) }
  has_many :manual_views
  has_many :ratings
  belongs_to :category
  belongs_to :user

  def self.get_ratings
    data_to_s = pluck(:id).map(&:inspect).join(', ').delete('"')
    sql = "select manual_id, avg(value) from ratings where manual_id in (#{data_to_s}) group by manual_id"
    result = Hash[ActiveRecord::Base.connection.select_rows(sql)]
  end

  # TODO: Optimaze this shit
  def as_indexed_json(options={})
    self.as_json(
      include: { pages: { include: { blocks: { only: :data } } },
                   user: { only: :name },
                   category:   { only: :title }
                 })
  end
end
