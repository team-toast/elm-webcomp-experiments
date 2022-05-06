import "core-js/es6/object";
const { Elm } = require("./ToggleComponent.elm");

class ElmElement extends HTMLElement {
    constructor() 
    {
        super();
    }
    connectedCallback() {

        const parentDiv = this.attachShadow({mode: 'open'});

        const elmDiv = document.createElement('div')

        parentDiv.innerHTML = '<p>Hello</p>'
        parentDiv.appendChild(elmDiv)

        const elmElement = Elm.ToggleComponent.init({
        //flags,
        node: elmDiv,
        })
        
        elmElement.ports.sendToggle.subscribe((message) => {
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

}

customElements.define('toggle-component', ElmElement)

const toggle1 = document.getElementById('toggle1')
toggle1.addEventListener('mysuperevent', (event) => {
  console.log("SUPER EVENT 1: " + event.detail)
})

const toggle2 = document.getElementById('toggle2')
toggle2.addEventListener('mysuperevent', (event) => {
  console.log("SUPER EVENT 2: " + event.detail)
})
