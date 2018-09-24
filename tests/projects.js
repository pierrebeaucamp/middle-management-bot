const { Application } = require("probot");
const { probot } = require("../lib");
const assert = require('assert');
const sinon = require('sinon');
const defaultPayload = require('./default-payload');

beforeScenario(() => {
  const app = new Application();
  const config = "YWRkX2lzc3Vlc190b19jb2x1bW46IGNvbHVtbi0zNDU2OTM3Cg==";
  const api = {
    repos: {
      getContent: sinon.fake.yields(null, {data: {content: config}}),
    },
    projects: {
      createProjectCard: sinon.fake.yields(null, null),
    }
  };

  probot(app);
  app.auth = () => Promise.resolve(api);

  gauge.dataStore.scenarioStore.put("app", app);
  gauge.dataStore.scenarioStore.put("api", api);
});

step("Create a new <issue>", async (issue) => {
  const app = gauge.dataStore.scenarioStore.get("app");
  const payload = defaultPayload;
  payload.action = "opened";
  payload.issue = {id: issue};

  await app.receive({
    name: "issues.opened",
    payload: payload,
  });
});

step("The <issue> is added to the project board", (issue) => {
  const api = gauge.dataStore.scenarioStore.get("api");

  assert(api.projects.createProjectCard.calledWithMatch(sinon.match({
    content_id: issue,
  })), "createProjectCard API called");
});

