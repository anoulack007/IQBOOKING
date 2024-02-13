import {ConditionModel} from '../model/termAndCondition.js'

const CreateCondition = async (req, res) => {
  const { context } = req.body;
  const duct = await ConditionModel.findOne({ context });
  if (duct) {
    return res.status(409).send("User Mee Policy ny leo");
  }
  const po = await ConditionModel.create({ context });
  res.status(201).send(po);
};

const ReadManyCondition = async (req, res) => {
  const readPo = await ConditionModel.find();
  res.status(200).send(readPo);
};

const ReadCondition = async (req, res) => {
  const { id } = req.params;
  const show = await ConditionModel.findById(id);
  res.status(200).send(show);
};


const UpdateCondition = async(req,res)=>{
    const{id}=req.params
    const{Condition}=req.body
    const duct = await ConditionModel.findOne({Condition});
    if (duct) {
    return res.status(409).send(" Mee Policy ny leo");}
    const po = await ConditionModel.findByIdAndUpdate(id,{Condition},{new:true})
    res.status(202).send(po);
}
const deleteCondition =async(req,res)=>{
    const{id}=req.params
    const del = await ConditionModel.findByIdAndDelete(id)
    if (!del) {
        res.status(409).send("Delete Policy Ny leo");
      } else {
        res.status(200).send(del);
      }
}

export const termAndCondition = {
    CreateCondition,
    ReadManyCondition,
    ReadCondition,
    UpdateCondition,
    deleteCondition
} 