import { parseISO } from "date-fns";
import { Router } from "express";
import PullChangesService from "../services/sync/PullChangesService";
import PushChangesService from "../services/sync/PushChangesService";

import Todos from "../models/Todos";

const syncRouter = Router();

interface ITodoRaw extends Todos {
  _changed: string;
}

interface IDataRaw {
  todos: {
    created: Array<ITodoRaw>;
    updated: Array<ITodoRaw>;
    deleted: Array<string>;
  };
}

interface PushSyncDTO {
  changes: IDataRaw;
}

syncRouter.get("", async (request, response) => {
  try {
    const { lastPulledAt } = request.query;

    const pullChangesService = new PullChangesService();

    const date = lastPulledAt || undefined;

    const timestamp = new Date().getTime();

    const parsedLastPulledAt = !date
      ? undefined
      : new Date(Number(lastPulledAt));

    const changes = await pullChangesService.execute({
      lastPulledAt: parsedLastPulledAt || new Date(),
      timestamp,
    });
    return response.json(changes);
  } catch (error) {
    return response.json(error);
  }
});

syncRouter.post("", async (request, response) => {
  try {
    const pullChangesService = new PushChangesService();

    const { lastPulledAt } = request.query;

    const { changes } = request.body as PushSyncDTO;

    const date = lastPulledAt || undefined;

    const parsedLastPulledAt = !date
      ? undefined
      : new Date(Number(lastPulledAt));

    const res = await pullChangesService.execute({
      lastPulledAt: parsedLastPulledAt || new Date(),
      changes,
    });

    return response.json(res);
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default syncRouter;
