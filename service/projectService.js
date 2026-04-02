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

// 🟢 ADD INVESTMENT (مهم بزاف 🔥)
exports.investInProject = async (projectId, amount, user) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  // ❌ project closed
  if (project.status === "closed") {
    throw new Error("Project is closed");
  }

  // ❌ check remaining amount
  const remaining = project.goalAmount - project.currentAmount;
  if (amount > remaining) {
    throw new Error("Amount exceeds remaining capital");
  }

  // ❌ check max 50%
  const maxAllowed =
    project.goalAmount * (project.maxInvestmentPercentage / 100);
  if (amount > maxAllowed) {
    throw new Error("You cannot invest more than allowed percentage");
  }

  // ❌ check wallet
  if (user.wallet < amount) {
    throw new Error("Insufficient balance");
  }

  // ✅ update project
  project.currentAmount += amount;

  // ✅ close project automatically
  if (project.currentAmount >= project.goalAmount) {
    project.status = "closed";
  }

  await project.save();

  return project;
};
