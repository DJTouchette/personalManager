import { Todo, User, TodoEvent } from '../../models/index.js';
import { PrettyErrs } from '../ControllerHelpers/index';

const modelReference = {
  Todo,
  User,
  TodoEvent,
};

/*
* Makes a response
* @param success {boolean} The status of the response
* @param content {any} The contents of the response
*/ 
export function makeResponse(success, content) {
  if (success) return { success: true, content: content  };

  return { success: false, err: content }
}

class BaseController {
  constructor(reference) {
    // Initiate model from reference
    this.model = modelReference[reference];
  }

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