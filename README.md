# turkopticon

This is the Rails application for Turkopticon, an employer review system for Amazon Mechanical Turk.



## Installation

----

Since the application is relatively old, we will be using versions of software that play well together. You will find a lot of the instructions are specific to MacOS since that is the device I am working with — if you face an unexpected error, please create an `issue` and include information about your device.

0. ### Get the code

```
git clone git@github.com:fiveplusone/turkopticon-rails-app.git
cd turkopticon-rails-app
```

1. ### Ruby 2.7.1

#### Recommended

Install [RVM](https://rvm.io/) (ruby version manager)

Then install ruby 2.7.1

```bash
rvm install 2.7.1
```

#### Alternate

Install the correct version of ruby directly. Please see instructions on [the ruby website](https://www.ruby-lang.org/).

2. ### Gems

Gems are managed by bundler. Run `bundle install` to install the correct versions of all gems.

3. ### MySQL

The software we will be using requires version 5 of mysql. `brew install mysql@5.7` will install the appropriate version. For other operating systems, or details/alternatives, refer to [the official installation guide](https://dev.mysql.com/doc/refman/5.7/en/installing.html).

The app expects that it can access mysql as the user `root` with no password in development mode. Please talk to us if you have an alternate setup that doesn't work with this assumption.

Make sure the mysql server is running. If you installed mysql with homebrew it may be running already, but if not it can be started as `brew services start mysql@5.7`

Run the following to configure the development database:
```bash
bundle exec rake db:create db:migrate
```

4. ### Starting the app

You should now be able to start the application. You can run this by running the command `bundle exec passenger start`. Visit [localhost:3000](localhost:3000) to see the website!
