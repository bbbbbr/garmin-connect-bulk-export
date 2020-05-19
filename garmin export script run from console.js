
/*
Adapted from:
https://forums.garmin.com/forum/on-the-trail/wrist-worn/fenix-3/138923-bulk-export-all-activities-to-tcx-files#post1014345
https://forums.garmin.com/apps-software/mobile-apps-web/f/garmin-connect-web/166824/is-there-a-way-to-export-bulk-data-to-tcx-or-gpx-files-seems-like-i-can-only-bulk-export-to-csv-and-individual-activities-to-gpx

Description:
This script downloads activities, starting at the most recent and iterating backwards
through older ones. If you don't put the right total number in to download them all,
just navigate to the last one it got and re-run from there.


Before using:

* Pre-set a download location in your browser settings to
some folder and tell the browser to auto-download there. This will
avoid hundreds or thousands of popup requests about where to download the files.

* Options:
  * Export file type : activityInfoURL
  * Activity Type filter if desired : matchActivityType
  * Maximum download quantity : downloadLimit

Use:

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

[CODE]*/

var a = window.location.pathname.split("/");
var id = a[a.length-1];
var previousActivityId = "";

var exportTypes = {
    tcxFile: "https://connect.garmin.com/modern/proxy/download-service/export/tcx/activity/",
    gpxFile: "https://connect.garmin.com/modern/proxy/download-service/export/gpx/activity/",
    fitFile: "https://connect.garmin.com/modern/proxy/download-service/files/activity/"};

var activityInfoURL = "https://connect.garmin.com/modern/proxy/activity-service/activity/";

var downloadCount = 1;

// == SETTINGS ==

// --- OPTIONAL: FILTER BY ACTIVITY TYPE **
// var matchActivityType = "cycling";
// var matchActivityType = "running";
// var matchActivityType = "walking";
// var matchActivityType = "swimming";
var matchActivityType = "";

// SELECT DOWNLOAD / EXPORT FORMAT:
var fileExportUrl = exportTypes.fitFile; //tcxFile, gpxFile, fitFile

// SELECT DOWNLOAD QUANTITY:
var downloadLimit = 10000; /* Change from 100 to whatever # of activities you want to download*/
var downloadTimeoutLength = 1000; // 3 * 1000; // = 3 seconds

// == END SETTINGS ==

window.location.href = fileExportUrl + id;


setTimeout(
   (getMore = function(){


        // Load Previous/Next info for the activity
        // Appending "/relative" makes it a prev/next request
        // Return looks like: {"nextActivityId":null,"previousActivityId":12345678}
        jQuery.getJSON(activityInfoURL + id + "/relative?_="+Math.random()
            ,function(d){

            // Store retrieved previous activity linked from the page as the next activity to download
            previousActivityId = d.previousActivityId;

            // Read the activity type
            // Return looks like: JSON: activityName: "<Location> Cycling" or accessControlRuleDTO.typeKey: "cycling"
            jQuery.getJSON(activityInfoURL + id + "/?_="+Math.random()
                ,function(d, ){

                // If specified, check to see if the activity type matches what we want
                // ex : /cycling/g or /cycling/running/g or /*/g for any
                if (matchActivityType !== "") {
                    var isMatch = new RegExp(matchActivityType, "i").test(d.activityTypeDTO.typeKey);
                    if (isMatch) {
                        // Match found, start the download
                        window.location.href = fileExportUrl + id;
                    }
                } else {
                    // Otherwise, download all activities encountered
                    window.location.href = fileExportUrl + id;
                }


                // Set the next activity to load
                id = previousActivityId;

                // If the timeout hasn't been exceeded then set a timer to load the next activity
                if(++downloadCount < downloadLimit){
                    setTimeout(getMore,downloadTimeoutLength );
                }
            }); // end function() getJSON Read the activity type

        }); // end function() getJSON Load prev/next activity info

   }) // end getMore()

   ,downloadTimeoutLength
);



/*

"https://connect.garmin.com/modern/proxy/activity-service/activity/";
accessControlRuleDTO: {typeId: 2, typeKey: "private"}
activityId: 1234567
activityName: "<Location> Cycling"
activityTypeDTO: {typeId: 2, typeKey: "cycling", parentTypeId: 17, sortOrder: 8}
parentTypeId: 17
sortOrder: 8
typeId: 2
typeKey: "cycling"

*/

