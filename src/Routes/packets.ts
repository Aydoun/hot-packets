import { Router } from "express";
import {
  getAll,
  registerPacket,
  updatePacket,
  getOne,
} from "../controllers/packet";

const router = Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", registerPacket);
router.put("/:id", updatePacket);

export default router;
