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

1. ### Ruby 1.8.7

```bash
gpg --keyserver hkp://pool.sks-keyservers.net --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

\curl -sSL https://get.rvm.io | bash

rvm install ruby-1.8.7-p374 --with-openssl-lib=[openssl@1.0]/lib --with-openssl-include=[openssl@1.0]/include --with-openssl-dir=[openssl@1.0]

rvm use ruby-1.8.7-p374
```

Since this is an older version of ruby, [versions 1.1+ of openssl do not work with it](https://github.com/rvm/rvm/issues/4781). So you will need to install openssl version 1.0.x. On a mac, if you have [`brew`](https://brew.sh/), you can run `brew install rbenv/tap/openssl@1.0` and your directory will be `/usr/local/opt/openssl@1.0`. 

If you have trouble with the 'gpg' instruction, refer to this [rvm page](https://rvm.io/rvm/security). 

To test ruby has been correctly installed, try installing `rails` with the following command:

```bash
gem install rails -v 2.3.11
```



2. ### MySQL

The software we will be using requires version 5 of mysql. `brew install mysql@5.7` will install the appropriate version. For other operating systems, or details/alternatives, refer to [the official installation guide](https://dev.mysql.com/doc/refman/5.7/en/installing.html).

```bash
# make sure mysql has been started 
# command similar to mysql.server start or brew services start mysql@5.7
# mysql -u root -p password (if you've set a password)
$ mysql -u root 
mysql> create database turkopticon_devel;
mysql> create user 'turkopticon_dev'@'localhost' identified by 'PASSWORD';
mysql> grant all privileges on turkopticon_devel.* to 'turkopticon_dev'@'localhost';
# exit mysql with ctrl+d
$ mysql -u root turkopticon_devel < ./db/turkopticon-empty-structure.sql
```

The password that you set for the host must be the same values that you enter into the `database.yml` file so you should save it.

Note: The `$` and `mysql>` are both command prompts, and should not be copies when entering the command.



3. ### Gems

```bash
gem install fastthread -v 1.0.7
gem install rails -v 2.3.11
gem install mysql -v 2.9.1
gem install json -v 1.8.1
gem install haml -v 3.1.2
gem install --local tmp/gem/mislav-will_paginate-2.3.11.gem --no-rdoc --no-ri # from turkoptica-rails-app dir
```



4. ### Local Env Files

We now need to create a few config files that are specific to your dev environment.

- environment.rb

  ````bash
  # make a copy of the example
  cd config
  cp environment-example.rb environment.rb
  ````

  Then open environment.rb and replace 'secret' with any number of size 30+.

- database.yml

  ```bash
  # make a copy of the example
  cp database-example.yml database.yml
  ```

  Then open `databse.yml` and on line 6, replace `'password'` with the password you chose in step 2 (MySQL).

You should now be able to start the application. You can run this by going into the `script` directory and running the command `./server start`. Visit [localhost:3000](localhost:3000) to see the website!