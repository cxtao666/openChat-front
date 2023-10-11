#!/bin/bash

# 定义子应用目录列表
cd packages
sub_apps=$(find . -maxdepth 1 -type d)

char='.'

# 遍历子应用目录并构建
for app in $sub_apps
do
  if [ "$app" = "$char" ]; then 
    continue
  fi
  echo "test $app"
  cd "$app"
  npm run test
  cd ..
done

echo "All apps have been test"