# Github Projects

Github Projects is a simple, built-in solution for project management in Github.
Although it is quite flexible out of the box, it is missing common features
which might be offered by thrid party tool. Middle management bot is trying to
bridge this gap.

To set up your GitHub Project with this application, each repository needs a
configuration file under `.github/middle-management-bot.yaml` with the following
content:

```yaml
add_issues_to_column: 1234567
```

You can infer the column ID by visiting your project board, clicking on the
little '…' button of a column and select "Copy column URL". The URL will be of
type "github.com/orgs/<organization\>/projects/<project\>#column-<column\>"


## Automatically assign new issues to the project board

* Create a new "issue"
* The "issue" is added to the project board

