import jwt from 'jsonwebtoken';

const JwtUtils = {
  createToken: (email: string, secret: string) => jwt.sign({ email }, secret, { expiresIn: '1d' }),
  parseToken: (token: string, secret: string) => {
    let claims;
    try {
      claims = jwt.verify(token, secret);
    } catch (e) {
      return null;
    }
    return claims;
  }
}

export default JwtUtils;
