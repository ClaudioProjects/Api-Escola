import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    try {
      const { email = '', password = '' } = req.body;

      if (!email || !password) {
        return res.status(401).json({
          errors: ['Credenciais invalidas'],
        });
      }

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(401).json({
          errors: ['Credencias invalidas'],
        });
      }

      if (!(await user.passwordValid(password))) {
        return res.status(401).json({
          errors: ['Credencias invalidas'],
        });
      }

      const { id } = user;
      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.TOKEN_EXPIRATION },
      );

      return res.json({ token });
    } catch (e) {
      return res.status(401).json({
        errors: ['Credencias invalidas'],
      });
    }
  }
}

export default new TokenController();
