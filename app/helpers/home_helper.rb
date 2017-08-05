module HomeHelper
  include ActsAsTaggableOn::TagsHelper
  def manual_rating(rating)
    return rating if rating > 0
    t('view.not_rated')
  end
end
