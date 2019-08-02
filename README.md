# SGT-NASA
API project
JavaScript web application that will:

1. Query the given telemetry server for the last 15 minutes of historical telemetry data for
either or both of the “pwr.v” and “pwr.c” telemetry points. The telemetry points should be
selectable by the user. Changing the selected telemetry points should result in only data
from the selected telemetry points being shown in the table. ie. data for a deselected
telemetry point should be cleared from the table.
2. Display the returned telemetry data in an HTML table sorted ascending or descending by
timestamp. The sort order should be selectable by the user.
3. Subscribe for new telemetry from the selected telemetry points and add rows to the table
as new data becomes available, maintaining the selected sort order. When the user
changes the selected telemetry point, you should only maintain subscriptions to selected
telemetry points, and any telemetry data for a deselected telemetry point should be
removed.

### How to run it:
  - Download the repo
  - Run "Open MCT" server (node.js server)
  
    > git clone [GitHub](https://github.com/nasa/openmct-tutorial.git)
    
    > cd openmct-tutorial
    
    > npm install
    
    > npm start
    
    > you will need to add the following to example-server/server.js
   app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin","http://localhost:8081");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
   });
        
      > Where http://localhost:8081 should be replaced with the details of the http server
        hosting your web application.
    
  - Open "index.html" from "SGT-NASA" folder in browser
