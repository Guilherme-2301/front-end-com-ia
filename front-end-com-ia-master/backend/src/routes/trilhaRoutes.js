import { Router } from "express";
import { gerarAvaliacao, responderAvaliacao, listarTrilhas, buscarTrilha, excluirTrilha } from "../controllers/trilhaController.js";
import { autenticar } from "../middleware/auth.js";

const router = Router();

router.post("/avaliacao", autenticar, gerarAvaliacao);
router.post("/avaliacao/responder", autenticar, responderAvaliacao);
router.get("/", autenticar, listarTrilhas);
router.get("/:id", autenticar, buscarTrilha);
router.delete("/:id", autenticar, excluirTrilha);

export default router;