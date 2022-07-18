const User = require('../models/user')

exports.createUser = async (req, res) => {
  const {fullname, email, password} = req.body;
  const isNewUser = await User.isThisEmailInUse(email);
  if (!isNewUser)
    return res.json({
      success: false,
      message: "Burtgeltei mail hayg baina",
    });

  const user = await User({
    fullname,
    email,
    password,
  });
  await user.save();
  res.json(user);
};

exports.userSignIn = async (req, res) => {
 
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "Hereglegch oldsongui!",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch)
    return res.json({
      success: false,
      message: "mail esvel nuuts ug buruu baina!",
    });
    
    res.json({success: true, user: user})
}