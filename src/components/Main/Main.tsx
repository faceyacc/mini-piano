import { Playground } from "../Playground/Playground";
import { NoAudioMessage } from "../NoAudioMessage/NoAudioMessage";
import { useAudioContext } from "../AudioContextProvider/useAudioContext";

export const Main = () => {
    const AudioContext = useAudioContext()
    return !!AudioContext ? ( <Playground /> ) : ( <NoAudioMessage />)
}
