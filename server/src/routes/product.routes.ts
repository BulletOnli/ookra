import express from "express";
import {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
} from "../controllers/product.controller";
import multer from "multer";
import protectRoute from "../middleware/protectRoute";

const productRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

productRouter.get("/", getSingleProduct);
productRouter.get("/all", getAllProducts);
productRouter.post(
    "/new",
    protectRoute,
    upload.single("productImg"),
    addProduct
);
productRouter.put(
    "/update",
    protectRoute,
    upload.single("productImg"),
    updateProduct
);

export default productRouter;
