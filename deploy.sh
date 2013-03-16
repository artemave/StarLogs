#!/bin/sh

if [ "$1" = "--all" ] ; then
  s3cmd put * s3://starlogs.net
else
  s3cmd put *.{html,css,js} s3://starlogs.net
fi
