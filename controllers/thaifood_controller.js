var express = require("express");

var router = express.Router();

// Import the model (thaifood.js) to use its database functions.
var Food = require("../models/thaifood.js");

// Create all our routes and set up logic within those routes where required.

router.get("/", function (req, res) {
  Food.all(function (data) {
    var hbsObject = {
      thaiFood: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function (req, res) {
  Food.create(req.body.thaiFoodName,function () {
      // Send back the ID of the new quote
      res.redirect("/");
    });
});

// Devour food
// router.post('/Food/eat/:id', function (req, res) {
//   burger.update(req.params.id, function() {
//     res.redirect('/index');
//   });
// });

router.put("/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  Food.update({
    devoured: req.body.devoured
  }, condition, function () {
    // if (result.changedRows == 0) {
    //   // If no rows were changed, then the ID must not exist, so 404
    //   return res.status(404).end();
    // } else {
    //   res.status(200).end();
    // }
    res.redirect("/");
  });
});

router.delete("/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  Food.delete(condition, function () {
    // if (result.affectedRows == 0) {
    //   // If no rows were changed, then the ID must not exist, so 404
    //   return res.status(404).end();
    // } else {
    //   res.status(200).end();
    // }
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;
