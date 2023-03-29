const express = require("express");

module.exports = function (server) {
  //Definir a URL Base para todas as rotas
  const router = express.Router();
  server.use("/api", router);

  //Rotas de Ciclco de Pagamentos
  const BillingCycle = require("../api/billingCycle/billiCycleServices");
  BillingCycle.register(router, "/billingCycles");
};
