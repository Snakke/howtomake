module ApplicationCable
  class Channel < ActionCable::Channel::Base
    delegate :ability, to: :connection
    # dont allow the clients to call those methods
    protected :ability
  end
end
