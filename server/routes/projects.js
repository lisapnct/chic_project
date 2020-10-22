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
  const query = {};
  // if(query.filters){
  //   query["materials.fabric_type"] = ["lin","tissu"];
  // }
  try {
    const apiRes = await Project.find(query).populate("creator", "userName");
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Special requests : 

// get all projects related to a store
router.get("/stores/:id", async (req, res, next) => {
  try {
    const apiRes = await Project.find({store: req.params.id});
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all users contributions (all projects with given user id in contributors)
router.get("/user", async (req, res, next) => {
  try {
    const apiRes = await Project.find({
      "contributors.id_user": req.session.currentUser,
    })
      .populate("creator", "profilePicture userName")
      .populate("contributors.id_user", "profilePicture userName");
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.patch("/:id/contributions", async (req, res, next) => {
  try {
    
    let query; 
    let search;
    const currentUserId = req.session.currentUser;
    const { fabric_type, quantity } = req.body;
    
    const case1query = { _id: req.params.id, 'contributors.id_user': currentUserId, 'contributors.contributed_materials.fabric_type': fabric_type }
    const case2query = {_id: req.params.id, 'contributors.id_user': currentUserId }
    const case3query = {_id: req.params.id}

    let foundProjectAlr = await Project.find(case1query);
    const foundProjectNve  = await Project.find(case2query);
    const foundProject = await Project.find(case3query);

    // THoses two lines Prevent bugs 
    if(foundProjectAlr.length > 0) {
      const contribution = foundProjectAlr[0].contributors.find(contributor => contributor.id_user == currentUserId);
      contribution.contributed_materials.find(mat => mat.fabric_type === fabric_type) ? console.log('hello') : foundProjectAlr = []; 
    }
    

    if(foundProjectNve.length > 0 && foundProjectAlr.length > 0) {
      const material = foundProjectAlr[0].materials.find(mat => mat.fabric_type === fabric_type);
      material.collected_quantity += Number(quantity);
      if (material.collected_quantity >= material.required_quantity) material.fullyCollected = true;
      if (foundProjectAlr[0].materials.every(elm => elm.fullyCollected === true)) foundProjectAlr[0].isSuccess = true;
      
      const contribution = foundProjectAlr[0].contributors.find(contributor => contributor.id_user == currentUserId)
      const updatedMaterial = contribution.contributed_materials.find(mat => mat.fabric_type === fabric_type);
      updatedMaterial.quantity += Number(quantity);
      
      search = case1query;
      query = foundProjectAlr[0]
      console.log('Case 1');
    }
    
    if (foundProjectNve.length > 0 && foundProjectAlr.length === 0) {
      const material = foundProjectNve[0].materials.find(mat => mat.fabric_type === fabric_type);
      material.collected_quantity += Number(quantity);
      if (material.collected_quantity === material.required_quantity) material.fullyCollected = true;
      if (foundProjectNve[0].materials.every(elm => elm.fullyCollected === true)) foundProjectNve[0].isSuccess = true;
      
      const contribution = foundProjectNve[0].contributors.find(contributor => contributor.id_user == currentUserId);
      contribution.contributed_materials.push({ "fabric_type": fabric_type , "quantity": Number(quantity) });

      search = case2query;
      query = foundProjectNve[0];
      console.log('Case 2');
    }
    if (foundProjectNve.length === 0  && foundProjectAlr.length === 0 && foundProject.length > 0 ) {
      const material = foundProject[0].materials.find(mat => mat.fabric_type === fabric_type);
      material.collected_quantity += Number(quantity);
      if (material.collected_quantity >= material.required_quantity) material.fullyCollected = true;
      if (foundProject[0].materials.every(elm => elm.fullyCollected === true)) foundProject[0].isSuccess = true;
      
      foundProject[0].contributors.push( {"id_user": currentUserId , contributed_materials: [{ "fabric_type": fabric_type , "quantity": Number(quantity) }]})

      search = case3query;
      query = foundProject[0]
      console.log('Case 3');
    }

    const apiRes = await Project.findOneAndUpdate(
      search,
      query,
      {
        new: true,
      }
    ).populate("contributors.id_user", "profilePicture userName")
     .populate("creator", "profilePicture userName");
    res.status(200).json(apiRes);

  } catch(err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const apiRes = await Project.findById(req.params.id)
      .populate("creator", "profilePicture userName")
      .populate("contributors.id_user", "profilePicture userName")
      .populate("store");;
    const contributor = apiRes.contributors;
    res.status(200).json(apiRes);
  } catch (err) {
    res.status(500).json(err);
  }
});

// U
router.patch("/:id", upload.single("images"), async (req, res, next) => {
  const updatedProject = req.body;
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
