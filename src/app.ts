import { AnyResponse } from "@octokit/rest";
import { right } from "fp-ts/lib/Either";
import { identity } from "fp-ts/lib/function";
import { Task } from "fp-ts/lib/Task";
import { fromEither, TaskEither, taskify } from "fp-ts/lib/TaskEither";
import { Context } from "probot";
import { getConfig, IConfig, toVoid, Void } from ".";

function handle(context: Context): TaskEither<Error, void> {
  if (context.name !== "issues" && context.payload.action !== "opened") {
    return fromEither(right(Void()));
  }

  const createCard = (config: IConfig) => {
    const params = {
      column_id: config.add_issues_to_column,
      content_id: context.payload.issue.id,
      content_type: "Issue",
    };

    // Once again, my life is put in jeopardy because some people can't provide
    // proper type definitions.
    const createProjectCard: (
      value: any,
      callback: (err: Error | null | undefined, result: AnyResponse) => void,
    ) => void = (context.github as any).projects.createProjectCard;

    return taskify(createProjectCard)(params);
  };

  return getConfig(context).chain(createCard).map(toVoid);
}

export function app(context: Context): Task<void> {
  return handle(context).fold(context.log, identity);
}
