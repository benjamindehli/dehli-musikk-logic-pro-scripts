export function sendCcValue(ccNumber: number, ccValue: number): void {
    cc.number = ccNumber;
    cc.value = ccValue;
    cc.send();
}

export function getParamNameFromParamIndex(paramIndex: number): string | undefined {
    return PluginParameters?.[paramIndex]?.name;
}

export function getBooleanCcFromValue(value: number): 0 | 127 {
    return value === 1 ? 127 : 0;
}
