const RosterModel = require("../models/roster.model");
const ErrorCodes = require("../utils/errorCodes");
const moment = require("moment");

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
  const pageSize = 5;
  const page = req.query.page ? parseInt(req.query.page) : 0;
  const department = req.query.department ? req.query.department : "";
  const week = req.query.week ? req.query.week : 0;
  const day = req.query.day ? req.query.day : 0;
  const skip = pageSize * page;
  console.log(page);
  console.log(skip);
  RosterModel.count({ department: department, week: week })
    .then((count) => {
      RosterModel.find({ department: department, week: week, day: day })
        .limit(5)
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

exports.create = (req, res) => {
  req.body.data.week = moment(new Date(req.body.data.date)).week();
  req.body.data.day = moment(new Date(req.body.data.date)).day();
  RosterModel.createRoster(req.body.data)
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
