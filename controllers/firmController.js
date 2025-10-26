const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// Controller function
const addFirmHandler = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    const firm = new Firm({ firmName, area, category, region, offer, image, vendor: vendor._id });
    await firm.save();

    vendor.firm.push(firm._id);
    await vendor.save();

    return res.status(200).json({ message: "Firm added successfully", firm });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteFirmById = async(req,res)=>{
	try {
		const firmId = req.params.firmId;

		const deletedFirm = await Firm.findByIdAndDelete(firmId);

		if(!deletedFirm){
			return res.status(404).json({error:"Firm Not Found"})
		}

	} catch (error) {
		console.error(err);
    	return res.status(500).json({ message: "Internal server error" });
	}
}

// ✅ Export controller function and upload separately
module.exports = { upload, addFirmHandler,deleteFirmById };
