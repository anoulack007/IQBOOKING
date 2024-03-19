import express from "express"
import {termAndCondition} from "../controller/termAndCondition.js"
import { Validation } from "../validation/jwtValidate.js"

const authTernAndCondition = express.Router()

authTernAndCondition.post("/api/condition/create",Validation.jwtValidate,termAndCondition.CreateCondition)

authTernAndCondition.get("/api/condition/read",Validation.jwtValidate,termAndCondition.ReadManyCondition)

authTernAndCondition.get("/api/condition/read/:id",Validation.jwtValidate,termAndCondition.ReadCondition)

authTernAndCondition.put("/api/condition/update/:id",Validation.jwtValidate,termAndCondition.UpdateCondition)

authTernAndCondition.delete("/api/condition/delete/:id",Validation.jwtValidate,termAndCondition.deleteCondition)


export default authTernAndCondition