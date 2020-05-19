/*

Before using:

* Pre-set a download location in your browser settings to
some folder and tell the browser to auto-download there. This will
avoid hundreds or thousands of popup requests about where to download the files.

* Options:
  * Start-Date / End-Date

Use:

1. First Navigate to the last (most recent) activity you have in Garmin
Connect (as in https://connect.garmin.com/modern/daily-summary/2020-01-01 )

2. Open the developer tools and select the console.
  (Pressing F12 should work in chrome/FF/IE to open the dev tools)

3. Paste the below code and hit enter to run it.

If your connection is too slow to do a full download in less than 3
seconds every time, change the downloadTimeoutLength from 3 * 1000 to
whatever number you want (it's 3*1000 because that's 3000 milliseconds
= 3 seconds).

*/

var fileExportUrl = "https://connect.garmin.com/modern/proxy/download-service/files/wellness/"; // + "YYYY-MM-DD"

var downloadCount = 0;

// == SETTINGS ==

// --- OPTIONAL: FILTER BY ACTIVITY TYPE **
var dateStart = new Date(2017, 8, 9); // (); // default to starting "Today"
var dateEnd   = new Date(2016, 10, 28); // Year, Month (0 based), Day (1 based)

// Download timeout duration
var downloadTimeoutLength = 2000; // 3 * 1000; // = 3 seconds

// == END SETTINGS ==

var dateCurrent = dateStart;


setTimeout(
   (getMore = function(){

        var downloadUrl = fileExportUrl
                          + dateCurrent.getFullYear() + "-"
                          + ("0" + (dateCurrent.getMonth()+1)).slice(-2) + "-"
                          + ("0" + dateCurrent.getDate()).slice(-2);

        console.log(downloadUrl);

        // Start the export file download
        // Note: This does not have the ability to resume after a 404 error, spawning a get request could be better
        window.location.href = downloadUrl;
        downloadCount++;

        // Step back one day
        dateCurrent.setDate(dateCurrent.getDate() - 1);

        // Continue downloading if needed
        if (dateCurrent >= dateEnd) {
            setTimeout(getMore, downloadTimeoutLength);
        }

   }) // end getMore()

   ,downloadTimeoutLength
);


