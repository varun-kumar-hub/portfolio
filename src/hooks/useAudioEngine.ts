import { useRef, useEffect, useCallback } from 'react';

/**
 * Procedural ambient audio engine using Web Audio API.
 * Generates deep space drones that evolve with playback progress.
 * No external audio files required.
 */
export function useAudioEngine(isActive: boolean, progress: number) {
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const noiseGainRef = useRef<GainNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const startedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master gain
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    gainRef.current = masterGain;

    // Deep bass drone — oscillator 1 (sine, 42Hz)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 42;
    const osc1Gain = ctx.createGain();
    osc1Gain.gain.value = 0.35;
    osc1.connect(osc1Gain);
    osc1Gain.connect(masterGain);
    osc1.start();
    osc1Ref.current = osc1;

    // Sub-harmonic — oscillator 2 (sine, 28Hz)
    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 28;
    const osc2Gain = ctx.createGain();
    osc2Gain.gain.value = 0.2;
    osc2.connect(osc2Gain);
    osc2Gain.connect(masterGain);
    osc2.start();
    osc2Ref.current = osc2;

    // Filtered noise for atmospheric texture
    const bufferSize = ctx.sampleRate * 4;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Low-pass filter for dark atmospheric feel
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    filter.Q.value = 1;

    const nGain = ctx.createGain();
    nGain.gain.value = 0.08;

    noiseSource.connect(filter);
    filter.connect(nGain);
    nGain.connect(masterGain);
    noiseSource.start();

    noiseSourceRef.current = noiseSource;
    noiseGainRef.current = nGain;
  }, []);

  // Start audio on first hold
  useEffect(() => {
    if (isActive && !startedRef.current) {
      initAudio();
    }
  }, [isActive, initAudio]);

  // Control volume based on hold state
  useEffect(() => {
    const gain = gainRef.current;
    const ctx = ctxRef.current;
    if (!gain || !ctx) return;

    const targetVolume = isActive ? 0.25 : 0;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setTargetAtTime(targetVolume, ctx.currentTime, isActive ? 0.8 : 0.5);
  }, [isActive]);

  // Evolve sound based on progress
  useEffect(() => {
    const osc1 = osc1Ref.current;
    const osc2 = osc2Ref.current;
    const ctx = ctxRef.current;
    if (!osc1 || !osc2 || !ctx) return;

    // Slowly shift drone frequency as journey progresses
    // Galaxy section: deep and dark (40Hz)
    // Earth section: slightly warmer (50Hz)
    // Tech world: richer (55Hz)
    const freq1 = 40 + progress * 18;
    const freq2 = 26 + progress * 12;

    osc1.frequency.setTargetAtTime(freq1, ctx.currentTime, 0.5);
    osc2.frequency.setTargetAtTime(freq2, ctx.currentTime, 0.5);
  }, [progress]);

  // Cleanup
  useEffect(() => {
    return () => {
      const ctx = ctxRef.current;
      if (ctx) {
        ctx.close();
      }
    };
  }, []);
}
