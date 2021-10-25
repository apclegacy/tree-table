/**
 * Things to handle interactions by user
 */

/**
 * Saves the state of the tokens and it's tasks.
 * 

 */

 import Osc from '@/modules/Osc'
 import trackedDevice from './TrackedDevice'
 import { projectDd } from './projectDrawDown'

const interactionHandler = (p, trackedDevices, textureGuiTriangleAmountDisplay) => {

const { projectDrawDown, activeSector, setActiveSector, getActiveSectorProjectTitle, getActiveSectorProjectDescription, setAmountOfActiveSector } = projectDd();

let tokens = {}
const TrackedDevice = trackedDevice(p, textureGuiTriangleAmountDisplay);

let tokenActions = ['sectorSelect', 'amountSelect', 'graph'];

let touchCount = 0
let ongoingTouches = []
let isTouch = false
function handleTouch(evt){
    isTouch=true
    touchCount++
    let touches = evt.changedTouches;
    // console.log("touch started at : " + evt.touches[0].clientX + " , " + evt.touches[0].clientY)
    p.touchX = evt.touches[0].clientX
    p.touchY = evt.touches[0].clientY

}

function handleEnd(evt) {
    isTouch=false
    // console.log("touch ended at : " + evt.changedTouches[0].pageX + " , " + evt.changedTouches[0].pageY )
    p.touchX = evt.changedTouches[0].pageX
    p.touchY = evt.changedTouches[0].pageY
}

function handleMove(evt) {
    // console.log("touch moved at : " + evt.changedTouches[0].pageX + " , " + evt.changedTouches[0].pageY )
    p.touchX = evt.changedTouches[0].pageX
    p.touchY = evt.changedTouches[0].pageY
}

function ongoingTouchIndexById(idToFind) {
    for (let i = 0; i < ongoingTouches.length; i++) {
        let id = ongoingTouches[i].identifier

        if (id == idToFind) {
            return i
        }
    }
    return -1    // not found
}

function getOpenActions() {
    let openActions = tokenActions;

    trackedDevices.forEach(device => {
        openActions = openActions.filter(action => {
            return device.action !== action;
        });
    })

    return openActions;
}

function keyTyped(){
    if( key ==='m' || key ==='m'){
        threeDviewFlag=!threeDviewFlag
    }
    if(key ==='f' || key ==='F'){
        openFullscreen()
    }
    if(key === 'v' || key === 'V'){
        vectorMapFlag =!vectorMapFlag
    }
    if(key === 'p' || key === 'P'){
        pOIFlag = !pOIFlag
    }
    if(key === 'n' || key === 'N'){
        flatMapFlag = !flatMapFlag
    }
    if(key === 'c' || key === 'C'){
        flagCO2Data = !flagCO2Data
    }
    if(key === 'k' || key === 'K'){
        flagDataVisStyleCO2 = !flagDataVisStyleCO2
    }
    if(key === 'r' || key === 'R'){
        flagRfrsData = !flagRfrsData
    }
    if(key === 'l' || key === 'L'){
        flagDataVisStyleRfrst = !flagDataVisStyleRfrst
    }
    if (key === '1') {
        switchTokenAction();
    }
}

function mouseClicked() {

}

// LISTEN FOR NEW TRACKED DEVICES AND UPDATES
function listenMessages(){
    const { wsPort } = Osc();
        wsPort.on('addDevice', function(data){
            let thisDevice = new TrackedDevice()
            thisDevice.uniqueId = data.id
            thisDevice.x = data.x * p.windowWidth
            thisDevice.y = data.y * p.windowHeight
            thisDevice.rotation = data.rot

            let openActions = getOpenActions();
            if (openActions && openActions.length > 0) {
                thisDevice.action = openActions[0];
            } else {
                thisDevice.action = openActions[1];
            }

            trackedDevices.push(thisDevice);
        })
        wsPort.on('updateDevice', function(data){
            let id = data.id
            trackedDevices.forEach( element => {
                if(element.uniqueId === id){
                    element.x = data.x * p.windowWidth
                    element.y = data.y * p.windowHeight
                    if (element.action === 'sectorSelect') {
                        selectSectorByDegree(data.rot);
                    } else if (element.action === 'amountSelect') {
                        setAmountOfActiveSector(Math.round(element.rotation), Math.round(data.rot), p);
                    }

                    element.rotation = data.rot
                }
            })
        })
        wsPort.on('removeDevice', function(data){
            let id = data.id
            trackedDevices.forEach( function(element,index) {
                if(element.uniqueId == id ){
                    trackedDevices.splice(index,1)
                }
            })

            delete tokens[id];
            destroyHTML(data.id)
        })
}

function switchTokenAction() {
    trackedDevices[0].action = getOpenActions()[0];
    console.log(trackedDevices[0]);
}

function selectSectorByDegree(rotation) {

    let index = p.round(p.map(rotation, 0, 360, 0, Object.keys(projectDrawDown).length - 1));
    let newSector = Object.keys(projectDrawDown)[index];

    if (newSector != activeSector) {
        setActiveSector(newSector);
        let projectDescription = document.getElementById('projectDrawDownInfoDescription');
        let title = document.querySelector('#projectDrawDownInfoTitle');
        title.innerText = activeSector;
        projectDescription.innerHTML = getActiveSectorProjectDescription();
        let projectQRCode = document.getElementById('projectDrawDownInfoQrCode')
        projectQRCode.src = `imgs/guiElements/qrCodes/${activeSector}.png`;
        let projectTitle = document.getElementById('projectDrawDownInfoTitle');
        projectTitle.innerText = getActiveSectorProjectTitle();
    }
}


return { handleTouch, handleEnd, handleMove, listenMessages }
}

export default interactionHandler