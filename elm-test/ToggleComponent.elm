port module ToggleComponent exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Svg exposing (..)
import Svg.Attributes exposing (..)

main =
  Browser.element 
  { init = init
  , update = update
  , view = view
  , subscriptions = subscriptions }

-- PORTS

port receiveToggle : (Int -> msg) -> Sub msg
port sendToggle : String -> Cmd msg

-- MODEL

type alias Model = {counter : Int, rectColor : String}

init : () -> ( Model, Cmd Msg )
init flags = ( {counter = 0, rectColor = "blue"}, Cmd.none )
  


subscriptions : Model -> Sub Msg
subscriptions model =
    receiveToggle ReceiveToggle
-- UPDATE

type Msg
  = Increment Int
  | ReceiveToggle Int

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Increment x ->
      ({model | counter = model.counter + x, rectColor = colorSelector model.counter}, sendToggle "toggled")
    ReceiveToggle x ->
      ({model | counter = model.counter + x, rectColor = colorSelector model.counter}, Cmd.none)
colorSelector : Int -> String
colorSelector count =
    if  modBy 2 count == 0 then
        "red"
    else
        "blue"


-- VIEW

view : Model -> Html Msg
view model =
  div[]
  [svg
    [ viewBox "0 0 400 400"
    , width "400"
    , height "400"
    ]
    [
        rect
        [ x "10"
        , y "10"
        , width "40"
        , height "40"
        , fill model.rectColor
        , stroke "black"
        , strokeWidth "2"
        , onClick (Increment 1)
        ]
        []
    ]]
  