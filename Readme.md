
This is a modified script derived from a post on this forum:

* (link expired) https://forums.garmin.com/forum/on-the-trail/wrist-worn/fenix-3/138923-bulk-export-all-activities-to-tcx-files#post1014345
* https://forums.garmin.com/apps-software/mobile-apps-web/f/garmin-connect-web/166824/is-there-a-way-to-export-bulk-data-to-tcx-or-gpx-files-seems-like-i-can-only-bulk-export-to-csv-and-individual-activities-to-gpx

Description:
-----------
This script downloads activities, starting at the most recent and iterating backwards
through older ones. If you don't put the right total number in to download them all,
just navigate to the last one it got and re-run from there.


Before using:
------------
* Pre-set a download location in your browser settings to
some folder and tell the browser to auto-download there. This will
avoid hundreds or thousands of popup requests about where to download the files.

* Options:
  * Export file type : activityInfoURL
  * Activity Type filter if desired : matchActivityType
  * Maximum download quantity : downloadLimit

Use:
---
1. First Navigate to the last (most recent) activity you have in Garmin
Connect (as in https://connect.garmin.com/modern/activity/5555555555
)

2. Open the developer tools and select the console.
  (Pressing F12 should work in chrome/FF/IE to open the dev tools)

3. Paste the below code and hit enter to run it.

4. Can change downloadLimit from 100 to whatever # of activities you want to
download.


If you want a different format, change the "tcx" part of the URL to
the appropriate format acronym if garmin supports it.

If your connection is too slow to do a full download in less than 3
seconds every time, change the downloadTimeoutLength from 3 * 1000 to
whatever number you want (it's 3*1000 because that's 3000 milliseconds
= 3 seconds).

