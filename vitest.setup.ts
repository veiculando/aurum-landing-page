import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

// jsdom doesn't implement canvas 2D context. Hero.tsx draws a decorative
// animated background on a <canvas> that isn't relevant to text/DOM
// assertions, so stub it out to avoid "not implemented" crashes.
HTMLCanvasElement.prototype.getContext = vi.fn(() => {
  const gradient = { addColorStop: vi.fn() };
  return {
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    createLinearGradient: vi.fn(() => gradient),
    createRadialGradient: vi.fn(() => gradient),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    ellipse: vi.fn(),
  };
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

window.HTMLElement.prototype.scrollIntoView = vi.fn();
