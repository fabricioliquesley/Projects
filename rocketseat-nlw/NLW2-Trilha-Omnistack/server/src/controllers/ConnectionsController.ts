import { Request, Response } from "express";
import { knexClient } from "../database/connection";
import { randomUUID } from "node:crypto";

export class ConnectionsController {
  async index(request: Request, response: Response) {
    const totalConnections = await knexClient("connections").count(
      "* as total"
    );

    const { total } = totalConnections[0];

    return response.status(200).json({total});
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    await knexClient("connections").insert({
      id: randomUUID(),
      user_id,
    });

    return response.status(201).send();
  }
}
