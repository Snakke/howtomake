# == Schema Information
#
# Table name: pages
#
#  id         :integer          not null, primary key
#  title      :string
#  manual_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer
#

require 'rails_helper'

RSpec.describe Page, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
