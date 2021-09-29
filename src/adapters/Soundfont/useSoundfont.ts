import { useState, useRef } from "react";
import Soundfont, { InstrumentName, Player } from "soundfont-player";
import { MidiValue } from "../../domain/notes";
import { Optional } from  "../../domain/types"
import {
  AudioNodesRegistry,
  DEFAULT_INSTRUMENT
} from "../../domain/sound"

type Settings = {
    AudioContext: AudioContextType
}

interface Adapted {
    loading: boolean,
    current: Optional<InstrumentName>

    load(instrument?: InstrumentName): Promise<void>
    play(note: MidiValue): Promise<void>
    stop(note: MidiValue): Promise<void>
}

export function useSoundfont({ AudioContext }: Settings): Adapted {
    // Handles active keys being played
    // Update registry using local variable instead local state so that
    // components do not re-render when user plays different notes. 
    let activeNodes: AudioNodesRegistry = {}

    const [current, setCurrent] = useState<Optional<InstrumentName>>(null)
    const [loading, setLoading] = useState<boolean>(false)

    // Represents a Soundfont player instance
    const [player, setPlayer] = useState<Optional<Player>>() 
    const audio = useRef(new AudioContext())

    // Checks what state audio is in.
    async function resume() {
        return audio.current.state === "suspended" ? await audio.current.resume() : Promise.resolve()       
    }

    // Loads instrument's sound
    async function load(instrument:InstrumentName = DEFAULT_INSTRUMENT) {
    setLoading(true)
    const player = await Soundfont.instrument(audio.current, instrument)
    setLoading(false)
    setCurrent(instrument)
    setPlayer(player)
    
    }

    async function play(note: MidiValue) {
        await resume()
        if(!player) return

        const node = player.play(note.toString())
        // updates keys being played
        activeNodes = { ...activeNodes, [note]: node }
    }

    async function stop(note: MidiValue) {
        await resume()
        if(!activeNodes[note]) return

        activeNodes[note]!.stop()
        activeNodes = { ...activeNodes, [note]:null }
    }

    return { loading, current, load, play, stop }

}
