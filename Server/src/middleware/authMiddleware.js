const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.ACCESS_TOKEN;

    // check jwt exist and is verified
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=> {
            if(err) {
                console.log(err.message);
                res.redirect('/auth/login')
            }else{
                console.log(decodedToken)
                next();
            }
        })
    }else {
        res.redirect('/auth/login')
    }
}

module.exports = { requireAuth }