/* Google tag (gtag.js) bootstrap. Kept in an external file so it passes the
   site's Content-Security-Policy (no inline scripts allowed).

   Consent first (UK GDPR / PECR): every storage type starts "denied", so no
   analytics cookies are set until the visitor presses Accept on the cookie
   banner (built in main.js). Their choice is remembered in localStorage under
   "dhr-consent" and re-applied here on every page before the tag configures. */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  wait_for_update: 500
});
try {
  if (localStorage.getItem('dhr-consent') === 'granted') {
    gtag('consent', 'update', { analytics_storage: 'granted' });
  }
} catch (e) {}
gtag('js', new Date());
gtag('config', 'G-6JWVPTLTY3');

/* Enquiry forms redirect to /thanks after a successful send, so a view of
   that page is a completed enquiry. Fire a GA4 "generate_lead" event there;
   mark it as a conversion in Google Ads / GA4. */
if (/^\/thanks(\.html)?\/?$/.test(window.location.pathname)) {
  gtag('event', 'generate_lead', { event_category: 'enquiry', event_label: document.referrer || 'direct' });
}
