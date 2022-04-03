import * as express from 'express';
var router = express.Router();

var accountRepository = require('../repositories/AccountRepository');

router.get('/findAll', (req: express.Request, res: express.Response) => {
  accountRepository.findAll()
    .then((data: void) => {
      res.json({results: data});
    })
    .catch((e: Error) => {
      throw e
    });
});

router.get('/findAllIncludePlayer', (req: express.Request, res: express.Response) => {
  accountRepository.findAllIncludePlayer()
    .then((data: void) => {
      res.json({result: data});
    })
    .catch((e: Error) => {
      throw e
    });
});

router.get('/findWithId/:id', (req: express.Request, res: express.Response) => {
  if(/^[0-9]+$/.test(req.params.id)){
    const id = +req.params.id;
    accountRepository.findWithId(id)
      .then((data: void) => {
        res.json({account: data});
      })
      .catch((e: any) => {
        throw e;
      });
  } else {
    res.send({error: 'Id not a number'});
  }
});

module.exports = router;