import { AnyResponse } from "@octokit/rest";
import { tryCatch } from "fp-ts/lib/Either";
import { constant } from "fp-ts/lib/function";
import { task } from "fp-ts/lib/Task";
import {
  fromEither,
  left,
  right,
  TaskEither,
  taskify,
} from "fp-ts/lib/TaskEither";
import * as yaml from "js-yaml";
import { Context } from "probot";

export interface IConfig {
  add_issues_to_column: string;
}

export function getConfig(context: Context): TaskEither<Error, IConfig> {
  const params = context.repo({path: ".github/middle-management-bot.yaml"});

  const toYaml = ((response: AnyResponse): TaskEither<Error, {}> => {
    const content = Buffer.from(response.data.content, "base64").toString();
    return fromEither(tryCatch(constant(yaml.safeLoad(content))));
  });

  const toConfig = ((content: {}): TaskEither<Error, IConfig> => {
    if ("add_issues_to_column" in content) {
      return right(task.of(content as IConfig));
    }

    return left(task.of(new Error("Config file has missing values")));
  });

  return taskify(context.github.repos.getContent)(params)
    .chain(toYaml).chain(toConfig);
}
