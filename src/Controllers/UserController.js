const { User } = require('../db/models');
const UserService = require('../services/UserService');

module.exports = {
  async register(req, res, next) {
    const { name, email, password } = req.body;

    await UserService.create({ name, email, password });

    return res.status(201).send();
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const result = await UserService.authenticate({ email, password });

    return res.json(result);
  },

  async me(req, res) {
    const { userId } = req;

    const user = await UserService.me({ userId });

    return res.json(user);
  },
};
