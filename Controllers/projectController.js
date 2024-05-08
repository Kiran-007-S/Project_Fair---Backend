const projects = require("../Models/projectSchema");

// add project
exports.addUserProject = async (req, res) => {
  console.log("inside Adduser project");

  //get id
  const userId = req.payload;
  console.log(userId);
  //get Add project details
  const { title, language, github, link, overview } = req.body;
  console.log(language);
  //get the image
  const projectImage = req.file.filename;
  console.log(projectImage);

  //logic of adding new user project
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("Project already exist");
    } else {
      const newProject = new projects({
        title,
        language,
        github,
        link,
        overview,
        projectImage,
        userId,
      });
      await newProject.save(); // save new project details into mongodb
      res.status(200).json(newProject);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUserProject = async (req, res) => {
  //get user Id
  const userId = req.payload;
  console.log(userId);
  //api request
  try {
    //get user project
    const userProject = await projects.find({ userId });
    console.log(userProject);
    res.status(200).json(userProject);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

exports.getAllProjects = async (req, res) => {
  //searching code
  const searchKey = req.query.search;
  const query = {
    language: {
      $regex: searchKey,
      $options: "i",
    },
  };
  try {
    const Allprojects = await projects.find(query);
    res.status(200).json(Allprojects);
  } catch {
    res.status(401).json(err.message);
  }
};

exports.getHomeProjects = async (req, res) => {
  try {
    const Homeprojects = await projects.find().limit(3);
    res.status(200).json(Homeprojects);
  } catch {
    res.status(401).json(err.message);
  }
};

exports.editProject = async (req, res) => {
  const { title, languge, github, link, overview, projectImage } = req.body;

  const uploadImage = req.file ? req.file.filename : projectImage;
  const userId = req.payload;
  const {id} = req.params;

  try {
    const updateProject = await projects.findByIdAndUpdate(
      {_id: id},
      {title, languge, github, link, overview, projectImage:uploadImage,userId},
      {new:true}
    );
    await updateProject.save()
    res.status(200).json(updateProject)
  } catch (err) {
    res.status(401).json(err);
  }
};
