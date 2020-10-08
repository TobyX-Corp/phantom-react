#!/usr/bin/env bash

#
# Copyright © 2020 TobyX Corp. All rights reserved.
#

set -x

# to be safe, clear out any old libraries in the output directory
echo '== Clearing out the old build artifacts =='
rm android/phantom_bridge/build/outputs/aar/*.aar

echo '== Building the Phantom-React library =='
( cd android && ./gradlew :phantom_bridge:assembleRelease )

echo '== Checking for build artifacts =='
if [ ! -f android/phantom_bridge/build/outputs/aar/phantom_bridge-release.aar ]
then
    echo "Unable to find phantom-bridge release output!";
    exit
fi

echo '== Copying build artifacts to the lib directory =='
rm android/phantom_react/*.aar
cp android/phantom_bridge/build/outputs/aar/phantom_bridge-release.aar android/phantom_react/phantom_react-release.aar

npm pack