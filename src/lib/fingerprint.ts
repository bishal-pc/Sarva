'use client';

/**
 * Generates a stable-ish fingerprint for the device based on browser attributes.
 * This is used to discourage multiple entries in the simulation without requiring accounts.
 */
export async function getDeviceFingerprint(): Promise<string> {
  if (typeof window === 'undefined') return 'server';

  const components = [
    window.navigator.userAgent,
    window.screen.width,
    window.screen.height,
    window.navigator.language,
    new Date().getTimezoneOffset(),
    window.navigator.hardwareConcurrency || 'unknown',
    // @ts-ignore - some browsers support deviceMemory
    window.navigator.deviceMemory || 'unknown',
  ].join('|');

  const encoder = new TextEncoder();
  const data = encoder.encode(components);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

export function getMonthYearKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}`;
}
