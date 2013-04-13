#!/bin/zsh

if [ "$1" = "--all" ] ; then
  s3cmd put -r * s3://starlogs.net
else
  s3cmd put starlogs.html s3://starlogs.net
  s3cmd put javascripts/guts.js s3://starlogs.net/javascripts/guts.js
  s3cmd put stylesheets/styles.css s3://starlogs.net/stylesheets/styles.css
fi
