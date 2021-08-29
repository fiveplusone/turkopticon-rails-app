#!/usr/bin/ruby

if `curl -silent https://turkopticon.net` =~ /heavy/
  `/etc/init.d/apache2 restart`
end
