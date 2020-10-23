#!/usr/bin/env bash

# Copyright (c) 2020-present, TobyX Corp.
# All rights reserved.
#
# Set terminal title
echo -en "\033]0;Ngrok\a"
clear

ngrok http 8081

echo "Process terminated. Press <enter> to close the window"
read
