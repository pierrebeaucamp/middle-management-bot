import { Request } from "express";
import { Ok, Result } from "express-result-types/target/result";
import { wrapAsync } from "express-result-types/target/wrap";
import { IO } from "fp-ts/lib/IO";
import { fromNullable } from "fp-ts/lib/Option";
import { fromIO, Task } from "fp-ts/lib/Task";
import { Application } from "probot";
import { probot } from ".";

export default wrapAsync((request: Request): Promise<Result> => {
  const app = new Application();
  const initialize = new IO(() => probot(app));
  const eventName = fromNullable(request.get("X-GitHub-Event"));
  const handleEvents = new Task(() => app.receive({
    name: eventName.getOrElse(""),
    payload: request.body,
  }));

  return fromIO(initialize)
    .chain(() => handleEvents)
    .map(() => Ok)
    .run();
});
