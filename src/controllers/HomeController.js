class HomeController {
  async index(req, res) {
    res.json('Olá mundo');
  }
}

export default new HomeController();
