import { Router } from "express";
import { deleteUSer, editUSer, getimgfromselect, getUserByid, getUsers, regisUsers, selectimg } from "../controller.ts/user.controller";
import upload from "../config/multerconfig";
const router  = Router();

router.post('/getuser',getUsers);
router.post('/getuserbyid',upload.none(),getUserByid);

router.post('/selectimguser',upload.none(),selectimg);
router.get('/selectimguser/:filename',getimgfromselect);

router.post('/regisuser',upload.single('img'),regisUsers);
router.post('/deleteuser',upload.none(),deleteUSer);
router.post('/edituser',upload.single("img"),editUSer);


export default router;
