
git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.2'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'
gem 'annotate', '~> 2.7', '>= 2.7.2'
# Bootstrap
gem 'bootstrap', '~> 4.0.0.alpha6'
gem 'jquery-rails', '~> 4.3', '>= 4.3.1'
gem 'tether-rails', '~> 1.4'
# Devise
gem 'devise', '~> 4.3'
gem 'omniauth', '~> 1.6', '>= 1.6.1'
gem 'omniauth-twitter', '~> 1.4'
gem 'omniauth-facebook', '~> 4.0'
gem 'omniauth-vkontakte', '~> 1.4'

gem 'dotenv-rails'
gem 'responders', '~> 2.4'
gem 'cancancan', '~> 2.0'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'better_errors', '~> 2.1', '>= 2.1.1'
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'pry-rails', '~> 0.3.6'
  gem 'rspec-rails', '~> 3.5'
  gem 'rubocop', '~> 0.49.1', require: false
  gem 'selenium-webdriver'
  # Pronto
  gem 'pronto', '~> 0.9.3'
  gem 'pronto-flay', '~> 0.9.0', require: false
  gem 'pronto-rubocop', '~> 0.9.0', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
