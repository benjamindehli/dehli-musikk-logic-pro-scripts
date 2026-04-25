/*************************************/
/* Elektron SidStation               */
/* Editor                            */
/* by: Benjamin Dehli / Dehli Musikk */
/* https://www.dehlimusikk.no/       */
/*************************************/

import { getBooleanCcFromValue, getParamNameFromParamIndex, sendCcValue } from "../../functions/helpers.mjs";

const cc = new ControlChange();

const PluginParameters: ScripterPluginParameter[] = [
    {
        name: "Oscillator",
        type: "menu",
        valueStrings: ["Oscillator 1", "Oscillator 2", "Oscillator 3"],
        defaultValue: 0,
        numberOfSteps: 3
    },
    {
        name: "Active",
        type: "menu",
        valueStrings: ["off", "on"],
        defaultValue: 0,
        numberOfSteps: 2
    },
    {
        name: "Pitch",
        type: "text"
    },
    {
        name: "Pitch/Track",
        type: "lin",
        minValue: 0,
        maxValue: 99,
        numberOfSteps: 99,
        defaultValue: 0
    },
    {
        name: "Transpose",
        type: "lin",
        minValue: -24,
        maxValue: 24,
        numberOfSteps: 48,
        defaultValue: 0,
        unit: "Semitones"
    },
    {
        name: "Detune",
        type: "lin",
        minValue: -63,
        maxValue: 63,
        numberOfSteps: 126,
        defaultValue: 0
    },
    {
        name: "Arpeggiator Speed",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "Portamento",
        type: "lin",
        minValue: 0,
        maxValue: 99,
        numberOfSteps: 99,
        defaultValue: 0
    },
    {
        name: "Vibrato Depth",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "Sync",
        type: "menu",
        valueStrings: ["off", "on"],
        defaultValue: 0,
        numberOfSteps: 2
    },
    {
        name: "Ring Mod",
        type: "menu",
        valueStrings: ["off", "on"],
        defaultValue: 0,
        numberOfSteps: 2
    },
    {
        name: "Pulse Width Modulation",
        type: "text"
    },
    {
        name: "PWM Start",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 63
    },
    {
        name: "PWM Add",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "PWM LFO Depth",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "Envelope",
        type: "text"
    },
    {
        name: "Delay",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "Attack",
        type: "lin",
        minValue: 0,
        maxValue: 15,
        numberOfSteps: 15,
        defaultValue: 0
    },
    {
        name: "Decay",
        type: "lin",
        minValue: 0,
        maxValue: 15,
        numberOfSteps: 15,
        defaultValue: 0
    },
    {
        name: "Sustain",
        type: "lin",
        minValue: 0,
        maxValue: 15,
        numberOfSteps: 15,
        defaultValue: 15
    },
    {
        name: "Release",
        type: "lin",
        minValue: 0,
        maxValue: 15,
        numberOfSteps: 15,
        defaultValue: 0
    }
];

function getPitchCcFromValue(value: number): number {
    const pitchCcValues = [
        0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 20, 21, 22, 23, 24, 26, 27, 28, 30, 31, 32, 34, 35, 36, 37,
        39, 40, 41, 43, 44, 45, 47, 48, 49, 51, 52, 53, 54, 55, 57, 58, 59, 61, 62, 63, 64, 66, 67, 68, 69, 71, 72, 73,
        75, 76, 77, 78, 80, 81, 82, 84, 85, 86, 88, 89, 90, 91, 93, 94, 95, 97, 98, 99, 100, 101, 103, 104, 105, 107,
        108, 109, 111, 112, 113, 114, 116, 117, 118, 120, 121, 122, 123, 125, 126, 127
    ];
    return pitchCcValues[value] ?? 0;
}

function getTransposeCcFromValue(value: number): number {
    const pitchCcValues = [
        0, 2, 4, 7, 10, 12, 15, 18, 20, 23, 26, 28, 31, 34, 36, 39, 42, 44, 47, 50, 52, 55, 58, 60, 63, 65, 68, 71, 73,
        76, 79, 81, 84, 87, 89, 92, 95, 97, 100, 103, 105, 108, 111, 113, 116, 119, 121, 124, 127
    ];
    return pitchCcValues[value + 24] ?? 0;
}

function getEnvelopeCcFromValue(value: number): number {
    const envelopeCcValues = [0, 9, 17, 26, 34, 43, 51, 60, 68, 77, 85, 94, 102, 111, 119, 127];
    return envelopeCcValues[value] ?? 0;
}

function getDetuneCcFromValue(value: number): number {
    return value < -30 ? value + 63 : value + 64;
}

function getArpeggiatorSpeedCcFromValue(value: number): number {
    return value > 0 ? 128 - value : 0;
}

function getOscillatorCcNumberFromParamName(paramName: string): number {
    const oscillator = GetParameter("Oscillator");
    const oscillatorCcNumbers: Record<string, [number, number, number]> = {
        Active: [24, 25, 26],
        "Arpeggiator Speed": [34, 50, 72],
        "Pitch/Track": [35, 51, 73],
        Transpose: [36, 52, 74],
        "Vibrato Depth": [37, 53, 75],
        Detune: [38, 54, 76],
        Portamento: [39, 55, 77],
        Sync: [40, 56, 78],
        "Ring Mod": [41, 57, 79],
        "PWM Start": [42, 58, 80],
        "PWM Add": [43, 59, 81],
        "PWM LFO Depth": [44, 60, 82],
        Delay: [45, 61, 83],
        Attack: [46, 62, 84],
        Decay: [47, 63, 85],
        Sustain: [48, 70, 86],
        Release: [49, 71, 87]
    };
    return oscillatorCcNumbers[paramName][oscillator];
}

function ParameterChanged(paramIndex: number, value: number): void {
    const paramName = getParamNameFromParamIndex(paramIndex);
    if (!paramName) return;
    switch (paramName) {
        case "Active":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getBooleanCcFromValue(value));
            break;
        case "Pitch/Track":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getPitchCcFromValue(value));
            break;
        case "Transpose":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getTransposeCcFromValue(value));
            break;
        case "Detune":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getDetuneCcFromValue(value));
            break;
        case "Arpeggiator Speed":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getArpeggiatorSpeedCcFromValue(value));
            break;
        case "Portamento":
        case "Vibrato Depth":
        case "PWM Start":
        case "PWM Add":
        case "PWM LFO Depth":
        case "Delay":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), value);
            break;
        case "Sync":
        case "Ring Mod":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getBooleanCcFromValue(value));
            break;
        case "Attack":
        case "Decay":
        case "Sustain":
        case "Release":
            sendCcValue(getOscillatorCcNumberFromParamName(paramName), getEnvelopeCcFromValue(value));
            break;
        default:
    }
}
