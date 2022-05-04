import "core-js/es6/object";
const elmWebComponents = require("@teamthread/elm-web-components");
const { Elm } = require("./Incrementor.elm");
//const { Elm } = require("./Incrementor.elm");

let togglePorts = [];
let incrementPorts = [];
let sendTogglePorts = [];

elmWebComponents.configure("0.19");

elmWebComponents.register("elm-toggle-component", Elm.ToggleComponent, {
    setupPorts: ports => {
        togglePorts.push(ports.receiveToggle); 
        ports.sendToggle.subscribe(function(message){console.log("Togglededed " + message); incrementPorts[0].send(1)}
        )
    },
});

elmWebComponents.register("elm-incrementor-component", Elm.Incrementor, {
    setupPorts: ports => {
        incrementPorts.push(ports.receiveIncrement)
    },
    onDetached: () => {
        console.log("this component is being removed from the DOM now");
    },
});

const button2 = document.getElementById('toggle1')
button2.addEventListener('click', () => {
  togglePorts[0].send(1)
  console.log("Clicked toggle")
})