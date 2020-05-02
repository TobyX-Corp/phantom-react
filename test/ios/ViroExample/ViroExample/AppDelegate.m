//
//  AppDelegate.m
//  ViroExample
//
//  Created by vik.advani on 12/8/16.
//  Copyright © 2016 Vik Advani. All rights reserved.
//

#import "AppDelegate.h"
#include "RCTBundleURLProvider.h"
#include "VRTBundleURLProvider.h"
#include "RCTRootView.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
    // if this is set to YES, then we will enter VR immediately, else
    // we'll show a screen with an "Enter VR" button.
    BOOL enterVrImmediately = YES;
    BOOL usingNgrok = YES;
    if (enterVrImmediately) {
        NSURL *jsCodeLocation = nil;
#ifdef DEBUG
        if(usingNgrok) {
          VRTBundleURLProvider *bundleProvider = [[VRTBundleURLProvider alloc] init];
          jsCodeLocation = [bundleProvider jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
        }
#endif
        if(jsCodeLocation == nil) {
          jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"
                                                                               fallbackResource:nil];
        }

        RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                            moduleName:@"ViroSample"
                                                     initialProperties:nil
                                                         launchOptions:launchOptions];

        self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
        UIViewController *rootViewController = [UIViewController new];
        rootViewController.view = rootView;
        self.window.rootViewController = rootViewController;
        [self.window makeKeyAndVisible];
    }
    return YES;
}

- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

@end
