import { Todo } from '../models/index.js';

const modelReference = {
  Todo
};

function makeResponse(success, content) {
  if (success) return { success: true, content: content  };

  return { success: false, err: content }
}

class BaseController {
  constructor(reference) {
    this.model = modelReference[reference];
  }

   getById(req, res, next) {
    const { id } = req.params.id;

    this.controller.model.findById(id, (err, doc) => {
      if (err) return res.json(makeResponse(false, err));
      if (!doc) return res.json(makeResponse(false, 'None Found'));

      return res.json(makeResponse(true, doc));
    });
  }

   getAll(req, res, next) {
    this.controller.model.find({}, (err, docs) => {
      if (err) return res.json(makeResponse(false, err));
      if (!docs) return res.json(makeResponse(false, 404, 'No records were found.'));

      return res.json(makeResponse(true, docs));
    });
  }

  create(req, res, next) {
    const { body } = req;
    const newModel = new this.controller.model(body);

    newModel.save((err) => {
      if (err) return res.json(makeResponse(false, err));
        return res.json(makeResponse(true, newModel));
    });

  }

  deleteDocument(req, res, next) {
    const { id } = req.params.id;

    this.controller.model.remove({ _id: id }, (err) => {
      if (err) return res.json(makeResponse(false, err));
      return res.json(makeResponse(true, 'All is well'))
    });
  }

  updateDocument(req, res, next) {
    const { id, body } = req.params;

    this.controller.model.findByIdAndUpdate(id, { $set: body }, { new: true }, (err, updatedDoc) => {
      if (err) return res.json(makeResponse(false, err));

      return res.json(makeResponse(true, updatedDoc));
    });
  }

}

export default BaseController;