/* Google tag (gtag.js) bootstrap. Kept in an external file so it passes the
   site's Content-Security-Policy (no inline scripts allowed). */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-6JWVPTLTY3');

/* Enquiry forms redirect to /thanks after a successful send, so a view of
   that page is a completed enquiry. Fire a GA4 "generate_lead" event there;
   mark it as a conversion in Google Ads / GA4. */
if (/^\/thanks(\.html)?\/?$/.test(window.location.pathname)) {
  gtag('event', 'generate_lead', { event_category: 'enquiry', event_label: document.referrer || 'direct' });
}
