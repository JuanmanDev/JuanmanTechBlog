declare global {
  interface Window {
    umami?: {
      track: (eventName: string | ((props: any) => any), eventData?: Record<string, any>) => void;
    };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    // A SOLID approach: attach a single global listener to bubble up interactions
    // This avoids repeating code (DRY) and captures all interactive elements.
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Polymorphic behavior: handle different types of interactions based on the element
      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], [tabindex="0"]');
      
      if (interactiveEl && window.umami) {
        let eventName = 'interaction';
        const eventData: Record<string, string> = {
          tag: interactiveEl.tagName.toLowerCase(),
          path: window.location.pathname
        };

        // Determine specific event types
        if (interactiveEl.tagName === 'A') {
          const href = (interactiveEl as HTMLAnchorElement).href;
          eventName = 'click_link';
          eventData.href = href;
          eventData.text = interactiveEl.textContent?.trim().substring(0, 30) || '';
        } else if (interactiveEl.tagName === 'BUTTON') {
          eventName = 'click_button';
          eventData.text = interactiveEl.textContent?.trim().substring(0, 30) || '';
        } else {
          eventName = `click_${interactiveEl.tagName.toLowerCase()}`;
        }

        if (interactiveEl.id) {
          eventData.id = interactiveEl.id;
        }

        // Fire the tracking event gracefully
        window.umami.track(eventName, eventData);
      }
    }, { capture: true, passive: true });
  });
});
