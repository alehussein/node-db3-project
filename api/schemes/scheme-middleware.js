const db = require('../../data/db-config')


/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  try{
    const exist = await db('schemes')
    .where('scheme_id', req.params.scheme_id)
    .first()
    // const scheme_id = req.params.id
    if(!exist){
      return res.status(404).json({
        message: `scheme with scheme_id ${req.params.scheme_id} not found`
      })
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
  
  

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  try{
    const { scheme_name } = req.body
    if(!scheme_name || typeof scheme_name !== 'string' || !scheme_name.trim() || scheme_name === undefined){
      return res.status(400).json({
        message: "invalid scheme_name"
      })
    }else{
      next();
    }
  }catch(err){
    next(err);
  }
  
  

}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep =  (req, res, next) => {
  try{
    const { instructions, step_number } = req.body
    if(instructions === undefined || typeof instructions !== 'string' || !instructions.trim() || typeof step_number !== 'number' || step_number < 1){
      return res.status(400).json({
        message: "invalid step"
      })
    }else{
      next();
    }
    }catch(err){
    next(err);
  }
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
