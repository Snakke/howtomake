User.delete_all
Category.delete_all
Manual.delete_all
User.create(
  uid: 'zaharenkovkirill@gmail.com',
  password: 'zxasqw12',
  confirmed_at: '2017-07-14 12:20:31.102703'.
  role: 'admin')
Category.create(
  id: 1,
  name: "OS")
User.first.manuals.create(
  name: "Windows 10",
  category_id: 1)