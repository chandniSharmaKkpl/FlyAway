#import "AppDelegate.h"
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>
#import <Firebase.h>

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <RNSplashScreen.h>
#import <Firebase.h>



static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
#if RCT_DEV
  [bridge moduleForClass:[RCTDevLoadingView class]];
#endif
  
  
    
    if ([UNUserNotificationCenter class] != nil) {
      // iOS 10 or later
      // For iOS 10 display notification (sent via APNS)
      [UNUserNotificationCenter currentNotificationCenter].delegate = self;
      UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert |
          UNAuthorizationOptionSound | UNAuthorizationOptionBadge;
      [[UNUserNotificationCenter currentNotificationCenter]
          requestAuthorizationWithOptions:authOptions
          completionHandler:^(BOOL granted, NSError * _Nullable error) {
            // ...
          }];
    } else {
      // iOS 10 notifications aren't available; fall back to iOS 8-9 notifications.
      UIUserNotificationType allNotificationTypes =
      (UIUserNotificationTypeSound | UIUserNotificationTypeAlert | UIUserNotificationTypeBadge);
      UIUserNotificationSettings *settings =
      [UIUserNotificationSettings settingsForTypes:allNotificationTypes categories:nil];
      [application registerUserNotificationSettings:settings];
    }

    [application registerForRemoteNotifications];
    
//    [FIRMessaging messaging].delegate = self;
//
//    [[FIRInstanceID instanceID] instanceIDWithHandler:^(FIRInstanceIDResult * _Nullable result,
       //                                                 NSError * _Nullable error) {
//      if (error != nil) {
//        NSLog(@"Error fetching remote instance ID: %@", error);
//      } else {
//        NSLog(@"Remote instance ID token: %@", result.token);
//      }
//    }];
    
   // [FIRMessaging messaging].autoInitEnabled = YES;
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"TrobexisApp"
                                            initialProperties:nil];

  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  [FIRApp configure];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  
  /// For removing white screen while launching
  UIStoryboard *sb = [UIStoryboard storyboardWithName:@"LaunchScreen" bundle:nil];
    UIViewController *vc = [sb instantiateInitialViewController];
    UIView* launchScreenView = vc.view;
    launchScreenView.frame = rootView.loadingView.bounds;
    rootView.loadingView = launchScreenView;
  
  [self.window makeKeyAndVisible];
//  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
//    center.delegate = self;

  //  [RNSplashScreen show];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for localNotification event
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void (^)(void))completionHandler
{
  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
}
//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
}
@end
