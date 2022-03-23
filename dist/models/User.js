"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 20],
            msg: 'Campo nome deve ter entre 3 a 20 caracteres',
          },
        },
      },

      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email invalido',
          },
          isUnique(value, next) {
            User.findOne({ where: { email: value } })
              .then((user) => {
                if (user) {
                  return next('E-mail já existe, tente outro!');
                }
                return next();
              })
              .catch((err) => next(err));
          },
        },
      },

      password_hash: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },

      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 20],
            msg: 'A senha precisa ter entre 6 a 20 caracteres',
          },
        },
      },
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 12);
      }
    });

    return this;
  }

  passwordValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }
} exports.default = User;
