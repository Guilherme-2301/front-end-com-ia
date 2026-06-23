import { Router } from "express";
import { perguntar, listarHistorico } from "../controllers/chatController.js";
import { autenticar } from "../middleware/auth.js";

const router = Router();

router.post("/perguntar", autenticar, perguntar);
router.get("/historico", autenticar, listarHistorico);

export default router;