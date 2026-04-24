/*************************************/
/* DigiTech Whammy                   */
/* MIDI Note to Whammy Pitch         */
/* by: Benjamin Dehli / Dehli Musikk */
/* https://www.dehlimusikk.no/       */
/*************************************/

const cc = new ControlChange();
const pc = new ProgramChange();
let mode;

const PluginParameters = [
    {
        name: "DigiTech Whammy",
        type: "text"
    },
    {
        name: "Mode",
        type: "menu",
        valueStrings: ["Classic", "Chords"],
        defaultValue: 0,
        numberOfSteps: 2
    }
];


function getMidiDataForWhammy(pitch, mode) {
    const convertedNoteValues = [
        [127, 124, 120, 117, 113, 109, 106, 102, 99, 95, 92, 88], // DIVE BOMB
        [127, 122, 116, 111, 106, 101, 95, 90, 85, 79, 74, 69], // 2 OCT DOWN
        [127, 116, 106, 95, 85], // 1 OCT DOWN
        [127, 109], // 5TH DOWN
        [127, 102, 76], // 4TH DOWN
        [127, 63, 0], // 2ND DOWN
        [25, 51, 76, 102, 127], //4TH UP
        [109, 127], // 5TH UP
        [85, 95, 106, 116, 127], // 1 OCT UP
        [69, 74, 79, 85, 90, 95, 101, 106, 111, 116, 122, 127] // 2 OCT UP
    ];

    // Define pitch ranges and their corresponding data
    const pitchMappings = [
        { min: 12, max: 23, idx: 0, prog: [9, 51] },
        { min: 24, max: 35, idx: 1, prog: [8, 50] },
        { min: 36, max: 40, idx: 2, prog: [7, 49] },
        { min: 41, max: 42, idx: 3, prog: [6, 48] },
        { min: 43, max: 45, idx: 4, prog: [5, 47] },
        { min: 46, max: 48, idx: 5, prog: [4, 46] },
        { min: 49, max: 53, idx: 6, prog: [3, 45] },
        { min: 54, max: 55, idx: 7, prog: [2, 44] },
        { min: 56, max: 60, idx: 8, prog: [1, 43] },
        { min: 61, max: 72, idx: 9, prog: [0, 42] }
    ];

    if (pitch < 12 || pitch > 72) {
        return null;
    }

    for (const element of pitchMappings) {
        const mapping = element;
        if (pitch >= mapping.min && pitch <= mapping.max) {
            return {
                program: mode === 1 ? mapping.prog[1] : mapping.prog[0],
                value: convertedNoteValues[mapping.idx][pitch - mapping.min]
            };
        }
    }
    return null;
}

function sendMidiDataToWhammy(midiData, event) {
    // Program Change
    pc.number = midiData.program;
    pc.send();

    // Control Change
    cc.number = 11;
    cc.value = midiData.value;
    cc.channel = event.channel;
    cc.send();
}

function ParameterChanged(param, value) {
    if (param === 1) mode = value;
}

function HandleMIDI(event) {
    event.send();
    if (event instanceof Note) {
        const midiData = getMidiDataForWhammy(event.pitch, mode);
        if (midiData) {
            sendMidiDataToWhammy(midiData, event);
        }
    }
}
