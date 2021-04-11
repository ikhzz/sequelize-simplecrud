const validator = require('validator')

class AuthValidator {

  signup = (req, res, next) => {
    const errors = []
    
    if(!validator.isEmail(req.body.email)){
      errors.push("Email is not valid")
    }
    const result = validator.isStrongPassword(req.body.password, {returnScore: true})
    console.log(result)
    if(!validator.isStrongPassword(req.body.password)){
      errors.push("Password is not Strong")
    }

    if(req.body.confirmPassword !== req.body.password){
      errors.push("Password is not the same")
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  }

  signin = (req, res, next) => {
    const errors = []
    
    if(!validator.isEmail(req.body.email)){
      errors.push("Email is not valid")
    }
    const result = validator.isStrongPassword(req.body.password, {returnScore: true})
    console.log(result)
    if(!validator.isStrongPassword(req.body.password)){
      errors.push("Password is not Strong")
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  }
}

module.exports = new AuthValidator();