import { Request } from "express";
import { Ok, Result } from "express-result-types/target/result";
import { wrapAsync } from "express-result-types/target/wrap";
import { Task } from "fp-ts/lib/Task";
import { Application } from "probot";

export const handler = wrapAsync((request: Request): Promise<Result> => {
  const app = new Application();

  const eventReceived: Task<[void, void, void]> = new Task(() => app.receive({
    name: request.get("X-GitHub-Event"),
    payload: request.body,
  }));

  const succeed = () => Ok;

  return eventReceived.map(succeed).run();
});
