#!/bin/zsh

if [ "$1" = "--all" ] ; then
  s3cmd put -r * s3://starlogs.net
elif [ "$1" = "--assets" ]; then
  cp assets/falcon_fly.mp3 ~/Dropbox/Public/starlogs.net/assets/
  cp assets/falcon_fly.ogg ~/Dropbox/Public/starlogs.net/assets/
  cp assets/imperial_march_small.mp3 ~/Dropbox/Public/starlogs.net/assets/imperial_march.mp3
  cp assets/imperial_march_small.ogg ~/Dropbox/Public/starlogs.net/assets/imperial_march.ogg
  cp assets/theme_small.mp3 ~/Dropbox/Public/starlogs.net/assets/theme.mp3
  cp assets/theme_small.ogg ~/Dropbox/Public/starlogs.net/assets/theme.ogg
else
  s3cmd put starlogs.html s3://starlogs.net
  s3cmd put javascripts/guts.js s3://starlogs.net/javascripts/guts.js
  s3cmd put stylesheets/styles.css s3://starlogs.net/stylesheets/styles.css
fi
