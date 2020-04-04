import { Router } from "express";
import { getAll, registerPacket, updatePacket } from "../controllers/packet";

const router = Router();

router.get("/", getAll);
router.post("/", registerPacket);
router.put("/:id", updatePacket);

export default router;
