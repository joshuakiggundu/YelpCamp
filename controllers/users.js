const User = require('../models/user');


module.exports.registeruser = async (req, res, next) => {
    try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerdUser = await User.register(user, password);
    req.login(registerdUser, err => {
        if(err) return next(err);
        req.flash('success', 'Welcome to YelpCamp');
        res.redirect('/campgrounds');
    })
} catch (e) {
        req.flash('error', 'your email or password is incorrect');
        res.redirect('register');
    }
   
}

module.exports.userlogin = (req,res) => {
    req.flash('success', 'welcome back!!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
    
}
module.exports.userlogout = (req, res) => {
    req.logout( function (err) {
        if(err) {
            return next (err);
        }
    req.flash('success', 'Goodbye!!');
    res.redirect('/campgrounds');
    });
}

module.exports.registerform = (req, res) => {
    res.render('users/register')
}