import type { Request, Response } from "express";

export const createCharacter = (req: Request, res: Response) => {
    const characterData = req.body;
    if (!characterData.name || !characterData.description) {
        return res.status(400).send({
            error: "All fields are required",
        });
    }
    res.status(201).send({
        message: "Character created successfully",
        character: characterData
    });
}