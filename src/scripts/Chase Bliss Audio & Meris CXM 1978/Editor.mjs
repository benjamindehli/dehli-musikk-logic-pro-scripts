/**************************************/
/* Chase Bliss Audio & Meris CXM 1978 */
/* Editor                             */
/* by: Benjamin Dehli / Dehli Musikk  */
/* https://www.dehlimusikk.no/        */
/**************************************/

import { getParamNameFromParamIndex, sendCcValue } from "../../functions/helpers.mjs";

const cc = new ControlChange();

const PluginParameters = [
    {
        name: "ACTIVE",
        type: "menu",
        valueStrings: ["off", "on"],
        defaultValue: 1,
        numberOfSteps: 2
    },
    {
        name: "Faders",
        type: "text"
    },
    {
        name: "BASS",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 63
    },
    {
        name: "MIDS",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 63
    },
    {
        name: "CROSS",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 63
    },
    {
        name: "TREBLE",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 63
    },
    {
        name: "MIX",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 63
    },
    {
        name: "PRE-DLY",
        type: "lin",
        minValue: 0,
        maxValue: 127,
        numberOfSteps: 127,
        defaultValue: 0
    },
    {
        name: "Arcade Buttons",
        type: "text"
    },
    {
        name: "TYPE",
        type: "menu",
        valueStrings: ["Room", "Plate", "Hall"],
        defaultValue: 0,
        numberOfSteps: 3
    },
    {
        name: "DIFFUSION",
        type: "menu",
        valueStrings: ["Low", "Medium", "High"],
        defaultValue: 0,
        numberOfSteps: 3
    },
    {
        name: "TANK MOD",
        type: "menu",
        valueStrings: ["Low", "Medium", "High"],
        defaultValue: 0,
        numberOfSteps: 3
    },
    {
        name: "CLOCK",
        type: "menu",
        valueStrings: ["HiFi", "Standard", "LoFi"],
        defaultValue: 0,
        numberOfSteps: 3
    }
];

function getArcadeButtonCcFromValue(value) {
    return value + 1;
}

function getCcNumberFromParamName(paramName) {
    const oscillatorCcNumbers = {
        BASS: 14,
        MIDS: 15,
        CROSS: 16,
        TREBLE: 17,
        MIX: 18,
        "PRE-DLY": 19,
        TYPE: 23,
        DIFFUSION: 24,
        "TANK MOD": 25,
        CLOCK: 26,
        ACTIVE: 102
    };
    return oscillatorCcNumbers[paramName];
}

function ParameterChanged(paramIndex, value) {
    const paramName = getParamNameFromParamIndex(paramIndex);
    switch (paramName) {
        case "ACTIVE":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "BASS":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "MIDS":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "CROSS":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "TREBLE":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "MIX":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "PRE-DLY":
            sendCcValue(getCcNumberFromParamName(paramName), value);
            break;
        case "TYPE":
            sendCcValue(getCcNumberFromParamName(paramName), getArcadeButtonCcFromValue(value));
            break;
        case "DIFFUSION":
            sendCcValue(getCcNumberFromParamName(paramName), getArcadeButtonCcFromValue(value));
            break;
        case "TANK MOD":
            sendCcValue(getCcNumberFromParamName(paramName), getArcadeButtonCcFromValue(value));
            break;
        case "CLOCK":
            sendCcValue(getCcNumberFromParamName(paramName), getArcadeButtonCcFromValue(value));
            break;
        default:
    }
}
