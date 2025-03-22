const bcrypt = require('bcryptjs');

// Password you want to hash
const password = 'testpassword';

// Hash the password
bcrypt.hash(password, 10, (err, hashedPassword) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Hashed password:', hashedPassword);  // Log the hashed password
  }
});
