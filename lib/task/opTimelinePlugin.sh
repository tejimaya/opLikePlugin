#!/bin/sh
patch $1 $2 -p0 < plugins/opLikePlugin/data/patches/opTimelinePlugin.patch
