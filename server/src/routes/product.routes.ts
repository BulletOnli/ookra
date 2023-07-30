import express from "express";
import {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
} from "../controllers/product.controller";
import multer from "multer";
import protectRoute from "../middleware/protectRoute";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

router.get("/", getSingleProduct);
router.get("/all", getAllProducts);
router.post("/new", protectRoute, upload.single("productImg"), addProduct);
router.put("/update", protectRoute, upload.single("productImg"), updateProduct);

export default router;