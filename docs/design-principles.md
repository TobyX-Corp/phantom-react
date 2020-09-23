# VR Design Principles
Designing for VR, the new medium

Virtual Reality is an exciting new frontier for immersive experiences. Virtual reality is a new medium with emerging standards, so figuring out fool-proof best practices is a collaborative effort which, within the growing VR community, will be achieved in time. But for now, we believe starting with these principles in this guide may aid you in designing great and comfortable experiences for your audience. If you come from a traditional background making flat user experiences, there are a few differences we believe you need to consider when designing for virtual reality. This guide offers suggestions based on internal research and shared best practices from the VR community.

## Comfort
**Simulator Sickness**
We should start with the biggest challenge when designing for VR: simulator sickness. Nothing will prevent a user from enjoying or re-using your app more than simulator sickness. Much like motion sickness, simulator sickness occurs when the brain receives mismatching signals from what you see compared to the physical motion that the body is experiencing. A user will feel simulator sickness if what they feel does not perfectly match what their mind expects them to feel.

How do you prevent Simulator Sickness?

- Maintain High Framerate: Consistent 60 FPS (90 FPS for supporting devices) is the minimum for a comfortable VR experience. Research has shown drops in framerate and latency in rendering makes users feel sick.
- Avoid Acceleration: Keep the user at a constant velocity when they are moving inside your app. Avoid acceleration and deceleration inside the experience. The easiest solution is to keep the user stationary and allow them to teleport to new spots instantaneously rather than have them move through space. But, there are some promising new developments in traversing in VR that appear better than teleporting here: The Design of the Portal Locomotion
- Ground User with Fixed Objects: A user generally prefers fixed objects to ground them within the experience; this helps them reconcile the sensation of movement within VR when it does not match what is happening in real life.
- Maintain Focus: Always maintain an experience that is in focus, without causing the user's eyes to strain. Stereoscopic 3D experiences are great for adding depth to your app, but having the user's eyes strain from focusing on objects too close, too far, or objects that are not clear can lead to discomfort. (See: Viewable Distance section below)
- Head Tracking: Always maintain head tracking in your app. Never turn it off, even for a short period. Head tracking is what helps objects in virtual space maintain their fixed positions regardless how the user moves their head. This creates the wonderful illusion of a virtual world surrounding the user in 360. Not maintaining head tracking throughout the entire experience will lead to discomfort.
- Everything in 3D Space: Fixing a large graphic, like a splash or loading screen to the user's head, will lead to discomfort. Make sure all your objects and content are grounded in 3D space to be head tracked.

For more, check out:

[Designing for Google Cardboard](https://designguidelines.withgoogle.com/cardboard/designing-for-google-cardboard/a-new-dimension.html)

## From Traditional UI Design to VR UI Design
Traditional UI design is limited to fixed dimensions for its canvas. VR allows creators to utilize a full 360 canvas, with depth, so presenting information and guiding the user can be a bit trickier, but more rewarding if done well.

**Comfort Zone**
If a user needs to strain too much physically, or make movements that go beyond the limitations of the human body, chances are they won't come back. Make sure the experience is effortless for your user. (Source: [Sam Applebee](https://blog.kickpush.co/beyond-reality-first-steps-into-the-unknown-cbb19f039e51#.hailq9p4q))

Assuming the user is sitting on a static (non-spinning) chair, the main user interface should operate within a 94° horizontal space and a 32° vertical space (Source: [Mike Alger](https://www.linkedin.com/in/mikealger)).

**Viewable Distance**
The minimum comfortable viewing distance for UI, before a user starts going cross-eyed, is 0.5m. Beyond 10-meters the sense of 3D stereoscopic depth perception diminishes rapidly until it is almost unnoticeable beyond 20-meters. This gives us a sweet spot between 0.5-meters to 10.0-meters where we can place important content. (Source: [Vincent McCurley](https://medium.com/@vmccurley/storyboarding-in-virtual-reality-67d3438a2fb1#.t6b3lubtq))

- .5m - Minimum Comfortable Viewing Distance

- 10m - Strong Stereoscopic Depth Perception

- 20m - Limit of Stereoscopic Depth Perception

For more information, check out these links:

[VR Design: Transitioning from a 2D to a 3D Design Paradigm](http://alexchu.net/Presentation-VR-Design-Transitioning-from-a-2D-to-a-3D-Design-Paradigm)
[Storyboarding in Virtual Reality](https://medium.com/@vmccurley/storyboarding-in-virtual-reality-67d3438a2fb1#.t6b3lubtq)

## Storytelling in VR
Movies are confined to telling a story within a frame, and many techniques are used to help direct the user's focus. Since VR is not confined, but all around the user, how do you lead the user's eyes when there is no frame? Presenting a great story in VR allows you to display material outside of the traditional frame enabling new storytelling opportunities.

"Instead of controlling what the audience sees in VR, we work with probabilistic areas of user attention based on ergonomic data." (Source: [Vincent McCurley](https://medium.com/@vmccurley/storyboarding-in-virtual-reality-67d3438a2fb1#.rdplewedl))

This is a great resource for storytelling in VR: [The Storyteller’s Guide to the Virtual Reality Audience](https://medium.com/stanford-d-school/the-storyteller-s-guide-to-the-virtual-reality-audience-19e92da57497#.jwettxlax)

## Resolution and Displays
Head Mounted Displays and phones are continually improving the density of pixels in their displays. Due to the low density in resolution of current available hardware, it produces a "screen door" effect where the imagery is not perfectly sharp for the user and they can discern the pixels. Until major improvements are made, consider the size of your UI elements and text. For example, small text does not display well in VR.

## Press Start
Upon entering the VR experience, give the user an opportunity to acclimate to the new experience. Create a buffer to allow the user to intentionally begin the experience. One solution is to display a "Start" button so the user can activate the experience once they are ready to begin.

## Test Frequently
Traditional UX/UI design has a lot of fairly established rules and best practices. Don't assume they all apply to VR. Always remember VR is a new medium that still needs a lot of experimentation with many new, undiscovered UX issues. It is critical to iterate and test often!

