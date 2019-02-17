#!/usr/bin/env node
let path = require("path")

let commandDir = path.resolve(__dirname, "commands")

let {argv} = require("yargs")
	.option("file", {
		describe: "the package-lock.json to operate on, use - or nothing for stdin"
	})
	.commandDir(commandDir)
	.demandCommand()
	.epilogue("💖 🐕")
