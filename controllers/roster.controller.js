const RosterModel = require("../models/roster.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  RosterModel.findById(req.params.rosterId)
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json(ErrorCodes.generateError(29));
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.getAll = (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 8;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const skip = pageSize * page;
  RosterModel.count()
    .then((count) => {
      RosterModel.find()
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then((rosters) => {
          res.status(200).json({ totalCount: count, list: rosters });
        })
        .catch((e) => {
          res.status(400).json(e);
        });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.createRosters = (req, res) => {
  RosterModel.createRosters(req.body.rosters)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.deleteRosters = (req, res) => {
  RosterModel.deleteRosters(req.body.rosters)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.delete = (req, res) => {
  RosterModel.deleteRoster(req.params.rosterId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};

exports.update = (req, res) => {
  req.body.data.updatedAt = new Date().getTime();
  RosterModel.updateRoster(req.params.rosterId, req.body.data)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(ErrorCodes.generateError(1));
    });
};
