datetime = (Time.now - 60).strftime("%Y-%m-%d %H:%M")
dir = "/home/ssilberman/src/turkopticon/php_api/log/"
logfile = dir + "multi-attrs.php.log"
outfile = dir + "multi-attrs.php.summary.log"
tmpfile = dir + "multi-attrs.php.summary.tmp"
`grep -E "#{datetime}:[[:digit:]]{2}" #{logfile} > #{tmpfile}`
count = `wc -l #{tmpfile}`.split(" ").first
ipcount = `grep -Eoh "[1-9][[:digit:]]{0,2}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}\.[[:digit:]]{1,3}" #{tmpfile} | sort | uniq | wc -l`
bancount = `fail2ban-client status turkopticon-api | grep -E "Currently banned" | grep -Eo "[0-9]\+"`
top_cpu = `top -b -n2 -d0.01 | grep Cpu | tail -n1` # see note 1
cpu_use = top_cpu.split(" ")[1]
top_mem = `top -b -n1 | grep Mem`
mem_tot_g = top_mem.split(" ")[2].to_i / 1000 / 1000
mem_use_g = top_mem.split(" ")[4].to_i / 1000 / 1000
top_fail2ban = `top -b -n1 | grep fail2ban-server`.split(" ")
fail2ban_cpu = top_fail2ban[8]
fail2ban_mem = top_fail2ban[9]
top_mysqld = `top -b -n1 | grep mysqld | grep -v mysqld_safe`.split(" ")
mysqld_cpu = top_mysqld[8]
mysqld_mem = top_mysqld[9]
`echo "[#{datetime}] #{count.strip} - #{ipcount.strip} IPs - #{bancount.strip} bans - CPU%: #{cpu_use.strip} - MEM USE #{mem_use_g.to_s} / #{mem_tot_g.to_s} GB - mysqld CPU%: #{mysqld_cpu.strip} MEM%: #{mysqld_mem.strip} - fail2ban-server CPU%: #{fail2ban_cpu.strip} MEM%: #{fail2ban_mem.strip}" >> #{outfile}`

# note 1:
# the line "should" be
#   top_cpu = `top -b -n1 | grep Cpu`
# however, the first call to top always returns 21.2% or 21.1% CPU usage
# this is an issue that others have encountered before, see eg
# https://www.unix.com/gentoo/77494-top-batch-mode-cpu-info-wrong.html
# the second call returns correct CPU usage, so we do the above instead
