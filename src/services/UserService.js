const { User } = require('../db/models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../shared/errors/AppError');

module.exports = {
  async generateHash(value) {
    return await bcrypt.hash(value, 8);
  },

  async compareHash(password, hash) {
    return await bcrypt.compare(password, hash);
  },

  generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: 3600,
    });
  },

  async create({ name, email, password }) {
    if (!name) {
      throw new AppError('Favor informar o campo nome.');
    }

    if (name && name.length > 60) {
      throw new AppError(
        'O campo nome deve ser deve ter no máximo 60 caracteres.'
      );
    }

    if (!email) {
      throw new AppError('Favor informar o campo e-mail.');
    }

    if (!password) {
      throw new AppError('Favor informar o campo senha.');
    }

    const hashPassword = await this.generateHash(password);
    await User.create({ name, email, password: hashPassword });
  },

  async authenticate({ email, password }) {
    const user = await User.findOne({ where: { email: email } });

    const usuarioNaoEncontrado = !user;
    if (usuarioNaoEncontrado) {
      throw new AppError('Usuário ou senha inválido.');
    }

    const senhaInvalida = !(await this.compareHash(
      password,
      user.password
    ));

    if (senhaInvalida) {
      throw new AppError('Usuário ou senha inválido.');
    }

    const tokenReturn = {
      token: this.generateToken(user),
      user: {
        name: user.name,
        email: user.email
      }
    }

    return tokenReturn;
  },

  async me({ userId }) {
    const { name, email, createdAt } = await User.findByPk(userId);

    return {
      user: {
        name,
        email,
        since: createdAt
      }
    };
  }
};
