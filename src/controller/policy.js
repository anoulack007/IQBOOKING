import {policySchema} from '../model/policy.js'

const CreatePolicy = async (req, res) => {
  const { context } = req.body;
  const duct = await policySchema.findOne({ context });
  if (duct) {
    return res.status(409).send("User Mee Policy ny leo");
  }
  const po = await policySchema.create({ context });
  res.status(201).send(po);
};

const ReadManyPolicy = async (req, res) => {
  const readPo = await policySchema.find();
  res.status(200).send(readPo);
};

const ReadPolicy = async (req, res) => {
  const { id } = req.params;
  const show = await policySchema.findById(id);
  res.status(200).send(show);
};


const UpdatePolicy = async(req,res)=>{
    const{id}=req.params
    const{poName}=req.body
    const duct = await policySchema.findOne({poName});
    if (duct) {
    return res.status(409).send(" Mee Policy ny leo");}
    const po = await policySchema.findByIdAndUpdate(id,{poName},{new:true})
    res.status(202).send(po);
}
const deletePolicy =async(req,res)=>{
    const{id}=req.params
    const del = await policySchema.findByIdAndDelete(id)
    if (!del) {
        res.status(409).send("Delete Policy Ny leo");
      } else {
        res.status(200).send(del);
      }
}

export const policy = {
    CreatePolicy,
    ReadManyPolicy,
    ReadPolicy,
    UpdatePolicy,
    deletePolicy
} 