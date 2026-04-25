import type {
    ControlChange as ControlChangeInstance,
    NoteOn as NoteOnInstance,
    NoteOff as NoteOffInstance,
    Note as NoteInstance,
    ProgramChange as ProgramChangeInstance,
    ChannelPressure as ChannelPressureInstance,
    PolyPressure as PolyPressureInstance,
    PitchBend as PitchBendInstance,
    TargetEvent as TargetEventInstance,
    Event as EventInstance,
    TimingInfo,
    PluginParameter,
    ParameterType
} from "@benjamindehli/logic-pro-scripter-utils";

declare global {
    interface ScripterPluginParameter extends Omit<PluginParameter, "type"> {
        type: ParameterType | "text";
    }

    var ControlChange: {
        new(number?: number, value?: number, channel?: number): ControlChangeInstance;
        prototype: ControlChangeInstance;
    };

    var NoteOn: {
        new(pitch?: number, velocity?: number, channel?: number): NoteOnInstance;
        prototype: NoteOnInstance;
    };

    var NoteOff: {
        new(pitchOrNoteOn?: number | NoteOnInstance, velocity?: number, channel?: number): NoteOffInstance;
        prototype: NoteOffInstance;
    };

    var Note: {
        new(): NoteInstance;
        prototype: NoteInstance;
    };

    var ProgramChange: {
        new(number?: number, channel?: number): ProgramChangeInstance;
        prototype: ProgramChangeInstance;
    };

    var ChannelPressure: {
        new(value?: number, channel?: number): ChannelPressureInstance;
        prototype: ChannelPressureInstance;
    };

    var PolyPressure: {
        new(pitch?: number, value?: number, channel?: number): PolyPressureInstance;
        prototype: PolyPressureInstance;
    };

    var PitchBend: {
        new(value?: number, channel?: number): PitchBendInstance;
        prototype: PitchBendInstance;
    };

    var TargetEvent: {
        new(target?: string, value?: number): TargetEventInstance;
        prototype: TargetEventInstance;
    };

    function GetParameter(name: string): number;
    function SetParameter(name: string, value: number): void;
    function GetTimingInfo(): TimingInfo;
    function Trace(message: unknown): void;

    // Declared globally so helpers.mts can reference them; each script defines its own.
    var cc: ControlChangeInstance;
    var PluginParameters: ScripterPluginParameter[];
}
