import { Todo, User, TodoEvent } from '../models/index.js';
import PrettyErrors from './errorHelper.js';

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

   /*
   * Gets controllers model's document by ID
   * @param req.params.id {String} ID of the requested document
   */ 
   getById(req, res, next) {
    const { id } = req.params;

    this.controller.model.findById(id, (err, doc) => {
      if (err) return res.json(PrettyErrors.err(err));
      if (!doc) return res.json(PrettyErrors.noDoc());

      return res.json(makeResponse(true, doc));
    });
  }

   /*
   * Gets all controllers model's documents
   */ 
   getAll(req, res, next) {
    this.controller.model.find({}, (err, docs) => {
      if (err) return res.json(PrettyErrors.err(err));
      if (!docs) return res.json(PrettyErrors.noDoc());

      return res.json(makeResponse(true, docs));
    });
  }

  /*
  * Creates controllers model's document
  * @param body {Object} fields for a new model
  */ 
  create(req, res, next) {
    const { body } = req;
    const newModel = new this.controller.model(body);

    newModel.save((err) => {
      if (err) return res.json(PrettyErrors.err(err));

      return res.json(makeResponse(true, newModel));
    });

  }

  /*
  * Deletes controllers model's document by ID
  * @param req.params.id {String} ID of document to be deleted.
  */ 
  deleteDocument(req, res, next) {
    const { id } = req.params;

    this.controller.model.remove({ _id: id }, (err) => {
      if (err) return res.json(PrettyErrors.err(err));

      return res.json(makeResponse(true, 'Document deleted'));
    });
  }

  /*
  * Updates controllers model's document by ID
  * @param req.params.id {String} ID of document to be modified
  * @param body {Object} fields that have been modified.
  */ 
  updateDocument(req, res, next) {
    const { id, body } = req.params;

    this.controller.model.findByIdAndUpdate(id, { $set: body }, { new: true }, (err, updatedDoc) => {
      if (err) return res.json(PrettyErrors.err(err));

      return res.json(makeResponse(true, updatedDoc));
    });
  }

}

export default BaseController;