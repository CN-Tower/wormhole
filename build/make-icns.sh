#!/bin/sh

rm -rf icons.iconset
mkdir icons.iconset

# 生成序列图片
sips -z 16 16 icon.png --out icons.iconset/icon_16x16.png
sips -z 32 32 icon.png --out icons.iconset/icon_16x16@2x.png
sips -z 32 32 icon.png --out icons.iconset/icon_32x32.png
sips -z 64 64 icon.png --out icons.iconset/icon_32x32@2x.png
sips -z 64 64 icon.png --out icons.iconset/icon_64x64.png
sips -z 128 128 icon.png --out icons.iconset/icon_64x64@2x.png
sips -z 128 128 icon.png --out icons.iconset/icon_128x128.png
sips -z 256 256 icon.png --out icons.iconset/icon_128x128@2x.png
sips -z 256 256 icon.png --out icons.iconset/icon_256x256.png
sips -z 512 512 icon.png --out icons.iconset/icon_256x256@2x.png
sips -z 512 512 icon.png --out icons.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icons.iconset/icon_512x512@2x.png
sips -z 1024 1024 icon.png --out icons.iconset/icon_1024x1024.png
sips -z 2048 2048 icon.png --out icons.iconset/icon_1024x1024@2x.png

# 生成MacOS icon.icns图片
rm -rf icon.icns
iconutil -c icns icons.iconset -o icon.icns
