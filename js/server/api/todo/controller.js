const ctrl = {
  params(req, res, next, id) {

  },
  getOne(req, res, next) {
  },
  getAll(req, res, next) {
    return res.status(200).json({message: 'WSZYSTKO GIT'});
  },
  crate(req, res, next) {

  },
  edit(req, res, next) {

  },
  erase(req, res, next) {

  }
}

export default ctrl;
