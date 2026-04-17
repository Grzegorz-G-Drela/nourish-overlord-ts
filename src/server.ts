import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.get("/health", (req: Request, res: Response): void => {
    res.json({ status: "ok" });
});

app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`);
});