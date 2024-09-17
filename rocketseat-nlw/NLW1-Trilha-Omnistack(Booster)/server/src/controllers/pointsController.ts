import { Request, Response } from "express";
import { knexClient } from "../database/connection";
import { randomUUID } from "node:crypto";
import { z } from "zod";

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  city: z.string(),
  uf: z.string().max(2),
  items: z.string(),
});

class PointsController {
  async create(request: Request, response: Response) {
    const { error, data } = bodySchema.safeParse(request.body);

    if (error) {
      return response.status(400).json({
        code: "invalid-type",
        message: "",
        error: error.format(),
      });
    }

    const { name, email, phone, latitude, longitude, city, uf, items } = data;

    const pointId = randomUUID();

    const trx = await knexClient.transaction();

    const point = {
      id: pointId,
      image_url: request.file?.filename,
      name,
      email,
      phone,
      latitude,
      longitude,
      city,
      uf,
    };

    await trx("points").insert(point);

    const pointItems = items
      .split(",")
      .map((item: string) => item.trim())
      .map((item_id: string) => {
        return {
          id: randomUUID(),
          item_id,
          point_id: pointId,
        };
      });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return response.status(201).json(point);
  }

  async listPoints(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    let points;

    const parsedItems = String(items)
      .split(",")
      .map((item) => item.trim());

    if (city && uf && items) {
      points = await knexClient("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .join("items", "items.id", "=", "point_items.item_id")
        .whereIn("items.title", parsedItems)
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("points.*");
    } else if (items) {
      points = await knexClient("points")
        .join("point_items", "points.id", "=", "point_items.point_id")
        .join("items", "items.id", "=", "point_items.item_id")
        .whereIn("items.title", parsedItems)
        .distinct()
        .select("points.*");
    } else if (city && uf) {
      points = await knexClient("points")
        .where("city", String(city))
        .where("uf", String(uf))
        .distinct()
        .select("points.*");
    } else {
      points = await knexClient("points").select("*");
    }

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.2.14:3333/uploads/${point.image_url}`,
      };
    });

    return response.status(200).json(serializedPoints);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knexClient("points")
      .select("*")
      .where("id", id)
      .first();

    if (!point) {
      return response.status(400).json({
        message: "Resource not found!",
      });
    }

    const items = await knexClient("items")
      .select("title")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .where("point_items.point_id", id);

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.2.14:3333/uploads/${point.image_url}`,
    };

    return response.status(200).json({
      ...serializedPoint,
      items,
    });
  }
}

export default PointsController;
