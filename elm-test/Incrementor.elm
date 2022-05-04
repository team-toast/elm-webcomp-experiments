port module Incrementor exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--


import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)



-- MAIN


main =
  Browser.element 
  { init = init
  , update = update
  , view = view
  , subscriptions = subscriptions }


-- PORTS

port receiveIncrement : (Int -> msg) -> Sub msg


-- MODEL


type alias Model = Int

init : () -> ( Model, Cmd Msg )
init flags = ( 0, Cmd.none )

subscriptions : Model -> Sub Msg
subscriptions model =
    receiveIncrement ReceiveIncrement
-- UPDATE

type Msg
  = Increment Int
  | Decrement Int
  | ResetCounter Int
  | ReceiveIncrement Int


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
  case msg of
    Increment _ ->
      (model + 1, Cmd.none)

    Decrement _ ->
      (model - 1, Cmd.none)

    ResetCounter _ ->
      (model - model, Cmd.none)

    ReceiveIncrement _ ->
      (model + 7, Cmd.none)



-- VIEW


view : Model -> Html Msg
view model =
  div []
    [ button [ onClick (Decrement 1)] [ text "-" ]
    , div [] [ text (String.fromInt model) ]
    , button [ onClick (Increment 1)] [ text "+" ]
    , button [ onClick (ResetCounter 1)] [ text "Reset" ]
    ]