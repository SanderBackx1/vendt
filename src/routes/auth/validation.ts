import joi from "joi";

export const registerValidation = (data: any) => {
  const schema = joi.object({
    firstname: joi.string().min(2).required(),
    lastname: joi.string().min(2).required(),
    email: joi.string().min(6).required().email(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(data);
};
export const loginValidation = (data:any)=>{
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data)

}

