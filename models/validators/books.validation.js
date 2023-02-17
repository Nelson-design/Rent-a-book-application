const Joi = require('joi');
//Book Creation validation

const createBooksChangeSchema = Joi.object({
    title: Joi.string().min(8).required(),
    price: Joi.string().min(8).required(),
    description: Joi.string().min(8).required(),
  });

  const validatecreateBooksChangeSchema = (req, res, next) => {
    try {
      let { error, value } = createBooksChangeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      // console.log(value);
      next();
    } catch (err) {
      return res.status(500).json({
        message: "server issues",
      });
    }
  };


  // Books update validation
  const updateBooksChangeSchema = Joi.object({
    title: Joi.string().min(8).required(),
    price: Joi.string().min(8).required(),
    description: Joi.string().min(8).required(),
    author:Joi.string().min(8),
    year:Joi.string().min(8)
  });

  const validateupdateBooksChangeSchema = (req, res, next) => {
    try {
      let { error, value } = updateBooksChangeSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          message: error,
        });
      }
      // console.log(value);
      next();
    } catch (err) {
      return res.status(500).json({
        message: "server issues",
      });
    }
};
  
// General book search
const generalSearchSchema = Joi.object({
  search: Joi.string().min(8).required(),
});

const validateGeneralSearchSchema = (req, res, next) => {
  try {
    let { error, value } = generalSearchSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    // console.log(value);
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues",
    });
  }
};


module.exports = { validatecreateBooksChangeSchema, validateupdateBooksChangeSchema, validateGeneralSearchSchema };