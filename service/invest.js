const { invest } = require("../models/Investment");
const Project = require("../models/project");
const { user: User } = require("../models/User");

// 🟢 ADD INVESTMENT
const investInProject = async (projectId, amount, user) => {
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

  // ✅ load user from DB and check balance
  const dbUser = await User.findById(user._id);
  if (!dbUser) {
    throw new Error("User not found");
  }

  if (dbUser.balance < amount) {
    throw new Error("Insufficient balance");
  }

  // ✅ update project
  project.currentAmount += amount;

  // ✅ close project automatically
  if (project.currentAmount >= project.goalAmount) {
    project.status = "closed";
  }

  // ✅ debit investor balance
  dbUser.balance -= amount;

  // ✅ persist project and user
  await Promise.all([project.save(), dbUser.save()]);

  // ✅ create investment record
  const investment = await invest.create({
    amount,
    user: dbUser._id,
    project: project._id,
  });

  return { project, investment };
};

// GET ALL invest
const getAllInvest = async (user) => {
  const invests = await invest
    .find({ user: user._id })
    .populate("user", "name email")
    .populate("project", "title goalAmount currentAmount status");

  return invests;
};





module.exports = { investInProject, getAllInvest };
