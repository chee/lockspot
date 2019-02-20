# lockspot

and did you know there's only one company in the world that produces wooden
barrels?

## whümf

some statistics about your package-lock.json

## wetch

```shell
$ npm install -g lockspot
```

## commands

### depcount

print the number of version of each dependency in the tree

#### usage

```sh
$ lockspot depcount < package.json
```

#### options

##### --file=\<path>
the package-lock.json to operate on.
you can use `-` or leave this blank to accept input on STDIN

#### --min=\<int>
only print dependencies that have more than this number of versions.

#### --sort=\<dont|count|name>
how to sort the dependencies. `dont` is the default.
