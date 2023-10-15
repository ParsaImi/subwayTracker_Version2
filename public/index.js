let myFinal = []

let finalRoad = []
let translated = []
let userSource
let userDestination
function roadFinder(node , saheb){
    console.log("starting RoadFinder");
    finalRoad.push(node)
    let solor = 'salam';
    if(node === saheb){
        return solor
    }
    let mymy = myFinal.find((e) => {
        return e[0] === saheb
    })
    let [newNode , newSaheb] = mymy
    // finalRoad.push(newNode) 
    // console.log(newNode);
    
    roadFinder(newNode , newSaheb)
}

const hasPath = (graph , src , dst , visited) => {
    const queue = [[src, 0 , src]]
    console.log(dst);
    while(queue.length > 0){
        console.log(queue);
         const [node , distance , saheb] = queue.shift()
         myFinal.push([node, saheb])
         console.log(node);
         if(node == dst){
             console.log("salam");
            roadFinder(node , saheb)
            return queue
         }
         for(let neighbor of graph[node]){
             if(!visited.has(neighbor)){
                 visited.add(neighbor)
                 queue.push([neighbor , distance + 1 , node])
                 
             }
         }
    }
    return -1
}

async function convertingNameToNum(source , dst){
  const response = await fetch(`http://127.0.0.1:7000/road/nametonum/${source}/${dst}`);
  const numOfRoads = await response.json();
  return numOfRoads
}

async function convertingNumToName(array){
  const response = await fetch(`http://127.0.0.1:7000/op/change` , {
    method : "POST",
    headers: {
      'Content-Type': 'application/json',
  },
    body : JSON.stringify({
      data : array
    })
})
  const nameforfront = await response.json();
  return nameforfront
}


async function getGraph() {
    const response = await fetch(`http://127.0.0.1:7000/graph/getgraph`);
    const graph = await response.json();
    return graph
  }

async function getRoads(){
    const response = await fetch(`http://127.0.0.1:7000/road/all`);
    const roads = await response.json();
    return roads
}

const searchable = []







const selectBox = document.querySelector('.select-box')
const selectOption = document.querySelector('.select-option')
const soValue = document.querySelector('#soValue')
const optionSearch = document.querySelector('#optionSearch')
const options = document.querySelector('.options')
const selectBoxSec = document.querySelector('.select-box-sec')
const selectOptionSec = document.querySelector('.select-option-sec')
const soValueSec = document.querySelector('#soValue-sec')
const optionSearchSec = document.querySelector('#optionSearch-sec')
const optionsSec = document.querySelector('.options-sec')
const findbtn = document.querySelector('.findbtn')
const roadBox = document.querySelector(".roads")



getRoads().then((data) => {
  data.forEach((e) => {
     searchable.push(e.name) 
  })
  
  searchable.forEach((e) => {
    let li = document.createElement('li');
    let liSec = document.createElement('li');
    li.appendChild(document.createTextNode(e));
    liSec.appendChild(document.createTextNode(e));
    options.appendChild(li);
    optionsSec.appendChild(liSec)
    


    

  })
    const optionListSec = document.querySelectorAll('.options-sec li')
    const optionList = document.querySelectorAll('.options li')
    optionList.forEach(function(optionListSingle){
    optionListSingle.addEventListener('click' , function(){
      text = this.textContent
      soValue.value = text
      userSource = text
      selectBox.classList.remove('active')
    })
  })

  optionListSec.forEach(function(optionListSingle){
    optionListSingle.addEventListener('click' , function(){
      console.log(this.textContent);
      text = this.textContent
      soValueSec.value = text
      userDestination = text
      selectBoxSec.classList.remove('active')
    })
  })
  
})














selectOption.addEventListener('click' , function(){
  selectBox.classList.toggle('active')
} );



optionSearch.addEventListener('keyup' , function(){
  let filter, li, i, textValue
  filter = optionSearch.value.toUpperCase()
  li = options.getElementsByTagName('li');
  for(i = 0; i < li.length ; i++){
    liCount = li[i];
    textValue = liCount.textContent || liCount.innerText
    if(textValue.toUpperCase().indexOf(filter) > -1){
      li[i].style.display = ''
    }else{
      li[i].style.display = 'none'
    }
  }
})






selectOptionSec.addEventListener('click' , function(){
  selectBoxSec.classList.toggle('active')
} );



optionSearchSec.addEventListener('keyup' , function(){
  let filter, li, i, textValue
  filter = optionSearchSec.value.toUpperCase()
  li = optionsSec.getElementsByTagName('li');
  for(i = 0; i < li.length ; i++){
    liCount = li[i];
    textValue = liCount.textContent || liCount.innerText
    if(textValue.toUpperCase().indexOf(filter) > -1){
      li[i].style.display = ''
    }else{
      li[i].style.display = 'none'
    }
  }
})



findbtn.addEventListener('click' , async function(){
  finalRoad = []
  while (roadBox.hasChildNodes()){
               roadBox.removeChild(roadBox.firstChild)
               }
  const [startPoint , endPoint] = await convertingNameToNum(userSource , userDestination)
    getGraph().then(async (data) => {
        
        const graph = data[0].graph
        const undirectedPath = (nodeA , nodeB) => {
            return hasPath(graph , nodeA , nodeB , new Set([nodeA]))
        }
        undirectedPath(startPoint , endPoint)
        console.log(userSource , userDestination);
           const roadForDisplay = await convertingNumToName(finalRoad)
          console.log(roadForDisplay);
      
        roadForDisplay.forEach((e) => {
          const domEl = document.createElement('div');
          domEl.innerHTML = `<p class="roadname">${e}</p>`
          domEl.classList.add('road')
          roadBox.appendChild(domEl)
        })
        // getRoads().then((roads) => {
        //     finalRoad.forEach((e) => {
        //         let obj = roads.find((el) => {
        //           return el.state == e
        //         })
        //       translated.push(obj.name)
        //         // console.log(translated);
        //     })
        // })
    })


 
  })
