const RosterModel = require("../models/roster.model");
const ErrorCodes = require("../utils/errorCodes");

exports.get = (req, res) => {
  const department = req.query.department ? req.query.department : "";
  const week = req.query.week ? req.query.week : 0;
  const day = req.query.day ? req.query.day : 0;
  RosterModel.findOne({ department: department, week: week, day: day })
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(200).json({});
      }
    })
    .catch((e) => {
      res.status(400).json(e);
    });
};

exports.create = (req, res) => {
  RosterModel.createRoster(req.body.data)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

exports.deleteRosters = (req, res) => {
  RosterModel.deleteRosters(req.body.rosters)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

exports.delete = (req, res) => {
  RosterModel.deleteRoster(req.params.rosterId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

exports.update = (req, res) => {
  req.body.data.updatedAt = new Date().getTime();
  RosterModel.updateRoster(req.params.rosterId, req.body.data)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};
