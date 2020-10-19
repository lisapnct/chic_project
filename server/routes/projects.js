var express = require("express");
var router = express.Router();
const Project = require("../models/Project");
const upload = require("../config/aws");

// C
router.post("/", upload.single("images"), async (req, res, next) => {
  try {
    const newProject = req.body;
    if (req.file) {
      newProject.images = req.file.location;
    }
    const apiRes = await Project.create(newProject);
    res.status(201).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// R
router.get("/", async (req, res, next) => {
  const query= {};
  // if(query.filters){
  //   query["materials.fabric_type"] = ["lin","tissu"];
  // }
  // console.log(req.query)
  try {
    const apiRes = await Project.find(query).populate('creator', 'userName');
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users contributions (all projects with given user id in contributors)
router.get("/user/:id", async (req, res, next) => {
  try {
    const apiRes = await Project.find({
      "contributors.id_users": req.params.id,
    })
    .populate("creator", "profilePicture userName")
    .populate("contributors.id_user", "profilePicture userName");
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id/contributions", async (req,res,next) => {
  try {
    const currentUserId = req.session.currentUser;
    const { fabric_type, quantity } = req.body;

    const foundProject  = await Project.find({_id: req.params.id, 'contributors.id_user': currentUserId, 'contributors.contributed_materials.fabric_type': fabric_type });
    // if (foundProject) {
    //     Project.findByIdAndUpdate({_id: req.params.id, 
    //       'contributors.contributed_materials'
    //     })
    // }
    if(foundProject) {
      const contribution = foundProject[0].contributors.find(contributor => contributor.id_user == currentUserId);
      const updatedMaterial = contribution.contributed_materials.find(mat => mat.fabric_type === fabric_type);
      updatedMaterial.quantity += quantity;
      console.log(foundProject[0].contributors[0].contributed_materials);
    }
    const apiRes = await Project.findByIdAndUpdate(
      req.params.id,
      foundProject[0],
      {
        new: true,
      }
    );
    res.status(200).json(apiRes);
  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Project.findById(req.params.id)
      .populate("creator", "profilePicture userName")
      .populate("contributors.id_user", "profilePicture userName");
    const contributor = apiRes.contributors;
    console.log(apiRes);
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// U
router.patch("/:id", upload.single("images"), async (req, res, next) => {
  const updatedProject = req.body;
  console.log(updatedProject)
  if (req.file) {
    updatedProject.image = req.file.location;
  }
  try {
    const apiRes = await Project.findByIdAndUpdate(
      req.params.id,
      updatedProject,
      {
        new: true,
      }
    );
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// D
router.delete("/:id", async (req, res, next) => {
  try {
    const apiRes = await Project.findByIdAndDelete(req.params.id);
    res.status(204).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

//  .populate({ path:'id_users', populate: { path:'id_users'} });
