const User = require('../models/userModel');

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    res.json(user);
    console.log('USER UPDATED', user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
    }).save();
    console.log('USER CREATED', newUser);
    res.json(newUser);
  }
};
