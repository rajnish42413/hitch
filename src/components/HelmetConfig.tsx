import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
// import SEOURL from '../constants/seoURL.json';
import { ITag } from '../schemas/ITag.d';

interface IProps {
  appendPageName?: string;
  customeTags?: ITag;
}

export default function HelmetConfig({ appendPageName, customeTags = {} as ITag }: IProps) {
  const logo = 'https://www.pakkijodi.com/static/media/pakkijodi-logoH-white.c42b1e31.png';
  const [tags, setTags] = useState({
    PageName: 'Pakki Jodi',
    URL: 'https://pakkijodi.com/',
    Title: 'Pakki Jodi',
    MetaKeywords: 'Matrimony, Marriage, Free Matrimonial Sites, Match Making',
    MetaDescription: `New Age Indian matrimony site. Best Profiles, 3-level profile check, Privacy control & Register FREE! ‘Let's get you married’ Now`,
    CanonicalTag: 'https://pakkijodi.com/',
    RobotTag: 'noindex nofollow',
    alternateHreflangTag: 'https://pakkijodi.com/',
    image: logo,
  });

  useEffect(() => {
    if (customeTags.Title) setTags(customeTags);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //const handlePageSeoTags = () => {
  // const url = window.location.pathname;
  // SEOURL.filter((element: any, i: number) => {
  //   let urltobematched = element.URLs.replace('https://pakkijodi.com/', '/');
  //   urltobematched = urltobematched.replace(/^[/]+|[/]+$/g, '');
  //   const filteredURL = url.replace(/^[/]+|[/]+$/g, '');
  //   if (urltobematched === filteredURL && element) {
  //     console.log('urlMatched', urltobematched, url);
  //     setTags(element);
  //   }
  //   return true;
  // });
  //};

  return (
    <Helmet>
      <title>{appendPageName ? `${appendPageName} | ${tags.Title}` : tags.Title}</title>
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
      <meta property="og:image" content={logo} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={tags.CanonicalTag} />
      <meta property="twitter:title" content={tags.Title} />
      <meta property="twitter:description" content={tags.MetaDescription} />
      <meta property="twitter:image" content={logo} />

      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.pakkijodi.com/" />
      <meta property="og:title" content={tags.Title} />
      <meta property="og:description" content={tags.MetaDescription} />
      <meta property="og:image" content={logo} />
    </Helmet>
  );
}
