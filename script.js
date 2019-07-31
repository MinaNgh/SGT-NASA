//$(document).ready(function() {
//    $('#table').DataTable();
//} );
let  sortOrder;
const elements = {
  table: document.querySelector('#TelemetryTable'),
  timestamp : document.getElementById('timestamp'), 
  icon : document.querySelector('.fa'),

}
async function getTelemetry(pointId){
  
    let start = Date.now()- 1000 * 60*15;
    let end = Date.now();

  try{
    const result = await fetch(`http://localhost:8080/history/pwr.${pointId}?start=${start}&end=${end}`,{
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
             'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer',
    })
    const data = await result.json();

      return data;

    }
         

  catch(error){
   alert(error); 
  }
  
}
function subscribe(pointId){
    // Create WebSocket connection.
    const socket = new WebSocket(`ws://localhost:8080/realtime`);
    
    var msg = {
      type: "message",
      subscribe: `${pointId}`,
      
    };
    
    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify(msg));
    });
    console.log(JSON.stringify(msg));
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
  
}
function unSubscribe(pointId){

    const socket = new WebSocket(`ws://localhost:8080/realtime`);
    
    var msg = {
      type: "message",
      unsubscribe: `pwr.${pointId}`,
      
    };
    
    // Connection opened
    socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify(msg));
    });
    console.log(JSON.stringify(msg));
    // Listen for messages
    socket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
    });
  
}

function render(pointId){
  elements.table.innerHTML = "";
  getTelemetry(pointId).then(data =>{
//      console.log(data.sort((a,b)=>a.timestamp-b.timestamp));
//    data = data.sort((a,b)=>b.timestamp-a.timestamp); 
      data = sortTable(data);
//    data = data.sort((a,b)=>a.timestamp-b.timestamp);
    
      const tableRow = data.map(telemetry=> {
         const newArray = `<tr>
              <td>
                  ${telemetry.id}
              </td>
              <td>
                  ${ new Date(telemetry.timestamp).toUTCString() }
              </td>
              <td>
                  ${telemetry.value}
              </td>
            </tr>`;
         
          elements.table.insertAdjacentHTML('beforeend',newArray);
        }
        
      );
        
  });
}

function sortTable(data){
  
  elements.timestamp.classList.toggle("desc");
  elements.icon.classList.toggle("fa-sort-asc");
  if(!elements.icon.classList.contains('fa-sort-asc')){
    elements.icon.className = "fa fa-sort-desc";
  }

  sortOrder = elements.timestamp.className;
  data = data.sort((a,b)=>{
    return sortOrder == "desc" ?  a.timestamp-b.timestamp : b.timestamp-a.timestamp;
  });
  
  return data;
  
};
