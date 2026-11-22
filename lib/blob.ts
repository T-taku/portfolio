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
