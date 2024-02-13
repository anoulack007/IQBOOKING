import { customerSchema } from "../../model/customer.js";
import { jwtGen } from "../../middleware/jwt.js";

const RegisterFacebook = async (req, res) => {
  const { facebook } = req.body;

  const OldUserFacebook = await customerSchema.findOne({ facebook });

  if (OldUserFacebook) {
    return res.status(400).send("User Facebook Already Exist. Please Login");
  }

  const UserFacebook = await customerSchema.create({
    facebook,
  });

  return res.status(201).send(UserFacebook);
};



const LoginFacebook = async (req, res) => {
  const { facebook } = req.body;

  if (!facebook)
    return res.send({
      message: "User Facebook or password not found",
      statusCode: 400,
    });

  const UserFacebook = await customerSchema.findOne({ facebook });

  if (!UserFacebook) {
    return res.send({
      message: "User Facebook or password not found",
      statusCode: 400,
    });
  }
  const access_token = jwtGen.jwtGenerate(UserFacebook);
  const refresh_token = jwtGen.jwtRefreshToken(UserFacebook);

  res.json({
    access_token,
    refresh_token,
  });
};



  
const ReadManyFacebook = async (req, res) => {
    const facebook = await customerSchema.find().populate("profileId");
  
    res.status(200).send(facebook);
  };


  
  const ReadFacebook = async (req, res) => {
    const { id } = req.params;
  
    const facebook = await customerSchema.findById(id).populate("profileId");
  
    res.status(200).send(facebook);
  };


  const UpdateFacebook = async (req, res) => {
    const { id } = req.params;
  
    const { facebook, profileId } = req.body;
  
    const ValidateUpdate = await customerSchema.findOne({ facebook });
    if (ValidateUpdate) {
      return res.status(400).send("User Google Already Exist. Please Login");
    }
  
    const UpdateFacebook = await customerSchema.findByIdAndUpdate(
      { _id: id },
      { facebook, profileId: profileId },
      { new: true }
    );
  
    res.status(202).send(UpdateFacebook);
  };


  
  const DeleteGoogle = async (req, res) => {
    const { id } = req.params;
  
    const del = await customerSchema.findByIdAndDelete({ _id: id });
  
    res.status(200).send(del);
  };



  export const AuthFacebook = {
    RegisterFacebook,
    LoginFacebook,
    ReadManyFacebook,
    ReadFacebook,
    UpdateFacebook,
    DeleteGoogle
}