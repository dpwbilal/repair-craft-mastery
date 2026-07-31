# Site Revamp Pro

open this project on your website and do these following changes     " I need to make several critical updates to this website. Please read and execute EVERY SINGLE instruction carefully. Do not miss any point. Ensure 100% mobile responsiveness and a smooth user experience.

1. Global Fixes & Performance (Crucial):

Fix Auto-Scroll on Reload: Whenever the website is reloaded, it must automatically start at the very top of the page. Prevent the browser's default behavior of remembering the previous scroll position.

Hide Scrollbars: Hide the vertical scrollbar globally across the entire website on both desktop and mobile (e.g., ::-webkit-scrollbar { display: none; } and scrollbar-width: none;), but ensure the page remains fully scrollable.

Performance Optimization: The website is lagging on mobile, especially during the Diploma celebration animation. Optimize these animations so the site scrolls smoothly without any lag.

2. Header & Hero Section:

Navbar Text: In the header, change the navigation link text from "Facilities" to "Software".

Hero Button 1: Change the "Check seat availability" button text to "Explore Course". Make it functional: clicking it should smoothly scroll the user down to the Course Level section.

Hero Button 2: Change the "Explore course tier" button text to "Contact Now". Keep its styling identical to how it is now. Clicking it should smoothly scroll the user to the contact numbers at the bottom of the page.

3. Instructor Section & Spacing:

Reduce Unnecessary Gaps: As seen in my reference image edited-image.png, there is way too much empty space between the "MEET THE INSTRUCTOR" heading and the instructor's picture. Reduce this gap significantly so it looks connected but maintain a visually pleasing, balanced padding (don't stick them together completely).

Highlight Cities: In the instructor's introduction text, highlight the words "Lahore", "Kuwait", and "China". Use a text color or subtle background highlight that perfectly matches the website's theme.

4. Course Level Section (Swapping & Content):

Section Repositioning: Swap the positions of the "Diploma Ceremony" and "Course Level" sections. The "Course Level" section must come FIRST, and the "Diploma Ceremony" section should be placed BELOW it.

Heading Change: Change the heading "INTEGRATED CURRICULUM" to "COURSE LEVEL". Style it as a proper, attractive section header that matches the theme.

Subtitle Change: Replace the paragraph below it with: "Select the best mobile repairing course level and learn from basic to master level with hands-on practice."

Equal Height Cards: Ensure that the course level cards (Basic, Advance, Master) all have the exact same height and consistent content alignment so they look uniform.

Button Revert: Revert the styling of the "Learn More" button inside the course level cards to its previous original style.

Update Basic Level Content: Update the bullet points to exactly this:

Best For: Beginners & Job Seekers

Mobile Open and close

Glass changing

oca machine

de bubbler machine

All kind of parts replacement

mobile housing

Use of tools multimeter,

use of soldering iron

use of heat gun

Hands-on practice on smartphone models

Basics chip-level repairing and more…

Update Master Level Content: Update the bullet points to exactly this:

Best For: Professionals, Experienced Technicians

Include All Basic + Advance + Master

Ic reballing

Fault tracing

IC Handling: Charging, Network, Power, PA, and Wifi ICs

sim section

audio section

signal section

Hands-on work on New Mobile & boards

Basic to Double Board Swiping

signal section

battery section

5. Software Section & Blocks Redesign:

Heading Styling: Enlarge the "SOFTWARE" heading. It currently doesn't look like a proper heading. Style it to be prominent, attractive, and matching the main theme.

Reduce Spacing: As seen in edited-image_2.png, reduce the massive empty gap between the "SOFTWARE" heading and its definition paragraph.

Update Definition Text: Change the text to: "Master mobile software repair with professional training in phone flashing, device unlocking, and dead phone recovery using industry-standard tools. The course covers Samsung, Oppo, Vivo, Xiaomi, Infinix, Tecno, and iPhone."

Redesign Software Blocks (Important): The 8 software blocks (iPhone Flashing, iCloud Bypass, etc.) are making the website way too long on mobile. Completely redesign this UI into a compact, attractive layout. Use a grid format (e.g., 2 columns on mobile, 4 on desktop), a horizontal swipeable carousel, or a sleek accordion so it saves vertical space while remaining highly attractive and meaningful.

6. Interactive Board Image (Samsung Board):

Fix IC Labels & Positions: Correct the text and exact pointing locations of the ICs on the Samsung motherboard image. Keep the exact same font, color, and design style, just fix the data:

CPU (Processor): Point exactly to the Top-Right Large IC.

UFS (Storage IC): Point exactly to the Top-Center Large IC (upper-middle, slightly left of the processor).

LPDDR5X (RAM IC): Point exactly to the Center-Bottom Large IC (directly below the UFS).

7. Diploma Section Mobile Fix:

Fix Overlay Issue: As seen in edited-image_3.png, on mobile devices, the text "Diploma Day 2026 Graduating Batch — Mobile Repairing" overlaps and completely hides the background picture. Fix this responsive issue. Move this text elegantly above or below the image on mobile view so the picture is 100% visible, while ensuring the layout remains beautiful and not ugly.

8. Footer / Contact Section:

Remove Admission Heading: Permanently remove the "Submit your form" or "Admission Inquiries" heading.

Remove Empty Whitespace: Ensure that deleting this heading does not leave an awkward empty gap. The layout should adjust smoothly. Keep the contact numbers where they are.

Copy to Clipboard Feature: Add a small, attractive text near the numbers saying "Click to copy number".

Functionality: Implement a clipboard copy function. If a user does a single-tap OR a long-press on the phone numbers or the email address, it should instantly copy the data to their clipboard and ideally show a small "Copied!" toast notification. "

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://repair-craft-mastery.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/992e772b-9a9f-4132-a008-96b6e131871f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
