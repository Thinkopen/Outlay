const config = require('config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

class GoogleAuth {
  constructor() {
    this.scopes = ['profile', 'email'];

    this.strategy = new GoogleStrategy({
      clientID: config.get('google.clientId'),
      clientSecret: config.get('google.clientSecret'),
      callbackURL: `${config.get('server.baseUrl')}${config.get('google.callbackUrl')}`,
    }, (accessToken, refreshToken, profile, callback) =>
      this.handleLogin(accessToken, refreshToken, profile, callback));
  }

  handleLogin(accessToken, refreshToken, profile, callback) {
    const authObj = this.createAuthObj(profile);

    callback(null, {
      accessToken,
      ...authObj,
    });
  }

  // eslint-disable-next-line class-methods-use-this
  createAuthObj(profile) {
    const emailObj = profile.emails.find(tmpEmailObj => tmpEmailObj.type === 'account');
    const email = emailObj ? emailObj.value : null;

    const photoObj = profile.photos.find(tmpPhotoObj => !!tmpPhotoObj);
    const photo = photoObj ? photoObj.value : null;

    return {
      name: profile.displayName,
      email,
      photo,
    };
  }
}

module.exports = new GoogleAuth();
