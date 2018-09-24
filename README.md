# Middle Managment Bot

[![Build Status](https://travis-ci.com/pierrebeaucamp/middle-management-bot.svg?branch=master)](https://travis-ci.com/pierrebeaucamp/middle-management-bot)

[![Gauge Badge](https://gauge.org/Gauge_Badge.svg)](https://gauge.org)

This is a work-in-progress GitHub Probot application to automate some common
busywork. I'm primarily writing this for personal use, but ideas and
contributions are welcome.

The project is released as free and open-source software under the Parity Public
License, as defined in LICENSE.txt. Private licenses and a relicensing option
are available for purchase at
https://licensezero.com/ids/81dfef8b-125c-473e-b5d9-7a527f99acff.

## Building

You can either build this project using `npm` or `nix`.

* When using `npm`, run `npm install` followed by `npm run build`. The output
  is then placed in the `lib` directory.

* When building with `nix`, run `nix-build -A package`. The output is then
  placed in the `result` directory.

It is also possible to invoke `nix-shell -A shell` to be placed in a new shell
environment with all dependencies in places. However, if inside a nix shell,
one has to run `ln -s $NODE_PATH node_modules` before any `npm` commands work.


## Deploying

Once built (preferably using `nix`), the application can be deployed to a
Google Cloud Function using terraform. To deploy, run `terraform init` followed
by `terraform apply`.

Note that terraform depends on a service account on Google Cloud. However, it
will generally output debugging information if that service account is missing
permissions. Walking through the individual settings needed on Google Cloud is
beyond the scope of this readme.


## Contributing

All work and communication is being handled through Github issues. For the time
being, contributing is as easy as opening a Pull Request. Of course, both
linting (`npm run lint`) and testing (`npm run test`) need to pass.


## Donating

If this code is helpful to you, consider a small donation to support future
development using https://paypal.me/pierrebeaucamp
