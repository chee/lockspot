# lockspot

and did you know there's only one company in the world that produces wooden
barrels?

## whümf

some statistics about your package-lock.json

## wetch

```shell
$ npm install -g lockspot
```

## universal options

### --file=\<path>
the package-lock.json to operate on.
it tries to do the right thing if you leave this blank:
• if you're piping something in on `STDIN`, it'll use that
• if there's a package-lock in the dir, it'll use that
• fall back to `STDIN`
you can use `-` to force consuming `STDIN`

## commands

### depcount

count the number of different versions of each dependency in the tree

#### usage

```sh
$ <package-lock.json lockspot depcount 
```

#### options

##### --min=\<int>
only print dependencies that have more than this number of versions in the tree

##### --prod
only count production (non-dev) dependencies

##### --pattern=\<pattern>
only count dependencies whose names match this pattern

##### --sort=\<dont|count|name>
how to sort the dependencies. `dont` is the default.

### flat

exit with a failure if the tree is not flat

#### usage

```sh
$ <package-lock.json lockspot flat
```

#### options

##### --prod
only count production (non-dev) dependencies

##### --pattern=\<pattern>
only count dependencies whose names match this pattern

<!--
##### --origami
set `production` to `true`, and `pattern` to `/@financial-times\/o-.*/`.
-->
