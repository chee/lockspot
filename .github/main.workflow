workflow "npm test" {
  on = "push"
  resolves = ["Run tests"]
}

action "Install dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Run tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "test"
  needs = ["Install dependencies"]
}

# Filter for a new tag
action "tag-only filter" {
  needs = "Run tests"
  uses = "actions/bin/filter@master"
  args = "tag"
}

action "Publish" {
  needs = "tag-only filter"
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
