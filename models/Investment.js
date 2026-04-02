const mongoose = require("mongoose");

const Investment = mongoose.Schema({

  amount: {
    type:Number,
    required:true,
  },
  user: {
    type : mongoose.Schema.type.Id,
    ref:"user",
    required: true
  },
  project: {
    type: mongoose.Schema.type.Id,
    ref:"project",
    required : true
  },
  date: {
    type:date,
    default:date.new
  },
});

const invest = mongoose.model("invest" , Investment)
module.exports={
    invest,
}
