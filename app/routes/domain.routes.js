const { authJwt } = require("../middlewares");
const controller = require("../controllers/domain.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/domain/all", controller.getAllDomain);

    app.post("/api/domain/add", authJwt.verifyToken,controller.addDomain);

};