# Riverpig

[![npm][npm-image]][npm-url] [![CircleCI][circle-image]][circle-url] [![Codecov][codecov-image]][codecov-url]

[npm-image]: https://img.shields.io/npm/v/riverpig.svg?style=flat
[npm-url]: https://npmjs.org/package/riverpig
[circle-image]: https://circleci.com/gh/justmoon/riverpig.svg?style=shield
[circle-url]: https://circleci.com/gh/justmoon/riverpig
[codecov-image]: https://codecov.io/gh/justmoon/riverpig/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/justmoon/riverpig

> Simple downstream log driver for [twelve-factor apps](https://12factor.net/logs)

[![Picture of log drivers](docs/assets/banner.jpg)](https://en.wikipedia.org/wiki/Lumberjack#Names)

# Why?

We wanted a simple logger that logs to stdout and works well with [debug](https://github.com/visionmedia/debug).

# Features

* Integrates with [debug](https://github.com/visionmedia/debug)
* Same log levels as [`Console`](https://developer.mozilla.org/en-US/docs/Web/API/Console): `info`, `warn`, `error`
* Can log callsites (file, line number where log method was called)

# Usage

Use [debug](https://github.com/visionmedia/debug) to add logging to your libraries. In your main application add riverpig:

``` sh
npm install --save riverpig
```

And then add logging to each module like so:

``` sh
const logger = require('riverpig')('mymodule')

logger.info('module loaded')
logger.warn('reaching the end of the module')
logger.error('module actually does not do anything')
```

# Environment config

#### `RIVERPIG_LINEINFO`

Log the file and line where the log method was called. Disabled by default for performance.

Possible values:

* `smart`, `1` or `true` - Let Riverpig select the most useful formatting for callsite information.
* `long` - Log the full, absolute path.
* `short` - Log the absolute path, with folder names truncated to one character, e.g. `/u/l/b/example.js`
* `fileonly` - Log only the file name without path.
