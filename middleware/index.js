const jwt = require('jsonwebtoken');
const JWT_SECRET ="ututuyfgrrujiuhoih";
const userSchema = require("../models/users");

const authCheck = async(req, res, next) => {
    try {
        const token = req.cookies.edsa_token;
        if (!token) {
            return res.render("index", {error: "token not found",  isLoggedIn: false});
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userSchema.findOne({ _id: decoded._id }, "name email");
        if (!user) {
            return res.render("index", {error: "user not found",  isLoggedIn: false});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.render("index", {error: error.message, isLoggedIn: false}  );
    }
};

module.exports = authCheck;