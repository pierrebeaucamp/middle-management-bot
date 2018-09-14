import { IO } from "fp-ts/lib/IO";
import { Application } from "probot";

// Probot requires CommonJS / AMD style modules
export = (app: Application): void => {
  const log = new IO(() => app.on(`*`, async (context) => {
    return context.log({event: context.event, action: context.payload.action});
  }));

  return log.run();
};
