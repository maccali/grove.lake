type ClickEvent = 'listen_click' | 'album_open' | 'universe_open' | 'language_change' | 'navigation_click' | 'menu_toggle' | 'album_preview_close';
type ClickContext = { album?: string; universe?: string; platform?: string; target?: string };

export function analyticsClick(event: ClickEvent, placement: string, context: ClickContext = {}) {
  return {
    'data-analytics-event': event,
    'data-analytics-placement': placement,
    'data-analytics-album': context.album,
    'data-analytics-universe': context.universe,
    'data-analytics-platform': context.platform,
    'data-analytics-target': context.target,
  };
}

export function analyticsScript(id: string) {
  return `
    (() => {
      window.dataLayer = window.dataLayer || [];
      window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };

      const [language, collection, slug] = window.location.pathname.split('/').filter(Boolean);
      const pageContext = {
        site_language: language,
        page_type: collection === 'universes' ? 'universe' : collection === 'albums' ? 'release' : 'home',
      };
      if (collection === 'universes' && slug) pageContext.universe = slug;
      if (collection === 'albums' && slug) pageContext.album = slug;

      window.gtag('js', new Date());
      window.gtag('config', ${JSON.stringify(id)}, {
        ...pageContext,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });

      function trackClick(event) {
        if (event.type === 'auxclick' && event.button !== 1) return;
        if (!(event.target instanceof Element)) return;
        const control = event.target.closest('[data-analytics-event]');
        if (!control) return;
        const values = control.dataset;
        const parameters = { ...pageContext, placement: values.analyticsPlacement };
        if (values.analyticsAlbum) parameters.album = values.analyticsAlbum;
        if (values.analyticsUniverse) parameters.universe = values.analyticsUniverse;
        if (values.analyticsPlatform) parameters.platform = values.analyticsPlatform;
        if (values.analyticsTarget) parameters.target = values.analyticsTarget;
        if (values.analyticsEvent === 'language_change') {
          if (values.analyticsTarget === language) return;
          parameters.target_language = values.analyticsTarget;
        }
        window.gtag('event', values.analyticsEvent, parameters);
      }

      document.addEventListener('click', trackClick, true);
      document.addEventListener('auxclick', trackClick, true);

      const thresholds = [25, 50, 75, 90];
      let nextThreshold = 0;
      let scheduled = false;
      window.addEventListener('scroll', () => {
        if (scheduled || nextThreshold === thresholds.length || window.scrollY <= 0) return;
        scheduled = true;
        window.requestAnimationFrame(() => {
          scheduled = false;
          const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
          if (scrollRange <= 0) return;
          const progress = 100 * window.scrollY / scrollRange;
          while (nextThreshold < thresholds.length && progress >= thresholds[nextThreshold]) {
            const scrollPercent = thresholds[nextThreshold++];
            window.gtag('event', 'scroll_depth', { ...pageContext, scroll_percent: scrollPercent });
          }
        });
      }, { passive: true });
    })();
  `;
}
