import {Router} from "express"
import {
    AdminRegister,
    LoginUser,
    logout,
    CreatePost,
    DeletePost,
    getallpost,
    createUser,
    getalluser,
    deleteuser,
    SendMail
} from "../controller/user.controller.js"

import { upload } from "../middleware/multer.js"
import { jwtVerfy } from "../middleware/auth.js"

const router=Router()

router.route("/adminRegister").post(AdminRegister)
router.route("/login").post(LoginUser)
router.route("/logout").get(jwtVerfy,logout)
router.route("/createpost").post(jwtVerfy,upload.single("image"),CreatePost)
router.route("/deletepost/:post_id").post(jwtVerfy,DeletePost)
router.route("/getallpost").get(jwtVerfy,getallpost)
router.route("/createuser").post(jwtVerfy,upload.single("image"),createUser)
router.route("/deleteuser/:user_id").delete(jwtVerfy, deleteuser);
router.route("/getalluser").get(getalluser)
router.route("/sendmail").post(SendMail)




export default router