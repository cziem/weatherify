const getUser = (id, callback) => {
  let user = {
    id, 
    name: 'Synthesis',
    role: 'Admin',
    isOwner: true
  }

  setTimeout(() => {
    callback(user)
  }, 3000);
}

getUser(31, (userObject) => {
  console.log(userObject)
})