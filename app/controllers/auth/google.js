const config = require('config');
const passport = require('passport');

const googleAuth = require('../../libraries/googleAuth');
const AbstractController = require('..');

class AuthController extends AbstractController {
  initRouter() {
    passport.use(googleAuth.strategy);

    this.router.get('/', passport.authenticate('google', { scope: googleAuth.scopes }));
    this.router.get(config.get('google.callbackUrl').replace('/auth/google', ''), passport.authenticate('google', { failureRedirect: '/' }), (req, res) => AuthController.handleLogged(req, res));
  }

  static handleLogged(req, res) {
    res.json(req.user);
  }

  static checkAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      next('User must authenticate');

      return;
    }

    const accessToken = authorization.split('Bearer ')[1];

    googleAuth.strategy.userProfile(accessToken, (error, profile) => {
      if (error) {
        next(error);

        return;
      }

      req.user = googleAuth.createAuthObj(profile);

      req.user = {
        email: 'emanuele.seccia@thinkopen.it',
      };

      next();
    });
  }
};

module.exports = AuthController;