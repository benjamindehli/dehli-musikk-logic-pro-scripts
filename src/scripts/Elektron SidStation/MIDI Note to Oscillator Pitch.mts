/*************************************/
/* Elektron SidStation               */
/* MIDI Note to Oscillator Pitch     */
/* by: Benjamin Dehli / Dehli Musikk */
/* https://www.dehlimusikk.no/       */
/*************************************/

import type { Event as EventInstance, NoteOn as NoteOnInstance } from "@benjamindehli/logic-pro-scripter-utils";

const cc = new ControlChange();

const PluginParameters: ScripterPluginParameter[] = [
    {
        name: "SidStation",
        type: "text"
    },
    {
        name: "Oscillator",
        type: "menu",
        valueStrings: ["Off", "o1", "o2", "o3"],
        defaultValue: 0,
        numberOfSteps: 4
    },
    {
        name: "Mute Inactive Oscillator",
        type: "menu",
        valueStrings: ["off", "on"],
        defaultValue: 0,
        numberOfSteps: 2
    }
];

function getConvertedNoteValue(pitch: number): number {
    const convertedNoteValues = [
        1, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 21, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 37,
        39, 40, 41, 43, 44, 45, 47, 48, 49, 51, 52, 53, 54, 55, 57, 58, 59, 61, 62, 63, 64, 66, 67, 68, 69, 71, 72, 73,
        75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 88, 89, 90, 91, 93, 94, 95, 97, 98, 99, 100, 101, 103, 104, 105, 107,
        108, 109, 111, 112, 113, 114, 116, 117, 118, 120, 121, 122, 123, 125, 126, 127, 127, 127, 127, 127, 127, 127,
        127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127, 127
    ];
    return convertedNoteValues[pitch];
}

function getCcNumberForOscillatorPitch(oscillator: number): number | null {
    const oscillatorPitchCcNumbers: (number | null)[] = [null, 35, 51, 73];
    return oscillatorPitchCcNumbers[oscillator] ?? null;
}

function getCcNumberForOscillatorActivation(oscillator: number): number | null {
    const oscillatorCcNumbers: (number | null)[] = [null, 24, 25, 26];
    return oscillatorCcNumbers[oscillator] ?? null;
}

function toggleOscillatorActivation(active: boolean, oscillator: number, event: EventInstance): void {
    const oscillatorActivationCcNumber = getCcNumberForOscillatorActivation(oscillator);
    if (oscillatorActivationCcNumber !== null) {
        cc.number = oscillatorActivationCcNumber;
        cc.value = active ? 127 : 0;
        cc.channel = event.channel;
        cc.send();
    }
}

function activateOscillator(oscillator: number, event: EventInstance): void {
    toggleOscillatorActivation(true, oscillator, event);
}

function deactivateOscillator(oscillator: number, event: EventInstance): void {
    toggleOscillatorActivation(false, oscillator, event);
}

function sendOscillatorPitch(oscillatorPitchCcNumber: number, event: NoteOnInstance): void {
    const convertedNoteValue = getConvertedNoteValue(event.pitch);
    cc.number = oscillatorPitchCcNumber;
    cc.value = convertedNoteValue;
    cc.channel = event.channel;
    cc.send();
}

function HandleMIDI(event: EventInstance): void {
    event.send();
    if (event instanceof Note) {
        const oscillator = GetParameter("Oscillator");
        const oscillatorPitchCcNumber = getCcNumberForOscillatorPitch(oscillator);
        if (oscillatorPitchCcNumber !== null) {
            const muteInactiveOscillator = GetParameter("Mute Inactive Oscillator") === 1;
            if (event instanceof NoteOn) {
                activateOscillator(oscillator, event);
                sendOscillatorPitch(oscillatorPitchCcNumber, event);
            } else if (event instanceof NoteOff) {
                if (muteInactiveOscillator) {
                    deactivateOscillator(oscillator, event);
                }
            }
        }
    }
}
