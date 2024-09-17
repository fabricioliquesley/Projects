import { Request, Response } from "express";
import { knexClient } from "../database/connection";

export class ItemsController {
  async listItems(_request: Request, response: Response) {
    const items = await knexClient("items").select("*");

  const serializedItems = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      image_url: `http://192.168.2.14:3333/uploads/${item.image_url}`,
    };
  });

  return response.json(serializedItems);
  }
}
