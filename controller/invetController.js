const projectService = require("../service/invest");

// 🟢 INVEST IN PROJECT 🔥
const investController = async (req, res) => {
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

const getAllInvestController = async (req, res) => {
  try {
    const investments = await projectService.getAllInvest(req.user);
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  investController,
  getAllInvestController,
};
