//$(document).ready(function() {
//    $('#table').DataTable();
//} );
const elements = {
  table: document.querySelector('#TelemetryTable')
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
function sortTable(){
  alert('hi');
  const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
        .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
        .forEach(tr => table.appendChild(tr) );
})));
}