const mongoose = require("mongoose");

const Investment = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
  },
  { timestamps: true },
);

const Invest = mongoose.models.invest || mongoose.model("invest", Investment);

module.exports = {
  invest: Invest,
};
