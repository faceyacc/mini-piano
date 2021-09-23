import { KeyboardWithInstrument } from "../Keyboard/WithInstrument";
import { NoAudioMessage } from "../NoAudioMessage/NoAudioMessage";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";

export const Main = () => {
    const AudioContext = useAudioContext()
    return !!AudioContext ? ( <KeyboardWithInstrument /> ) : ( <NoAudioMessage />)
}