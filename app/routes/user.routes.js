const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/addDomain", authJwt.verifyToken, controller.addDomain);
  app.post("/api/user/deleteDomain", authJwt.verifyToken, controller.deleteDomain);
  app.get("/api/user/getDomains", authJwt.verifyToken, controller.getUserDomains);

  app.post("/api/user/addInternalFactor", authJwt.verifyToken, controller.addInternalFactor);
  app.post("/api/user/deleteInternalFactor", authJwt.verifyToken, controller.deleteInternalFactor);
  app.get("/api/user/getInternalFactors", authJwt.verifyToken, controller.getInternalFactors);

  app.post("/api/user/addExternalFactor", authJwt.verifyToken, controller.addExternalFactor);
  app.post("/api/user/deleteExternalFactor", authJwt.verifyToken, controller.deleteExternalFactor);
  app.get("/api/user/getExternalFactors", authJwt.verifyToken, controller.getExternalFactors);


  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken]);

};