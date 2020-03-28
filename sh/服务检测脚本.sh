#!/bin/bash
SERVICE_NAME=svn
SERVICE_PATH=/usr/bin/svnserve
SERVICE_DATA=/data/svndata/

if [ ! -f "$SERVICE_PATH" ]
then
    echo "$SERVICE_NAME command not found"
    exit 1
fi

case "$1" in
start)
    echo "Starting $SERVICE_NAME ..."
    svnserve -d --listen-port 3690 -r $SERVICE_DATA
    echo "Starting succeessfully !"
;;

stop)
    echo "Stoping $SERVICE_NAME ..."
    if [ `ps -ef |grep $SERVICE_NAME |grep -v grep |grep -v /etc/init.d/$SERVICE_NAME |wc -l` -eq 0 ]
    then 
        echo "$SERVICE_NAME is not runnning !"
    else
        ps -ef |grep $SERVICE_NAME |grep -v 'grep' |awk '{print $2}' |xargs kill -9
        echo "Stoping succeessfully !"
    fi
;;

restart)
    $0 stop
    $0 start
;;

status)
    if [ `ps -ef |grep $SERVICE_NAME |grep -v grep |grep -v /etc/init.d/$SERVICE_NAME |wc -l` -eq 0 ]
    then
        echo "$SERVICE_NAME is stopped ..."
    else
        echo "$SERVICE_NAME is running ..."
    fi
;;

*)
    echo "Usage: $0 {start|stop|restart|status}"  
    exit 1
esac
