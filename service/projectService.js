const Project = require("../models/project");

// 🟢 CREATE PROJECT
exports.createProject = async (data, userId) => {
  const project = await Project.create({
    title: data.title,
    description: data.description,
    goalAmount: data.goalAmount,
    currentAmount: 0,
    status: "open",
    maxInvestmentPercentage: data.maxInvestmentPercentage || 50,
    owner: userId,
  });

  return project;
};

// 🟢 GET ALL PROJECTS (only open)
exports.getAllProjects = async () => {
  const projects = await Project.find({ status: "open" });

  return projects;
};

// 🟢 GET PROJECT BY ID
exports.getProjectById = async (projectId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
};

// 🟢 UPDATE PROJECT (only owner)
exports.updateProject = async (projectId, data, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  // check owner
  if (project.owner.toString() !== userId) {
    throw new Error("Not authorized");
  }

  project.title = data.title || project.title;
  project.description = data.description || project.description;
  project.goalAmount = data.goalAmount || project.goalAmount;
  project.currentAmount = data.currentAmount || project.currentAmount;
  project.status = data.status || project.status;
  project.maxInvestmentPercentage = data.maxInvestmentPercentage || project.maxInvestmentPercentage
  await project.save();

  return project;
};

// 🟢 DELETE PROJECT
exports.deleteProject = async (projectId, userId) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  if (project.owner.toString() !== userId) {
    throw new Error("Not authorized");
  }

  await project.deleteOne();

  return { message: "Project deleted" };
};

