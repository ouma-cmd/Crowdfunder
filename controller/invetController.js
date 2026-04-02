const projectService = require("../service/projectService");


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
