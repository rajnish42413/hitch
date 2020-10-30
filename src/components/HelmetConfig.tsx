import React from 'react';
import { Helmet } from 'react-helmet';
import SEOURL from '../constants/seoURL.json';
export default function HelmetConfig() {
  let url = window.location.pathname;
  // let domain = window.location.href;
  let tags: any;
  tags = {
    PageName: 'Pakki Jodi',
    URLs: 'https://pakkijodi.com/',
    Title: 'Pakki Jodi',
    MetaKeywords: 'Matrimony, Marriage, Free Matrimonial Sites, Match Making',
    MetaDescription: `New Age Indian matrimony site. Best Profiles, 3-level profile check, Privacy control & Register FREE! ‘Let's get you married’ Now`,
    CanonicalTag: 'https://pakkijodi.com/',
    RobotTag: 'noindex nofollow',
    alternateHreflangTag: 'https://pakkijodi.com/',
  };
  SEOURL.filter((element: any, i: number) => {
    let urltobematched = element.URLs.replace('https://pakkijodi.com/', '/');
    urltobematched = urltobematched.replace(/^[/]+|[/]+$/g, '');
    url = url.replace(/^[/]+|[/]+$/g, '');

    if (urltobematched === url) {
      console.log('urlMatched', urltobematched, url);
      tags = element;
    }

    return true;
  });
  console.log('urlReturned', tags, url);
  return (
    <Helmet>
      <title>{tags.Title}</title>
      <meta name="keywords" content={tags.MetaKeywords} />
      <meta name="description" content={tags.MetaDescription} />
      <link rel="canonical" href={tags.CanonicalTag} />
      <link rel="alternate" hrefLang="en-us" href={tags.alternateHreflangTag} />
      {/* <meta name="robots" content={tags.RobotTag} /> */}
      <meta name="robots" content="noindex nofollow" />
      <meta name="robots" content="noindex nofollow" />

    <meta property="og:type" content="website" />
    <meta property="og:url" content={tags.CanonicalTag} />
    <meta property="og:title" content={tags.Title} />
    <meta property="og:description" content={tags.MetaDescription} />

 
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={tags.CanonicalTag} />
    <meta property="twitter:title" content={tags.Title} />
    <meta property="twitter:description" content={tags.MetaDescription} />
    <meta property="twitter:image" content="" />
    </Helmet>
  );
}
