import "core-js/es6/object";
const { Elm } = require("./ToggleComponent.elm");

class ElmToggleElement extends HTMLElement {
    constructor() 
    {
        super();
        this._message = ""
        this.elmToggleElement = null
    }
    connectedCallback() {

        const parentDiv = this.attachShadow({mode: 'open'});

        const elmDiv = document.createElement('div')

        parentDiv.innerHTML = '<p>Hello</p>'
        parentDiv.appendChild(elmDiv)

        this.elmToggleElement = Elm.ToggleComponent.init({
        //flags,
        node: elmDiv,
        })
        
        this.elmToggleElement.ports.sendToggle.subscribe((message) => {
            this.dispatchEvent(new CustomEvent('mysuperevent',{
                detail: message,
            }));
        });
       
        } catch (error) {
        if (onSetupError) {
            onSetupError(error, context)
        } else {
            console.error(
            `Error from elm-web-components registering`,
            'You can pass an `onSetupError` to handle these.',
            error
            )
        }

    }
    // Send data to receiving elm port
    set messageValue(value) {
        this._message = value
        this.elmToggleElement.ports.receiveToggle.send(1)
        console.log("Setting message value to: " + value)
    }
}

customElements.define('toggle-component', ElmToggleElement)

const toggle1 = document.getElementById('toggle1')
toggle1.addEventListener('mysuperevent', (event) => {
  console.log("SUPER EVENT 1: " + event.detail)
})

const toggle2 = document.getElementById('toggle2')
toggle2.addEventListener('mysuperevent', (event) => {
  console.log("SUPER EVENT 2: " + event.detail)
})

const button1 = document.getElementById('button1')
button1.addEventListener('click', (event) => {
  console.log("Button clicked")
  const toggle2 = document.getElementById('toggle2')
  toggle2.messageValue = "toggle"
})
