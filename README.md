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
  - Download the rep
  - run "Open MCT" server (node.js server)
  
    git clone https://github.com/nasa/openmct-tutorial.git
    cd openmct-tutorial
    npm install
    npm start
    
  - Open index.html in browser
