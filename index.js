#!/usr/bin/env node
import path from "path"
import yargs from "yargs"

let lifecycleWarningMessage = `
Hey! it looks like you're running lockspot in the "postinstall" or "install"
hook! this can create some confusion, because the package-lock may not have been
generated yet!

to prevent this, you can use the "postshrinkwrap" lifecycle hook instead, like
this:

"scripts": {
	"postshrinkwrap": "lockspot ${process.argv.slice(2).join(' ')}"
}

See this issue for further info: https://github.com/npm/npm/issues/18798
`

switch (process.env.npm_lifecycle_event) {
	case "postinstall":
	case "install": {
		process.stderr.write(lifecycleWarningMessage)
	}
}

let commandDir = path.resolve(__dirname, "commands")

yargs
	.option("file", {
		describe: "the package-lock.json to operate on",
		type: "string",
	})
	.commandDir(commandDir)
	.demandCommand()
	.help()
	.epilogue("💖 🐕")
	.showHelpOnFail(false)
	.strict().argv
