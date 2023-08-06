const { authJwt } = require("../middlewares");
const controller = require("../controllers/factor.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/factor/internal", controller.getAllInterLayerFactors);

    app.post("/api/factor/add", authJwt.verifyToken,controller.addFactor);

};