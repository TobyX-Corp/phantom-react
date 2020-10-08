#!/usr/bin/env bash

#
# Copyright © 2020 TobyX Corp. All rights reserved.
#

# NOTE: this script is executed at the root of the new project

# This file moves most of the actual project file setup out of the phantom-react-cli
# It takes 2 arguments, the project name and verbose flags
#

PHANTOM_PROJECT_NAME=$1 # The name of the user's project. The cwd should be already here.
PHANTOM_VERBOSE=$2 # True/False whether or not the user ran init w/ --verbose option

# run the javascript-setup script
./node_modules/phantom-react/bin/javascript-setup.sh $PHANTOM_PROJECT_NAME $PHANTOM_VERBOSE

# copy the setup-ide script to the root of the directory and make it executable
cp ./node_modules/phantom-react/bin/setup-ide.sh .
chmod +x setup-ide.sh

# copy the PhantomFBX tool to their bin directory
mkdir bin
cp ./node_modules/phantom-react/bin/PhantomFBX bin

# run the post-install script if available
if [ -f ./node_modules/phantom-react/bin/post-install.sh ]; then
  ./node_modules/phantom-react/bin/post-install.sh
fi

NGROK_ERROR_MESSAGE="
!!!!!!!!!!!!!!!!! ERROR !!!!!!!!!!!!!!!!!!
Installing ngrok@2.2.3 globally failed
Please run the following command manually:

    npm install -g ngrok

Otherwise, you won't be able to use ngrok (for iOS)
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n"

echo "Attempting to install ngrok@2.2.3 globally..."
npm install -g ngrok@2.2.3 || printf "$NGROK_ERROR_MESSAGE"