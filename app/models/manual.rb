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

  validates :title, presence: true, length: { within: 6..100 }

  acts_as_taggable_on :tags

  paginates_per 6

  has_many :pages, -> { order(position: :asc) }
  has_many :manual_views
  has_many :ratings
  belongs_to :category
  belongs_to :user

  def self.ratings
    return {} if pluck(:id).blank?
    data_to_s = pluck(:id).map(&:inspect).join(', ').delete('"')
    sql = "select manual_id, avg(value) from ratings where manual_id in (#{data_to_s}) group by manual_id"
    Hash[ActiveRecord::Base.connection.select_rows(sql)]
  end

  # TODO: Optimaze this shit
  def as_indexed_json(_options = {})
    as_json(
      include: { pages: { include: { blocks: { only: :data } } },
                 user: { only: :name },
                 category:   { only: :title } }
    )
  end
end
