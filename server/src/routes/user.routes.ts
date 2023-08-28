import express from "express";
import {
    getAccountDetails,
    getUserDetails,
    updateAccountDetails,
    changeAccountPassword,
    followUser,
    getFollowers,
    unfollowUser,
} from "../controllers/user.controller";
import protectRoute from "../middleware/auth/protectRoute";
import roleChecker from "../middleware/auth/roleChecker";

const router = express.Router();

// Details of the account logged in
router.get(
    "/account/details",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    getAccountDetails
);
router.post(
    "/account/details/update",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    updateAccountDetails
);
router.post(
    "/account/password/update",
    protectRoute,
    roleChecker(["Seller", "Buyer"]),
    changeAccountPassword
);

// Details of the user (any user)
router.get("/details", protectRoute, getUserDetails);

router.get("/followers/all", protectRoute, getFollowers);
// Follow user/seller
router.post("/follow", protectRoute, followUser);
router.post("/unfollow", protectRoute, unfollowUser);

export default router;
