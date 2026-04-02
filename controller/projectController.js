const projectService = require("../service/projectService");

// 🟢 CREATE PROJECT
exports.createProjectController = async (req, res) => {
  console.log(req.user);

  try {
    const project = await projectService.createProject(req.body, req.user._id);

    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🟢 GET ALL PROJECTS
exports.getAllProjectsController = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟢 GET PROJECT BY ID
exports.getProjectController = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);

    res.json(project);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// 🟢 UPDATE PROJECT
exports.updateProjectController = async (req, res) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.body,
      req.user.id,
    );

    res.json(project);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// 🟢 DELETE PROJECT
exports.deleteProjectController = async (req, res) => {
  try {
    const result = await projectService.deleteProject(
      req.params.id,
      req.user.id,
    );

    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

// 🟢 INVEST IN PROJECT 🔥
exports.investController = async (req, res) => {
  try {
    const project = await projectService.investInProject(
      req.params.id,
      req.body.amount,
      req.user,
    );

    res.json({
      message: "Investment successful",
      project,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
