import type { ConfirmConfig } from '@/types';

export const HELIX_EVENTS = {
  NEW_DEAL: 'helix:new-deal',
  NEW_CONTACT: 'helix:new-contact',
  NEW_EVENT: 'helix:new-event',
  NEW_AUTOMATION: 'helix:new-automation',
  COMPOSE: 'helix:compose',
  OPENPALETTE: 'helix:openpalette',
  TOAST: 'helix:toast',
  CONFIRM: 'helix:confirm',
  OPEN_AI: 'helix:open-ai',
} as const;

export function dispatchNewDeal(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.NEW_DEAL));
}

export function dispatchNewContact(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.NEW_CONTACT));
}

export function dispatchNewEvent(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.NEW_EVENT));
}

export function dispatchNewAutomation(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.NEW_AUTOMATION));
}

export function dispatchCompose(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.COMPOSE));
}

export function dispatchOpenPalette(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.OPENPALETTE));
}

export function dispatchToast(message: string): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.TOAST, { detail: message }));
}

export function dispatchConfirm(config: ConfirmConfig): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.CONFIRM, { detail: config }));
}

export function dispatchOpenAI(): void {
  window.dispatchEvent(new CustomEvent(HELIX_EVENTS.OPEN_AI));
}
