import { Optional } from "./types"

// Returns window audio based on user's browser.
export function accessContext(): Optional<AudioContextType> {
    return window.AudioContext || window.webkitAudioContext || null
}