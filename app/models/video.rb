# == Schema Information
#
# Table name: blocks
#
#  id         :integer          not null, primary key
#  page_id    :integer
#  data       :text
#  type       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Video < Block
end
