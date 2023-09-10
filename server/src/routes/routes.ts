import express from "express";
import { getPostsRoute } from "./public/get-posts";
import { profileImageRoute } from "./settings/profile-image";
import { newPostRoute } from "./post/new";
import { signupRoute } from "./auth/signup/signup";
import { loginRoute } from "./auth/login/login";
import { settingsRoute } from "./settings/settings";
import { likePostRoute } from "./post/like";
import { commentRoute } from "./post/comment";
import { getLeaderBoardRoute } from "./public/get-leaderboard";

export const router = express();

router.use(signupRoute);
router.use(loginRoute);
router.use(settingsRoute);
router.use("/settings", profileImageRoute);
router.use("/post", newPostRoute);
router.use("/post", likePostRoute);
router.use("/post", commentRoute);
router.use("/public", getPostsRoute);
router.use("/public", getLeaderBoardRoute);
