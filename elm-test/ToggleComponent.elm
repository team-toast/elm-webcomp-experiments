module ToggleComponent exposing (..)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Svg exposing (..)
import Svg.Attributes exposing (..)

main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model = {counter : Int, rectColor : String}


init : Model
init =
  {counter = 0, rectColor = "blue"}



-- UPDATE


type Msg
  = Increment


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      {model | counter = model.counter + 1, rectColor = colorSelector model.counter}

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
        , onClick Increment
        ]
        []
    ]]
  