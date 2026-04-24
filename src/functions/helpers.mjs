/**
 * Sends a MIDI CC message with the specified CC number and value.
 * @param {number} ccNumber - The MIDI CC number to send (0-127).
 * @param {number} ccValue - The MIDI CC value to send (0-127).
 */
export function sendCcValue(ccNumber, ccValue) {
    cc.number = ccNumber;
    cc.value = ccValue;
    cc.send();
}

/**
 * Gets the name of a plugin parameter from its index.
 * @param {number} paramIndex - The index of the plugin parameter.
 * @returns {string} The name of the plugin parameter.
 */
export function getParamNameFromParamIndex(paramIndex) {
    return PluginParameters?.[paramIndex]?.name;
}

/**
 * Converts a boolean value to a MIDI CC value.
 * @param {number} value - The boolean value (0 or 1).
 * @returns {number} The corresponding MIDI CC value (0 or 127).
 */
export function getBooleanCcFromValue(value) {
    return value === 1 ? 127 : 0;
}

/**
 * Randomizes the order of elements in an array.
 * @param {Array} a - The array to randomize.
 * @returns {Array} The randomized array.
 */
export function randomizeArray(a) {
    let b, c, d;
    c = a.length;
    while (c) {
        b = Math.trunc(Math.random() * c--);
        d = a[c];
        a[c] = a[b];
        a[b] = d;
    }
    return a;
}
