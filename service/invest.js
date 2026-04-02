
const Project = require("../models/project");

// 🟢 ADD INVESTMENT 
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
