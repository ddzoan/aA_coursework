
dan = User.create(username:'dan')
sam = User.create(username:'sam')

cj = Contact.create(name:'cj', email:'cj@appacademy.io', user_id: dan.id)
ned = Contact.create(name:'ned', email:'ned@appacademy.io', user_id: dan.id)
kush = Contact.create(name:'kush', email:'kush@appacademy.io', user_id: sam.id)

ContactShare.create(user_id: sam.id, contact_id: cj.id)
ContactShare.create(user_id: dan.id, contact_id: kush.id)
