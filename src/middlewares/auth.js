const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const AppError = require('../shared/errors/AppError')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token não informado.', 401);
  }

  const [scheme, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    throw new AppError('Token inválido.', 401);
  }
};
