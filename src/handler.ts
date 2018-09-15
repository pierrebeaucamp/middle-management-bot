import { Request } from "express";
import { Ok, Result } from "express-result-types/target/result";
import { wrapAsync } from "express-result-types/target/wrap";
import { IO } from "fp-ts/lib/IO";
import { fromIO, Task } from "fp-ts/lib/Task";
import { Application } from "probot";
import { app as init } from ".";

export default wrapAsync((request: Request): Promise<Result> => {
  const app = new Application();
  const initialize = new IO(() => init(app));
  const handleEvents = new Task(() => app.receive({
    name: request.get("X-GitHub-Event"),
    payload: request.body,
  }));

  return fromIO(initialize)
    .chain(() => handleEvents)
    .map(() => Ok)
    .run();
});
