# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all
User.create(
  uid: 'panyapacan@gmail.com',
  password: '123123',
  confirmed_at: '2017-07-14 12:20:31.102703'
)

User.create(
  uid: 'zaharenkovkirill@gmail.com',
  password: 'zxasqw12',
  confirmed_at: '2017-07-14 12:20:31.102703'
)

Category.delete_all
Category.create(
  name: 'OS'
)

Category.create(
  name: 'Other'
)

Manual.delete_all
Manual.create(
  name: 'How to install windows 10',
  category_id: 1,
  user_id: 5
)

Manual.create(
  name: 'How to install windows 10. For newbiee',
  category_id: 1,
  user_id: 5
)

Manual.create(
  name: 'How to install windows 8. For newbiee',
  category_id: 1,
  user_id: 6
)

Manual.create(
  name: 'Beach or beach',
  category_id: 2,
  user_id: 6
)
