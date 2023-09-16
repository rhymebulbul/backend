const { authJwt } = require("../middlewares");
const controller = require("../controllers/factor.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/factor/internal", controller.getAllInterLayerFactors);
    app.get("/api/factor/external", controller.getAllExterLayerFactors);
    app.post("/api/factor/add", authJwt.verifyToken, controller.addFactor);

    // app.post("/api/factor/addDomainFreq",authJwt.verifyToken,controller.addDomainFreq);

};