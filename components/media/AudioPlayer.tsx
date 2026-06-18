'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface AudioPlayerProps {
  src: string;
  title?: string;
  artist?: string;
  coverUrl?: string;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function AudioPlayer({ src, title = 'Unknown Track', artist, coverUrl }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);

    audio.volume = volume;

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
    };
  }, [src, volume]);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) audioRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(duration, audio.currentTime + seconds));
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="overflow-hidden bg-white dark:bg-black brutal-border brutal-shadow mb-6 transition-colors">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Cover Art + Track Info */}
      <div className="flex items-center gap-5 p-6 border-b-[3px] border-black dark:border-white transition-colors">
        <div className="relative flex-shrink-0 h-20 w-20 bg-[#facc15] brutal-border flex items-center justify-center overflow-hidden">
          {coverUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverUrl} alt={title} className="h-full w-full object-cover" />
          ) : (
            <span className="font-mono text-4xl font-black text-black leading-none">[♫]</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-black dark:text-white uppercase text-xl truncate">{title}</h3>
          {artist && <p className="font-bold text-gray-700 dark:text-gray-300 truncate">{artist}</p>}
          <p className="font-mono text-sm text-black dark:text-white mt-2 font-bold">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
      </div>

      {/* Progress Bar & Controls */}
      <div className="bg-[#e4e4e7] dark:bg-zinc-800 p-4 flex flex-col gap-4 transition-colors">
        {/* Progress Bar */}
        <div
          ref={progressRef}
          onClick={handleProgressClick}
          className="h-6 w-full cursor-pointer brutal-border bg-white dark:bg-black relative overflow-hidden transition-colors"
          role="slider"
          aria-label="Audio progress"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-black dark:bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls & Volume */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => skip(-10)}
              className="px-3 py-2 brutal-border bg-white dark:bg-black text-black dark:text-white hover:bg-[#fde047] dark:hover:bg-[#fde047] dark:hover:text-black brutal-shadow brutal-shadow-hover transition-all flex items-center justify-center"
              aria-label="Rewind 10 seconds"
            >
              <span className="font-mono text-lg font-black leading-none">[⏮]</span>
            </button>

            <button
              id="audio-play-btn"
              onClick={togglePlay}
              disabled={isLoading}
              className="flex h-12 w-12 items-center justify-center bg-[#4ade80] text-black brutal-border brutal-shadow brutal-shadow-hover transition-all hover:bg-[#22c55e] disabled:opacity-50"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isLoading ? (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : isPlaying ? (
                <span className="font-mono text-xl font-black leading-none">[⏸]</span>
              ) : (
                <span className="font-mono text-xl font-black leading-none pl-1">[▶]</span>
              )}
            </button>

            <button
              onClick={() => skip(10)}
              className="px-3 py-2 brutal-border bg-white dark:bg-black text-black dark:text-white hover:bg-[#fde047] dark:hover:bg-[#fde047] dark:hover:text-black brutal-shadow brutal-shadow-hover transition-all flex items-center justify-center"
              aria-label="Skip 10 seconds"
            >
              <span className="font-mono text-lg font-black leading-none">[⏭]</span>
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="px-3 py-2 brutal-border bg-white dark:bg-black text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black brutal-shadow brutal-shadow-hover transition-all flex items-center justify-center"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <span className="font-mono text-lg font-black leading-none">[🔇]</span>
              ) : (
                <span className="font-mono text-lg font-black leading-none">[🔊]</span>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="h-3 w-24 cursor-pointer appearance-none bg-white dark:bg-black brutal-border accent-black dark:accent-white"
              aria-label="Volume"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
