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
  echo "Building $app"
  cd "$app"
  npm run build
  cd ..
done

echo "All apps have been build"


