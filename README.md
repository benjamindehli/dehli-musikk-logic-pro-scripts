# Dehli Musikk: Logic Pro Scripts

Logic Pro Scripter plugin scripts for controlling MIDI data. Published to npm as compiled `.pst` preset files ready to load in Logic Pro's Scripter MIDI plugin.

## Package

```text
@benjamindehli/dehli-musikk-logic-pro-scripts
```

## Scripts

### Chase Bliss Audio & Meris CXM 1978 — Editor

Controls the CXM 1978 reverb pedal via MIDI CC. Exposes all hardware parameters as Scripter controls:

- **Faders:** BASS, MIDS, CROSS, TREBLE, MIX, PRE-DLY
- **Arcade Buttons:** TYPE (Room/Plate/Hall), DIFFUSION (Low/Medium/High), TANK MOD (Low/Medium/High), CLOCK (HiFi/Standard/LoFi)
- ACTIVE toggle (on/off)

### DigiTech Whammy — MIDI Note to Whammy Pitch

Converts incoming MIDI notes to Program Change + CC 11 (expression) messages for the DigiTech Whammy pedal. Maps MIDI pitch ranges to the corresponding Whammy effect preset and pitch bend value.

- **Mode:** Classic or Chords

### Elektron SidStation — Editor

Controls SidStation oscillator parameters via MIDI CC.

- **Pitch:** Pitch/Track, Transpose, Detune, Arpeggiator Speed, Portamento, Vibrato Depth, Sync, Ring Mod
- **PWM:** PWM Start, PWM Add, PWM LFO Depth
- **Envelope:** Delay, Attack, Decay, Sustain, Release

### Elektron SidStation — MIDI Note to Oscillator Pitch

Routes MIDI notes to a specific SidStation oscillator, with optional muting of inactive oscillators.

### Omni-84 — Strumplate

Simulates strumming by spreading an incoming chord across time. Configurable strum speed, note range, direction, and order.

## Development

```bash
npm install
npm run build   # compiles src/scripts/**/*.{ts, mts} → build/**/*.pst
```
