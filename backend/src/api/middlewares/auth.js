import UserService from '../../services/user.js';

export const authenticateWithToken = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {

    // anything that starts 'Token' or 'Bearer' and then the token itself
    const m = authHeader.match(/^(Token|Bearer) (.+)/i);
    if (m) {

      // finds user with matching token, then returns it
      UserService.authenticateWithToken(m[2])
        .then((user) => {

          // sets user to the request
          req.user = user;
          next();
        })
        .catch((err) => {
          next(err);
        });
      return;
    }
  }

  next();
};

// 401 if no user is found from the request
// (set from authenticateWithToken above)
export const requireUser = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: 'You don\'t have access to this resource' });
    return;
  }

  next();
};
