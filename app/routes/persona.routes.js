const { authJwt } = require("../middlewares");
const controller = require("../controllers/persona.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/persona/getByDomain", controller.getPersonaByDomain);
    app.get("/api/persona/narrativePersona/:personaId", controller.getPersonaById);
    app.post("/api/persona/add", authJwt.verifyToken, controller.addPersona);
    app.put("/api/persona/:id", authJwt.verifyToken, controller.updatePersona);
    app.get("/api/persona/getAllPersona", authJwt.verifyToken, controller.getUsersPersona);
    app.post("/api/persona/generateNarrativePersona", controller.generateNarrativePersona);
    app.post("/api/persona/generateStructuredPersona", controller.generateStructuredPersona);

};