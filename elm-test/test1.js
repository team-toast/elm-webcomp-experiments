import "core-js/es6/object";
const elmWebComponents = require("@teamthread/elm-web-components");
const { Elm } = require("./ToggleComponent.elm");

elmWebComponents.configure("0.19");

elmWebComponents.register("elm-toggle-component", Elm.ToggleComponent, {
    onDetached: () => {
        console.log("this component is being removed from the DOM now");
    },
});
