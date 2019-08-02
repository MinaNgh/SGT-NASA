const elements = {
  table: document.querySelector('#TelemetryTable'),  
  mytable: document.querySelector('#table'),
  timestamp : document.getElementById('timestamp'), 
  icon : document.querySelector('.fa'),
  input :document.querySelector('input'),
  sub : document.querySelector('#sub'), 
  unSub : document.querySelector('#unSub'),
  checkboxes : document.querySelectorAll('input[type=checkbox]')
//  checkbox : document.querySelector('input[name=checkbox[]]')
 

}
let  sortOrder;
var wsUri = "ws://localhost:8080/realtime";
let command = "subscribe";
function init() {

  let message = `${command} pwr.v`;

  console.log(message);
   testWebSocket(message);
}

function testWebSocket(message) {
   websocket = new WebSocket(wsUri);

   websocket.onopen = function(evt) {

      onOpen(evt,message)
   };

   websocket.onmessage = function(evt) {
      onMessage(evt,message)
   };

   websocket.onerror = function(evt) {
      onError(evt)
   };
  websocket.onclose = function(evt) {
    onClose(evt)
  };
}

function onOpen(evt,message) {

    console.log("CONNECTED");

//         doSend(message);

}

function onMessage(evt,message) {
  let msg = JSON.parse(evt.data);
  writeToScreen( `<tr>
        <td class="${msg.id}">
            ${msg.id}
        </td>
        <td>
            ${ new Date(msg.timestamp).toUTCString() }
        </td>
        <td>
            ${msg.value}
        </td>
      </tr>`);

//        websocket.close();
}

function onError(evt) {

  console.log(`ERROR: ${evt.data}`);
}
function onClose(){

//        websocket.close();
}

function doSend(message) {

  console.log("SENT: " + message); 
  websocket.send(message);

}

function writeToScreen(message) {


    elements.table.insertAdjacentHTML('afterbegin',message);
}
		
window.addEventListener("load", init, false);     


async function getTelemetry(pointId){
  
    let start = Date.now()- 1000 * 60*15;
    let end = Date.now();

  try{
    const result = await fetch(`http://localhost:8080/history/${pointId}?start=${start}&end=${end}`,{
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



function subscribe(input){
  console.log(input);
    websocket.send(`subscribe ${input}`);
    websocket.onmessage;
//      console.log(websocket.onmessage);
}
function unSubscribe(input){
    websocket.send(`unsubscribe ${input}`);
    websocket.onmessage;
    
    deleteRow(input);
    
}
function deleteRow(input){
  console.log(elements.table.rows.length);
    for (let i = 0 ; i < elements.table.rows.length; i++) {
          let row = elements.table.rows[i]
          console.log(row.innerHTML.includes(input));
          if(row.innerHTML.includes(input) ){
            elements.table.deleteRow(i);
            i--;
          }
  
        };
}

function render(pointId){
  elements.table.innerHTML = "";
  
  checkboxArr = Array.prototype.slice.call(elements.checkboxes) ;
  checkboxArr.map((el,index)=>{
    if(el.checked){
     pointId = el.value;

  
      getTelemetry(pointId).then(data =>{

          const tableRow = data.map(telemetry=> {
             const newRow = `<tr>
                  <td class="${telemetry.id}">
                      ${telemetry.id}
                  </td>
                  <td>
                      ${ new Date(telemetry.timestamp).toUTCString() }
                  </td>
                  <td>
                      ${telemetry.value}
                  </td>
                </tr>`;

              elements.table.insertAdjacentHTML('afterbegin',newRow);
            }

          );

      });
    }
  });
}

