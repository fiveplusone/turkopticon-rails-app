#!/bin/bash

/home/ssilberman/.rvm/wrappers/ruby-1.8.7-p374@turkopticon-production/ruby /home/ssilberman/src/turkopticon/script/runner -e production "puts Time.now.strftime(\"[%Y-%m-%d %H:%M:%S] \") + Person.review_commenting_requests" >> /home/ssilberman/src/turkopticon/log/commentingreqs.log
