const MachineModel = require("../models/machine.model");
const UsserModel = require("../models/user.model");
const ErrorCodes = require("../utils/errorCodes");
const Helpers = require("../utils/helpers");
const Mailer = require("../services/mailer");

exports.get = (req, res) => {
  MachineModel.findById(req.params.machineId)
    .populate("products")
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
  MachineModel.count()
    .then((count) => {
      MachineModel.find()
        .populate({ path: "products" })
        .limit(pageSize)
        .skip(skip)
        .exec()
        .then((machines) => {
          res.status(200).json({ totalCount: count, list: machines });
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
  if (req.file) {
    req.body.imageUrl = `${req.file.destination}/${req.file.filename}`;
  }
  MachineModel.createMachine(req.body)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

exports.deleteMachines = (req, res) => {
  MachineModel.deleteMachines(req.body.machines)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

exports.delete = (req, res) => {
  MachineModel.deleteMachine(req.params.machineId)
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json(e);
    });
};

exports.update = (req, res) => {
  req.body.data.updatedAt = new Date().getTime();
  let notify = false;
  MachineModel.findById(req.params.machineId).then((oldMachine) => {
    if (
      oldMachine.operational !== req.body.data.operational &&
      req.body.data.operational === "no"
    ) {
      notify = true;
    }
    MachineModel.updateMachine(req.params.machineId, req.body.data)
      .then((newMachine) => {
        if (notify) {
          sendMailToAdmins(newMachine);
        }
        res.status(200).json({ success: true });
      })
      .catch((e) => {
        console.log(e);
        res.status(500).json(e);
      });
  });
};

const sendMailToAdmins = (machine) => {
  UsserModel.getAllAdmins().then((admins) => {
    admins.forEach((admin) => {
      const message = Helpers.prepareMachineNotificationEmail(
        admin.email,
        machine
      );
      Mailer.sendEmail(message);
    });
  });
};
