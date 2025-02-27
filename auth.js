const passport = require("passport");
const xsenv = require("@sap/xsenv");
const JWTStrategy = require("@sap/xssec").JWTStrategy;
const xsuaaService = xsenv.getServices({ xsuaa: { tag: "xsuaa" } }).xsuaa;

passport.use(new JWTStrategy(xsuaaService));

function authenticateJWT(req, res, next) {
  passport.authenticate("JWT", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(401).send("Non autorizzato");
    }
    req.user = user;
    next();
  })(req, res, next);
}

module.exports = {
  passport,
  authenticateJWT,
};
