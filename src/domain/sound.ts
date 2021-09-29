import { InstrumentName, Player } from "soundfont-player"
import { MidiValue } from "./notes"
import { Optional } from "./types"

export const DEFAULT_INSTRUMENT: InstrumentName = "acoustic_grand_piano"

// Handles every musical operation to peform.
export type AudioNodesRegistry = Record<MidiValue, Optional<Player>>