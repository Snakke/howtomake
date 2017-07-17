# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  uid                    :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  name                   :string
#  provider               :string           default("email")
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string
#  last_sign_in_ip        :string
#  confirmation_token     :string
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string
#  failed_attempts        :integer          default(0), not null
#  unlock_token           :string
#  locked_at              :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  role                   :string           default("author")
#  locale                 :string           default("en")
#

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :timeoutable and :validatable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable,
         :confirmable, :omniauthable, omniauth_providers: %i[facebook twitter vkontakte]

  validates :email, format: { with: Devise.email_regexp }, if: :provider_email?
  validates :uid, presence: true, uniqueness: { case_sensitive: false }, unless: :provider_email?
  validates :password, presence: true, confirmation: true, length: { within: 6..40 }, on: :create
  validates :password, confirmation: true, length: { within: 6..40 }, allow_blank: true, on: :update

  has_many :manuals

  alias_attribute :email, :uid

  EMAIL = 'email'.freeze
  ROLES = %w[admin author].freeze

  ROLES.each do |role|
    # rubocop:disable Style/RedundantSelf
    define_method("#{role}?") do
      self.role == role
    end
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.name = auth.info.name
      user.password = Devise.friendly_token[0, 20]
      user.skip_confirmation!
    end
  end

  def self.find_for_authentication(tainted_conditions)
    super(tainted_conditions.merge(provider: EMAIL))
  end

  def send_confirmation_notification?
    confirmation_required? && !@skip_confirmation_notification && provider_email? && uid.present?
  end

  def to_s
    name.nil? || name == '' ? email : name
  end

  private

  def provider_email?
    provider == EMAIL
  end
end
