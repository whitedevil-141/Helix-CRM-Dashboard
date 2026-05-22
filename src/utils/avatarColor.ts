const AVATAR_PALETTES: Record<string, string> = {
  SK: '#475569',
  MO: '#6B7280',
  AR: '#525B6E',
  DV: '#5C6776',
};

export function avatarColor(initials: string): string {
  return AVATAR_PALETTES[initials] || 'var(--card-hover)';
}
