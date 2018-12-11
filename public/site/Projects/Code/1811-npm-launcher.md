+++
tags:
  - 2018
  - automation
  - gui
  - interface
  - javascript
  - nodejs
  - npm
  - npm-launcher
  - programming
  - scripting
  - utilities
+++

# NPM-Launcher -- scripts running GUI utility

GUI interface for common **npm scripts** commands (using
[npm-package-user-scripts-list](https://github.com/lilliputten/npm-package-user-scripts-list)
package).

The idea of this tool came to my mind when I tried to introduce my son to the
development of node projects and manage them using npm scripts from the
console.

This script scans current project (in running path) `package.json` commands (see
[npm-package-user-scripts-list](https://github.com/lilliputten/npm-package-user-scripts-list)
for parsing details) and shows minimalistic window for interactive running your
service tasks.

Take in mind that the content of the log tab is updated only after the command
is completed. All logs are doubled on stdout.

It may be preferable to install the package globally because each local
installation recompiles its own `libui` library instance.

## Requirements

See [LibUI-Node
Requirements](https://github.com/parro-it/libui-node#prerequisites) -- used
interface engine (required some build tools for compiling sources).

## Installation

For current project:

```shell
$ npm i -S npm-launcher
```
Global:
```shell
$ npm i -g npm-launcher
```

## Usage

In js code:

```js
const ScriptCommandsGUI = require('./');

const commandsWindow = new ScriptCommandsGUI({

  // See options reference below...

  /** Datetime format */
  dateformat: 'yyyy.mm.dd, HH:MM:ss',

  /** Minimal window width */
  width: 800,

});

commandsWindow.showWindow();
```

Linux/MacOS shell command line:
```shell
$ npm-launcher &
```

Windows shell command line (console window will be opened, minimized and closed after program finish):
```shell
$ start /min npm run -s cmd-gui ^& exit
```

Another convenient way to run the program on Windows is with vbasic script like this:
```vbscript
CreateObject("Wscript.Shell").Run "npm run -s cmd-gui", 0
```

(Thanks to Kees Bakker, see his article [How to start Node.js app windowless in
Windows](https://keestalkstech.com/2016/07/start-nodejs-app-windowless-windows/).)

See also scripts [npm-launch.cmd](npm-launch.cmd),
[npm-launch.sh](npm-launch.sh), [npm-launch.vbs](npm-launch.vbs) for
global-installed package launch.

## Options

All options are optional. :)

<!-- options begin -->
<!-- generated via `scan-options.sh` at 2018.11.27 01:36:25 -->
- **execOptions**: Exec options (for `child_process.exec`); @see [child_process.exec](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback) (default: `{}`)
- **dateformat**: Format datetime for logging; @see [felixge/node-dateformat](https://github.com/felixge/node-dateformat#usage) (default: `'yyyy.mm.dd HH:MM:ss'`)
- **width**: Minimal window width (default: `600`)
- **height**: Minimal window height (default: `200`)
- **title**: Window title (if can't to generate from `package.json`'s `name` field) (default: `'Commands'`)
- **commands**: Commands list (default: `{ test: { title: 'Test' } }`)
- **buttonSpaces**: Spaces for adding before and after button text (default: `' '`)
<!-- options end -->

## Screenshots

Initial screen:

![Initial screen](screenshots/01-initial-screen.png "Initial screen")

Running command:

<--GALLERY:screenshots
  path: Projects/Code/1811-npm-launcher/
  thumbWidth: 200
  # thumbHeight: 180
  items:
    -
      image: 01-initial-screen.png
      title: Initial screen
    -
      image: 02-lint-running.png
      title: Running command
    -
      image: 03-lint-done.png
      title: Successfully finished command
    -
      image: 04-log-screen.png
      title: Log tab
    -
      image: 05-lint-error.png
      title: Failed command
    -
      image: 06-lint-error-log.png
      title: Show error in the log tab
-->

## See also:

- [Gihub repository](https://github.com/lilliputten/npm-launcher)
