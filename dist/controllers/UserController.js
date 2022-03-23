"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const novoUser = await _User2.default.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await _User2.default.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (e) { return res.json(null); }
  }

  async show(req, res) {
    try {
      const users = await _User2.default.findByPk(req.params.id);
      if (users) {
        const { id, nome, email } = users;
        return res.json({ id, nome, email });
      }
      return res.json(['Erro usuario não encontrado']);
    } catch (e) { return res.json(null); }
  }

  async update(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      const users = await _User2.default.findByPk(req.userId);

      if (!users) {
        return res.status(400).json({
          errors: ['user não enviado'],
        });
      }

      const novosDados = await users.update(req.body);
      const { id, nome, email } = novosDados;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      const users = await _User2.default.findByPk(req.userId);

      if (!users) {
        return res.status(400).json({
          errors: ['user não enviado'],
        });
      }

      await users.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
