//virify authentication

const { viryfieToken } = require("../utils/jwtToken");

const authMiddlware = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      res.status(403).json({ message: "no token provided !" });
    }

    const parts = header.split(" ");

    const decode = viryfieToken(parts[1]);

    req.user = decode;

    next();
  } catch (err) {
    res.status(500).json({ message: "please try again later !" });
  }
};

// virify le role

// const virifyOnwor = ()=>{

// }


module.exports = authMiddlware;