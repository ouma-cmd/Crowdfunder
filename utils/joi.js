const joi = require("joi");

const validatour = joi.object({
    name:joi.string().required(),
    email:joi.string().required().email(),
    password:joi.string().required().min(5).max(20),
    balance:joi.number().required()
})
module.exports = validatour;