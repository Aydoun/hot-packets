import { Router } from "express";
import { getAll } from "../controllers/packet";

const router = Router();

router.get("/", getAll);

export default router;
