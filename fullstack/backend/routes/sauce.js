const express = require("express");

// création d'un router express
const router = express.Router();

// appel du middleware d'authentification
const auth = require("../middleware/auth");

// appel du middleware de multer
const multer = require("../middleware/multer-config");

// appel des controllers (logique métier)
const sauceCtrl = require("../controllers/sauce");

// enregistrement des routes dans le router (logique de routing)  // attention a l'ordre des middlware, authentification avant toute autre requête
router.get("/", auth, sauceCtrl.getAllSauces);
router.get("/:id", auth, sauceCtrl.getOneSauce);
router.post("/", auth, multer, sauceCtrl.createSauce);
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
router.delete("/:id", auth, sauceCtrl.deleteSauce);
router.post("/:id/like", auth, sauceCtrl.likeSauce);

module.exports = router;