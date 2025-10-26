const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { upload } = require("../controllers/firmController");
const firmController = require("../controllers/firmController")

// Correct middleware order: verifyToken -> upload -> handler
router.post("/add-firm", verifyToken, upload.single("image"), firmController.addFirmHandler);
router.get("/uploads/:imageName",(req,res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(Path2D.join(__dirname , '..' , 'uploads',imageName))
});

router.delete('/firmId',firmController.deleteFirmById);


module.exports = router;