import "core-js/es6/object";
const { Elm } = require("./ToggleComponent.elm");
//const { Elm } = require("./Incrementor.elm");

const camelize = str => {
  // adapted from https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case#2970667
  return str
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/ (.)/g, firstChar => firstChar.toUpperCase())
    .replace(/ /g, '')
}

const getProps = el => {
  const props = {}

  for (let i = 0; i < el.attributes.length; i++) {
    const attribute = el.attributes[i]
    const name = camelize(attribute.name)
    props[name] = attribute.value
  }
  return props
}

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
        
        elmElement.ports.sendToggle.subscribe(() => {
            this.dispatchEvent(new CustomEvent('mysuperevent',{
                detail: "Hello",
                composed: true,
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
toggle1.addEventListener('mysuperevent', () => {
  console.log("SUPER EVENT 1")
})

const toggle2 = document.getElementById('toggle2')
toggle2.addEventListener('mysuperevent', () => {
  console.log("SUPER EVENT 2")
})
