#!/usr/bin/env node
import path from "path"
import yargs from "yargs"

let commandDir = path.resolve(__dirname, "commands")

yargs
	.option("file", {
		describe: "the package-lock.json to operate on, use - or nothing for stdin"
	})
	.commandDir(commandDir)
	.demandCommand()
	.help()
	.epilogue("💖 🐕")
	.strict()
	.argv
