const moment = require("moment");

exports.prepareOrderWeeklyStats = (weekNumber, orders) => {
  const response = {
    fulfilledCount: 0,
    unFulfilledCount: 0,
    fulfilledValue: 0,
    unFulfilledValue: 0,
    totalEarning: 0,
    weeklyStats: [],
  };
  orders.forEach((item) => {
    response.totalEarning += parseFloat(item.totalPurchaseOrderValue);
    if (item.fulfilled) {
      response.fulfilledCount += 1;
      response.fulfilledValue += parseFloat(item.totalPurchaseOrderValue);
    } else {
      response.unFulfilledCount += 1;
      response.unFulfilledValue += parseFloat(item.totalPurchaseOrderValue);
    }
  });

  const weekStart = moment("2020")
    .add(weekNumber - 1, "weeks")
    .startOf("week");

  for (let i = 0; i < 7; i++) {
    const date = weekStart.add(1, "day");
    const day = new Date(date).getDate();
    const obj = {
      date: date.format("DD MM YYYY"),
      earning: 0,
    };
    orders.forEach((item) => {
      const itemDay = new Date(item.deliveryDate).getDate();
      if (itemDay === day) {
        obj.earning += parseFloat(item.totalPurchaseOrderValue);
      }
    });
    response.weeklyStats.push(obj);
  }
  return response;
};

exports.prepareRosterWeeklyStats = (rosters) => {
  const response = {
    plannedHours: 0,
    actualHours: 0,
  };
  rosters.forEach((item) => {
    response.plannedHours += item.hours;
    response.actualHours += item.hours;
  });
  return response;
};

exports.prepareMachineNotificationEmail = (to, machine) => {
  const text =
    "One of you machine has been marked as unoperational, below are the details!" +
    "\n";
  const html = `<p>Machine Name: <b>${machine.machineName}</b></p> \n
  <p>Machine Number: <b>${machine.machineNumber}</b></p> \n
  <p>Reason: <b>${machine.unoperationalReason}</b></p> \n
  `;
  return {
    to: to,
    subject: "Machine Marked as Unoperational!",
    text: text,
    html: html,
  };
};
