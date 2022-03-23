"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 20],
              msg: 'Nome precisa ter entre 3 a 20 caracteres',
            },
          },
        },

        sobrenome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 20],
              msg: 'Sobrenome precisa ter entre 3 a 20 caracteres',
            },
          },
        },

        email: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            isEmail: {
              msg: 'Email precisa ser valido',
            },
          },
        },

        idade: {
          type: _sequelize2.default.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'Idade precisa ser um numero inteiro',
            },
          },
        },

        peso: {
          type: _sequelize2.default.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Peso precisa ser um numero inteiro ou de ponto flutuante',
            },
          },
        },

        altura: {
          type: _sequelize2.default.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Altura precisa ser um numero inteiro ou de ponto flutuante',
            },
          },
        },

      },
      {
        sequelize,
      },
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Foto, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
