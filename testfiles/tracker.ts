import Analytics from 'analytics-sdk';
import { User } from '../types';

// VIOLATION 4: Tracking initialized before consent check
// This likely drops cookies immediately upon load
const tracker = new Analytics({
  writeKey: 'UA-123456-78',
  autoTrack: true, // Captures pageviews and device fingerprints automatically
  captureUncaughtExceptions: true
});

export function identifyUser(user: User) {
  // Linking session to PII
  tracker.identify(user.id, {
    email: user.email,
    location: user.location,
    device: navigator.userAgent
  });
}

export function trackEvent(name: string, props: any) {
  tracker.track(name, props);
}