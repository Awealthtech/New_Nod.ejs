const userSchema = require("../models/users");
const postSchema = require("../models/post");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// signUp section
const signup_get = async (req, res, Next) => {
  return res.render("signup", { error: "" });
};

const signup_user = async (req, res, Next) => {
  const { email, password, name, confirm_password } = req.body;
  try {
    if (password !== confirm_password)
      return res.render("signup", { error: "password does not match"});
    const user = await userSchema.findOne({ email });
    const salt = await bcrypt.genSalt();
    const hashed = bcrypt.hashSync(password, 10 , salt);
    // if (user) return res.render("signup", { error: "user already exist" });
    const newUser = new userSchema({
      email,
      password: hashed,
      name,
    });
    const data = await newUser.save();
    console.log(data);
    return res.redirect("/login");
  } catch (error) {
    console.log(error.code);
    return res.render("signup", { error: error.code == 11000 ? "Duplicated users" : error.message});
  }
};


// login section
const login = (req, res, Next) => {
  return res.render("login", { error: ""});
};


const login_get= async  (req, res, Next) => {
 const { email, password } = req.body;
  try {
    const user= await userSchema.findOne({ email });
    if (!user || !bcrypt.compare(password, user.password)) {
      return res.render("login", { error: 'enter valid username or password' });
    }
    const token = jwt.sign({ id: user._id }, 'secret');
    res.cookie('token', token);
    return res.redirect('/profile');
  } catch (error) {
    console.error(error.code);
    return res.redirect("login", { error: error.message });
  };
};

// homepage section
const index_get = async (req, res, next) => {
  return res.render('index');
};
const about_get = async (req, res, next) => {
  console.log()
  return res.render('about');
};

// logout section
const logout = async (req, res, next) => {
  return res.redirect('/');
};




// create section
const create_post =  async (req, res) => {
    res.render('create_post',  {error: ""});
  };

const get_post = async (req, res,Next) => {
  const {title, sub, body} = req.body;
  console.log(req.body);
  if (!title) { return res.render("create_post", {error: "Title is required"})};
  if (!sub) { return res.render("create_post", {error: "Sub is required"})};
  if (!body) { return res.render("create_post", {error: "Body is required"})};
  try {
    const data = new postSchema({
        title: req.body.title,
        sub: req.body.sub,
        body: req.body.body,
      });
      const newPost = await data.save();
      console.log(newPost);
    return res.redirect('/profile');
  } catch (error) {
    console.log(error);
    if (error) return res.render("create_post", {error: error.message});
  }
};

// profile section
const profile =  async (req, res) => {
  try {
    const user = await userSchema.find();
    const posts = await postSchema.find();
    res.render('profile', { user, posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = {
  signup_user,
  signup_get,
  login,
  login_get,
  profile,
  create_post,
  get_post,
  logout,
  index_get,
  about_get,
};
