import { Application, Context } from "probot";
import { app } from ".";

// Probot requires CommonJS / AMD style modules
export = (bot: Application): void => {
  // I'm fed up with the Probot library. I'm just passing _everything_ along
  // to the "proper" app and handle it there instead.
  return bot.on(`*`, (context: Context): Promise<void> => {
    return app(context).run();
  });
};
