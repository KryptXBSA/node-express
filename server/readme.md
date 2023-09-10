pm2 start npm --name "main" -- run dev
 
pm2 start npm --name "socket" -- run socket

pm2 start npm --name "cron" -- run cron

pm2 start npm --name "client" -- start
   
