const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(3);
const User = require('./../../users/model');

const adminSeeder = async () => {
  console.log('seeder started');
  try {
    const user = JSON.parse(process.env.ADMIN_SEED);
    user.password = bcrypt.hashSync(user.password, salt);
    let newUser = await User.create(user);
    if(newUser) {
      console.log('successfully seeded admin user')
    }
  } catch (e) {
    console.log('Seed Error:', 'Already seeded');
  }
};

module.exports = adminSeeder.bind(this);
