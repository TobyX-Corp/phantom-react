# Designing for Mobile VR
Considerations when designing for mobile VR.

**1 Button Interaction**
Google Cardboard on mobile is currently the most popular platform to experience VR, and a great way to introduce your audience to VR. Although there is hardware controller support, you should design your apps with the 1 button interaction model to appeal to the most users. Due to the mobile device's touch screen being encased in some form of a holder, interaction with the screen is currently limited to 1 button. You can utilize the gyroscope and allow the user to tilt or rotate the device, but we have found it to be uncomfortable for users as it requires them to briefly exit the experience or perform awkward gestures.

**Reticle and Gaze Interaction**
Aim and interact with what's in the center. That's the principle of mobile interaction design for VR. With that in mind, a targeting reticle is recommended as a visual aid so the user can easily target objects by just moving their gaze. A reticule should be used when there are available interactions in your scene.

**Fuse Button**
A Fuse button has a timed countdown to activate it when the user hovers the reticle over it for a set amount of time. This needs to be represented visually so the user knows to wait for the interaction to take place. For instance, hovering the reticle over a fuse button sets off a 2 sec. loading bar countdown before it activates it.

**Daydream Controller**
The Daydream Controller has these key features:

a) Touchpad — Swipe to scroll and press to click.

b) App button — This button depends on the app you’re using. For example, it might show menus, pause, go back, or change modes.

c) Home button

d) Volume buttons

(Source: [Daydream Help](https://support.google.com/daydream/answer/7184597?hl=en))

The Daydream Controller is like the Wii controller that it does not track perfectly but it is a great pointer device that also tracks gross gestures. This opens up many interaction possibilities within your VR experience that goes beyond just 1 button.

**Samsung Gear VR**
a) TouchPad — The controller is embedded on the right hand side of the Samsung Gear VR. Tap or swipe up, down, right, left on the touchpad controller to select items. Tapping the middle of the controller selects the item.

b) Home Button— Click it once to go back to Oculus Home

c) Back Button — Click it once to go back or hold it for 3 seconds to return to the main menu.

d) Volume Buttons

**Samsug Gear VR Controller**

1. Touchpad - Tap or swipe up, down, right, left on the touchpad controller to select items. Tapping the middle of the controller selects the item.

2. Trigger - Acts as a secondary button

3. Back Button -  Click it once to go back or hold it for 3 seconds to return to the main menu.

4. Home Button— Click it once to go back to Oculus Home

5. Volume Buttons

**Feedback**
Reward the user's interactions with UI with expected feedback. This will help ground the user and further accept their virtual surroundings as something more tangible. If a button is pushed, show a button pushed in, as one would expect in real life.

Consider using audio for instructions or cues for the user. If using text for instructions, make sure they are concise and large enough for the user to read quickly.

**3 Degrees of Freedom (3DOF)**
Mobile-based VR is currently limited to a 3 axis (X,Y,Z) rotational view using the phone's internal gyroscope. This means positional 6 axis tracking (tracking based on the actual location of your head in space) is not available.