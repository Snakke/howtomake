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

  EMAIL = 'email'.freeze

  def self.find_for_authentication(tainted_conditions)
    super(tainted_conditions.merge(provider: EMAIL))
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.name = auth.info.name
      user.password = Devise.friendly_token[0, 20]
      user.skip_confirmation!
    end
  end

  def provider_email?
    provider == EMAIL
  end

  def send_confirmation_notification?
    confirmation_required? && !@skip_confirmation_notification && provider_email? && uid.present?
  end

  def email
    uid if provider_email?
  end

  def email=(value)
    return value if provider_email?
    raise ArgumentError, "Email can't be used for #{provider}."
  end

  def postpone_email_change?
    postpone = self.class.reconfirmable &&
               will_save_change_to_uid? &&
               !@bypass_confirmation_postpone &&
               uid.present? &&
               (!@skip_reconfirmation_in_callback || !uid_in_database.nil?)
    @bypass_confirmation_postpone = false
    postpone
  end

  def to_s
    name || email
  end
end
