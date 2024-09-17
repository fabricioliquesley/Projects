import { Request, Response } from "express";
import { knexClient } from "../database/connection";
import { randomUUID } from "node:crypto";
import { convertTimeToMinutes } from "../utils/convertHourtToMinutes";

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export class ClassesController {
  async create(request: Request, response: Response) {
    const { name, avatar, whatsapp, bio, subject, cost, schedule } =
      request.body;

    const trx = await knexClient.transaction();

    try {
      const user_id = randomUUID();

      await trx("users").insert({
        id: user_id,
        name,
        avatar,
        whatsapp,
        bio,
      });

      const class_id = randomUUID();

      await trx("classes").insert({
        id: class_id,
        cost,
        subject,
        user_id,
      });

      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          id: randomUUID(),
          ...item,
          from: convertTimeToMinutes(item.from),
          to: convertTimeToMinutes(item.to),
          class_id,
        };
      });

      await trx("class_schedule").insert(classSchedule);

      await trx.commit();

      return response.status(201).send();
    } catch (error) {
      await trx.rollback();

      return response.status(400).json({
        error: "Unexpected error while creating new class",
      });
    }
  }

  async list(request: Request, response: Response) {
    const filters = request.query;

    const week_day = parseInt(filters.week_day as string);
    const subject = filters.subject as string;
    const time = filters.time as string;

    // if ((!week_day && week_day !== 0) || !subject || !time) {
    //   return response.status(400).json({
    //     error: "Missing filters to search classes",
    //   });
    // }

    if ((week_day || week_day == 0) && subject && time) {
      const timeInMinutes = convertTimeToMinutes(time);

      const classes = await knexClient("classes")
        .whereExists(function () {
          this.select("class_schedule.*")
            .from("class_schedule")
            .whereRaw("`class_schedule`.`class_id` = `classes`.`id`")
            .whereRaw("`class_schedule`.`week_day` == ??", [week_day])
            .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes])
            .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]);
        })
        .where("classes.subject", subject)
        .join("users", "classes.user_id", "users.id")
        .select(["classes.*", "users.*"]);

      return response.status(200).json(classes);
    } else {
      const classes = await knexClient("classes")
        .join("users", "classes.user_id", "users.id")
        .select(["classes.*", "users.*"]);

      return response.status(200).json(classes);
    }
  }
}
