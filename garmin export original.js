
var a = window.location.pathname.split("/");
var id = a[a.length-1];
var tcxUrl = "https://connect.garmin.com/modern/proxy/download-service/export/tcx/activity/";
var cnt = 1, ttl = 100; /*Change ttl from 100 to whatever # of activities you want to download*/
var downloadTimeoutLength = 3 * 1000;
var downloadUrl = tcxUrl + id;
window.location.href = downloadUrl;
 
setTimeout(
   (getMore = function(){
    jQuery.getJSON("https://connect.garmin.com/modern/proxy/activity-service/activity/"+id+"/relative?_="+Math.random()
        ,function(d){
            id = d.previousActivityId;
            downloadUrl = tcxUrl + id;
            window.location.href = downloadUrl;
            if(++cnt<ttl){
                setTimeout(getMore,downloadTimeoutLength );
            }
        }
    );
   })
   ,downloadTimeoutLength
);

