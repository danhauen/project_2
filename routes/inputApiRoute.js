var db = require("../models");

module.exports = function(app) {
    app.get("/api/inputs", function(req, res) {
        db.inputs.findOne({ where: { id: 1 } }).then(function(response) {
            res.json(response);
        });
    });

    app.post("/api/inputs", function(req, res) {
        req = (Object.keys(req.body)[0]);
        db.inputs.update({ key: req },{
            where: { id: 1 },
            returning: true,
            plain: true,
        }).then(function(response) {
            res.json(response);
            //if req is this input, do this, yadda yadda,
            //.then db.input.update   key:""
            
        });
    });
};