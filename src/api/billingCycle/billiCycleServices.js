const billiCycle = require("./billiCycle");
const BillingCycle = require("./billiCycle");
const errorHandler = require("../common/errorHandler");

BillingCycle.methods(["get", "post", "put", "delete"]);
BillingCycle.updateOptions({ new: true, runValidators: true });
BillingCycle.after("post", errorHandler).after("put", errorHandler);

//O codigo esta definindo como uma chamada get,em /api/billingCycles deve se comportar. Dentro da função esta apenas fazendo um find sem passar nenhum parâmetro> desta forma o moongose busca todos os registors na cleção BillingCycles de forma indiscriminada
BillingCycle.route("get", (req, res, next) => {
  BillingCycle.find({}, (err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      res.status(500).json({ errors: [error] });
    }
  })
    .skip(req.query.skip)
    .limit(req.query.limit);
});

BillingCycle.route("summary", (req, res, next) => {
  BillingCycle.aggregate(
    [
      {
        $project: {
          credit: { $sum: "$credits.value" },
          debt: { $sum: "$debts.value" },
        },
      },
      {
        $group: {
          _id: null,
          credit: { $sum: "$credit" },
          debt: { $sum: "$debt" },
        },
      },
      {
        $project: { _id: 0, credit: 1, debt: 1 },
      },
    ],
    (error, result) => {
      if (error) {
        res.status(500).json({ errors: [error] });
      } else {
        res.json(result[0] || { credit: 0, debt: 0 });
      }
    }
  );
});

BillingCycle.route("count", (req, res, next) => {
  billiCycle.count((error, value) => {
    if (error) {
      res.status(500).json({ errors: [error] });
    } else {
      res.json({ value });
    }
  });
});

module.exports = BillingCycle;
