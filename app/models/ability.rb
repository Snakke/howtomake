class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    can :read, [Manual, User]
    can :manage, :all if user.admin?
    if user.author?
      can %i[update destroy], Manual, user_id: user.id
      can :update, User, id: user.id 
    end
  end
end
