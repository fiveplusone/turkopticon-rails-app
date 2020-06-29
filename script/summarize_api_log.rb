datetime = (Time.now - 60).strftime("%Y-%m-%d %H:%M")
dir = "/home/ssilberman/src/turkopticon/php_api/log/"
logfile = dir + "multi-attrs.php.log"
outfile = dir + "multi-attrs.php.summary.log"
count = `grep -E "#{datetime}:[[:digit:]]{2}" #{logfile} | wc -l`
`echo "[#{datetime}] #{count.strip}" >> #{outfile}`
