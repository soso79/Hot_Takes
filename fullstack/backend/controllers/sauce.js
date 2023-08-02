const Sauce = require("../models/sauce");

/* importation du package fs (file système) pour s'assurer de supprimer l'image correspondant
a l'objet que l'on veut delete */
const fs = require("fs");

//------------------------------------------------------
// voir toutes les sauces
//------------------------------------------------------
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//------------------------------------------------------
// voir une sauce
//------------------------------------------------------
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

//------------------------------------------------------
// poster une sauce
//------------------------------------------------------
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    likes: 0,
    dislikes: 0,
    // résolution de l'url complète
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//------------------------------------------------------
// modifier une sauce
//------------------------------------------------------
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    const filename = sauce.imageUrl.split("/images/")[1];
    // regarde si req.file existe ou non
    const sauceObject = req.file
      ? {
          ...fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.log("ancienne image non supprimée:" + err);
            } else {
              console.log("l'ancienne image a bien été supprimé");
            }
          }),
          // s'il existe on traite la nouvelle image
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        } /* sinon on traite l'objet entrant*/
      : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: "Objet modifié !" }))
      .catch((error) => res.status(400).json({ error }));
  });
};

//------------------------------------------------------
// supprimer une sauce
//------------------------------------------------------
exports.deleteSauce = (req, res, next) => {
  // recherche de l'objet correspondant dans la base de données avec l'id reçue en parametre
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // récupération du filename
      const filename = sauce.imageUrl.split("/images/")[1];
      // suppression de l'image dans le dossier avec la methode unlink de de fs
      fs.unlink(`images/${filename}`, () => {
        // suppression du thing
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//------------------------------------------------------
// liker une sauce
//------------------------------------------------------
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    let message;
    // si l'utilisateur aime la sauce
    if (req.body.like === 1 && !sauce.usersLiked.includes(req.body.userId)) {
      sauce.usersLiked.push(req.body.userId);
      sauce.likes++;
      message = "l'utilisateur aime cette sauce !";
    }

    // si l'utilisateur n'aime pas la sauce
    if (req.body.like === -1 && !sauce.usersLiked.includes(req.body.userId)) {
      sauce.usersDisliked.push(req.body.userId);
      sauce.dislikes++;
      message = "l'utilisateur n'aime pas cette sauce !";
    }

    // si l'utilisateur change son appréciation
    if (req.body.like === 0) {
      if (sauce.usersLiked.includes(req.body.userId)) {
        sauce.usersLiked.pull(req.body.userId);
        sauce.likes--;
        message = "l'utilisateur a retiré sa mention j'aime !";
      } else if (sauce.usersDisliked.includes(req.body.userId)) {
        sauce.usersDisliked.pull(req.body.userId);
        sauce.dislikes--;
        message = "l'utilisateur a retiré sa mention j'aime pas !";
      }
    }

    sauce
      .save()
      .then(() => res.status(200).json({ message: message }))
      .catch((error) => res.status(500).json({ error }));
  });
};