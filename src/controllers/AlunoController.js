import Aluno from '../models/Aluno';
import Foto from '../models/Foto';

class AlunoController {
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      return res.json(novoAluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['aluno não enviado'],
        });
      }

      const novosDados = await aluno.update(req.body);
      const {
        id, nome, email, idade, peso, altura,
      } = novosDados;
      return res.json({
        id, nome, email, idade, peso, altura,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    const alunos = await Aluno.findAll(
      {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'email', 'peso', 'altura'],
        order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
        include: {
          model: Foto,
          attributes: ['id', 'filename', 'url'],
        },
      },
    );
    res.json(alunos);
  }

  async show(req, res) {
    try {
      const aluno = await Aluno.findByPk(
        req.params.id,
        {
          attributes: ['id', 'nome', 'sobrenome', 'idade', 'email', 'peso', 'altura'],
          order: [['id', 'DESC'], [Foto, 'id', 'DESC']],
          include: {
            model: Foto,
            attributes: ['id', 'filename', 'url'],
          },
        },
      );
      if (aluno) {
        return res.json(aluno);
      }
      return res.json(['Erro aluno não encontrado']);
    } catch (e) { return res.json(null); }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['Id não enviado'],
        });
      }

      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['user não enviado'],
        });
      }

      await aluno.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new AlunoController();
