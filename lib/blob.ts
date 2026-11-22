const BLOB_RADIUS_FRAMES = [
  "72% 28% 68% 32% / 30% 70% 34% 66%",
  "26% 74% 34% 66% / 68% 30% 70% 32%",
  "78% 22% 42% 58% / 36% 64% 28% 72%",
  "38% 62% 24% 76% / 74% 26% 62% 38%",
  "66% 34% 76% 24% / 28% 72% 46% 54%",
];

export const BLOB_RADIUS_KEYFRAMES = [...BLOB_RADIUS_FRAMES, BLOB_RADIUS_FRAMES[0]];

export function rotateBlobKeyframes(index: number): string[] {
  const offset = index % BLOB_RADIUS_FRAMES.length;
  const rotated = [...BLOB_RADIUS_FRAMES.slice(offset), ...BLOB_RADIUS_FRAMES.slice(0, offset)];
  return [...rotated, rotated[0]];
}

const LIQUID_RADIUS_FRAMES = [
  "64% 36% 58% 42% / 40% 60% 36% 64%",
  "38% 62% 44% 56% / 62% 38% 60% 40%",
  "56% 44% 36% 64% / 42% 58% 66% 34%",
  "66% 34% 60% 40% / 58% 42% 38% 62%",
  "36% 64% 52% 48% / 66% 34% 48% 52%",
  "60% 40% 66% 34% / 36% 64% 58% 42%",
  "42% 58% 38% 62% / 54% 46% 34% 66%",
  "34% 66% 62% 38% / 60% 40% 64% 36%",
];

export function liquidBlobKeyframes(index: number): string[] {
  const offset = index % LIQUID_RADIUS_FRAMES.length;
  const rotated = [...LIQUID_RADIUS_FRAMES.slice(offset), ...LIQUID_RADIUS_FRAMES.slice(0, offset)];
  return [...rotated, rotated[0]];
}

export const liquidBlobTransition = {
  duration: 6.5,
  repeat: Infinity,
  ease: [0.45, 0.05, 0.55, 0.95] as [number, number, number, number],
};
