
import { PrettyErrs, makeResponse } from '../ControllerHelpers/index';
const Promise = require('bluebird')

function wrap (genFn) { 
    const cr = Promise.coroutine(genFn) 
    return (req, res, next) => { 
        cr(req, res, next).catch(next) 
    }
}
/*
* Base controller class with basic CRUD functionality
* @param reference {String} reference to the controllers model.
*/ 
class BaseController {
  constructor(model) {
    // Initiate model from reference
    this.model = model
  }

  /*
  * Gets document by passed in param
  * @param param {Object} What to search by.
  */ 
  getBy(param) {
    return this.controller.model.findOne(param).exec();
  }

   /*
   * Gets controllers model's document by ID
   * @param req.params.id {String} ID of the requested document
   */ 
   getById(req, res, next) {
    const { id } = req.params;

    this.controller.model.findById(id, (err, doc) => {
      const noErrs = PrettyErrs.err(res, err, doc);

      if (noErrs === true) return res.json(makeResponse(true, doc));
    });
  }

   /*
   * Gets all controllers model's documents
   */ 
   getAll(req, res, next) {
    const getAllPromise = this.controller.model.find({}).exec();

    getAllPromise.then((docs) => {
      const noErrs = PrettyErrs.err(res, null, docs);

      if (noErrs === true) return res.json(makeResponse(true, docs));
    })
    .catch((err) => {
      return PrettyErrs.err(res, err);
    });

  }

  /*
  * Creates controllers model's document
  * @param body {Object} fields for a new model
  * @param hasCreator {boolean} if the object belongs to a user.
  */ 
  create(req, res, next, hasCreator) {
    const { body } = req;
    const newModel = new this.controller.model(body);

    if (hasCreator) newModel.belongsTo = req.decoded._doc._id;

    newModel.save((err) => {
      const noErrs = PrettyErrs.err(res, err, newModel);
      if (noErrs === true) return res.json(makeResponse(true, newModel));
    });

  }

  /*
  * Deletes controllers model's document by ID
  * @param req.params.id {String} ID of document to be deleted.
  */ 
  deleteDocument(req, res, next) {
    const { id } = req.params;

    this.controller.model.remove({ _id: id }, (err) => {
      const noErrs = PrettyErrs.err(res, err, true);

      if (noErrs === true) return res.json(makeResponse(true, 'Document deleted'));
    });
  }

  /*
  * Updates controllers model's document by ID
  * @param req.params.id {String} ID of document to be modified
  * @param body {Object} fields that have been modified.
  */ 
  updateDocument(req, res, next) {
    const { id } = req.params;
    const { body } = req;

    this.controller.model.findByIdAndUpdate(id, { $set: body }, { new: true }, (err, updatedDoc) => {
      const noErrs = PrettyErrs.err(res, err, updatedDoc);

      if (noErrs === true) return res.json(makeResponse(true, updatedDoc));
    });
  }


  /*
  * Retrieves documents that belong to a user
  * @param req.decoded._doc._id {String} The users id, from the passed in JWT.
  */ 
  getByUser(req, res, next) {
    const userID = req.decoded._doc._id;

    this.controller.model.find({ belongsTo: userID }).exec()
    .then((docs) => {
      return res.json(makeResponse(true, docs));
    })
    .catch((err) => {
      return PrettyErrs.err(res, err, true);
    });
  }

}

export default BaseController;