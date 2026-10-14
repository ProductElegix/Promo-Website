import Script from "next/script";

/**
 * Google Analytics 4 with Consent Mode v2: everything starts denied; the cookie banner
 * (ClarityConsent) grants analytics_storage on "Accept". Ads storage stays denied.
 * Vercel deployments only. Measurement ID from NEXT_PUBLIC_GA_ID.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-5Y9ZCDNZNL";

export function GoogleAnalytics() {
  if (!process.env.VERCEL_ENV) return null;
  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
try{if(localStorage.getItem('elegix_cookie_consent')==='yes'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}
gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
      <Script id="ga-gtag" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    </>
  );
}
