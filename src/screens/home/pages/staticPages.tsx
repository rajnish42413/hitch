import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import PageSkeleton from '../pageSkeleton';
import {
  caste,
  education,
  city,
  ageHeightBride,
  ageHeightGroom,
  proffession,
  intro,
  profileDPGroom,
  profileDPBride,
  partner,
} from '../../../constants/seoSearchKeywords.json';
import '../staticPages.less';
import moment from 'moment';

import { Row, Col, Pagination, Button, Divider, Card } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

interface IProfile {
  partner: string;
  age: number;
  height: string;
  ageHeight: string;
  community: string;
  profession: string;
  location: string;
  image_url: string;
  created_at: string;
  intro: string;
  education: string;
}
const renderProfileCard = (profile: IProfile, key: number) => {
  return (
    <div className="card-block-style-1" key={key}>
      <div className="row">
        <div className="col-md-3 border-right">
          <div className="image-block text-center">
            <Link to="/login" className="blured">
              <img src={profile.image_url} alt="img" />
            </Link>
            <p>
              To View you need to <br />
              <Link to="/login">Login/Register</Link>
            </p>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card-body">
            <div className="row">
              <div className="col-md-7">
                <p className="para-style-1">
                  Last Online: {moment(profile.created_at).fromNow()} |{' '}
                  {capitalize(profile.partner)}
                </p>
                <hr className="hr-style-1" />
                <p className="para-style-2">
                  <span className="text-light">Age / Height:</span>
                  <span className="text-style-1">{profile.ageHeight}</span>
                </p>
                <p className="para-style-2">
                  <span className="text-light">Community:</span>
                  <span className="text-style-1">{capitalize(profile.community)}</span>
                </p>
                <p className="para-style-2">
                  <span className="text-light">Education:</span>
                  <span className="text-style-1">{capitalize(profile.education)}</span>
                </p>
                {/* <p className="para-style-2">
                  <span className="text-light">Profession:</span>
                  <span className="text-style-1">{profile.profession}</span>
                </p> */}
                <p className="para-style-2">
                  <span className="text-light">Location:</span>
                  <span className="text-style-1">{capitalize(profile.location)}</span>
                </p>
              </div>
              <div className="col-md-5 text-center">
                <p>
                  <Button type="link" href="/login">
                    View Full Profile
                  </Button>
                </p>
              </div>
            </div>
            <hr className="hr-style-1" />
            <p className="para-style-3">
              {profile.intro}... <Link to="/login">Read More</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function StaticPages(props: any) {
  const [profiles, setlist] = useState([] as Array<any>);
  const [activesearchParam, setSelectedMenu] = useState({
    //community: 'any',
    city: 'any',
    caste: 'any',
    partner: 'any',
    education: 'any',
  });

  const getRandom = (array: any, type: string) => {
    let value = type;
    if (type === 'any') {
      value = array[Math.floor(Math.random() * array.length)];
    }
    return value;
  };
  let ageHeight = (type: any) => {
    let ageHeightArr = [];
    if (type === 'bride') {
      ageHeightArr = ageHeightBride;
    } else {
      ageHeightArr = ageHeightGroom;
    }
    return ageHeightArr;
  };
  let profileDP = (type: any) => {
    let profileDPArr = [];
    if (type === 'bride') {
      profileDPArr = profileDPBride;
    } else {
      profileDPArr = profileDPGroom;
    }
    //console.log(profileDPArr);
    return profileDPArr;
  };
  const { params } = useRouteMatch() as any;
  let activeUrl = '/matrimonials/' + params.pageUrl + '/';
  const history = useHistory();
  let searchKeyword = params.pageUrl || 'default';
  activeUrl = searchKeyword;
  /*
  const searchProfile = (keyword: any) => {
    let searchKeyword = keyword.pageUrl || 'default';
    activeUrl = searchKeyword;
    if (searchKeyword === "") {
      searchKeyword = 'default';
    }
    const profileList: React.SetStateAction<any[]> = [];
    seoURL.filter((element: any) => {
      if (element.url === searchKeyword) {
        for (let i = 0; i < 10; i++) {
          profileList.push({
            "name": "Aggarwal1",
            "ageHeight": getRandom(ageHeight(getRandom(partner, element.partner)), 'any'),
            "community": getRandom(caste, element.caste),
            "profession": getRandom(proffession, 'any'),
            "location": getRandom(city, element.city),
            "image_url": "https://pakki-shadi.s3.us-west-2.amazonaws.com/demoProfiles/" + getRandom(profilePic, 'any'),
            "education": getRandom(education, element.education),
            "intro": getRandom(intro, 'any'),
            "created_at": moment(new Date(+(new Date()) - Math.floor(Math.random() * 10000000000)))
          });
        }
      }
      return true;
    });
    setlist(profileList);
    return false;
  }*/
  const searchProfile = (arrElement: any) => {
    const profileList: React.SetStateAction<any[]> = [];
    for (let i = 0; i < 10; i++) {
      profileList.push({
        partner: getRandom(partner, arrElement.partner.toLowerCase()),
        ageHeight: getRandom(
          ageHeight(getRandom(partner, arrElement.partner.toLowerCase())),
          'any'
        ),
        image_url: 'https://pakki-shadi.s3.us-west-2.amazonaws.com/demoProfiles/' +
          getRandom(profileDP(arrElement.partner.toLowerCase()), 'any'),
        community: getRandom(caste, arrElement.caste.toLowerCase()),
        profession: getRandom(proffession, 'any'),
        location: getRandom(city, arrElement.city.toLowerCase()),
        education: getRandom(education, arrElement.education.toLowerCase()),
        intro: getRandom(intro, 'any'),
        created_at: moment(new Date(+new Date() - Math.floor(Math.random() * 10000000000))),
      });
    }
    setlist(profileList);
    return;
  };
  const navigateUrl = (activesearchParam: any) => {
    let activeUrl = '';
    if (activesearchParam.caste !== 'any') {
      activeUrl += '-' + activesearchParam.caste;
    }
    if (activesearchParam.city !== 'any') {
      activeUrl += '-' + activesearchParam.city;
    }
    if (activesearchParam.education !== 'any') {
      activeUrl += '-' + activesearchParam.education;
    }
    // if (activesearchParam.community !== 'any') {
    //   activeUrl += '-' + activesearchParam.community;
    // }
    switch (activesearchParam.partner) {
      case 'groom':
        activeUrl += '-grooms-boys';
        break;
      case 'bride':
        activeUrl += '-brides-girls';
        break;
      default:
        activeUrl += '-matrimony';
        break;
    }

    activeUrl = activeUrl.toLowerCase();
    activeUrl = activeUrl.replace(/^[-]+|[-]+$/g, '');
    history.push('/matrimonials/' + activeUrl);
  };
  const urlExtration = (url: string) => {
  
    let indexOf = (arr: any, q: string) =>
      arr.findIndex((item: any) => q.toLowerCase() === item.toLowerCase());
    let newstr = url
      .replace('-matrimony', '-all')
      .replace('-brides-girls', '-bride')
      .replace('-grooms-boys', '-groom');
    let arrUrl: any;
    arrUrl = newstr.split('-');
    let activesearchParam = {
      //community: 'any',
      city: 'any',
      caste: 'any',
      partner: 'any',
      education: 'any',
    };

    arrUrl.forEach(function (value: any, i: number) {
      if (indexOf(caste, value) !== -1) {
        activesearchParam.caste = value;
      }
      if (indexOf(city, value) !== -1) {
        activesearchParam.city = value;
      }
      if (indexOf(education, value) !== -1) {
        activesearchParam.education = value;
      }
     /* if (indexOf(community, value) !== -1) {
        activesearchParam.community = value;
      }*/
      if (indexOf(partner, value) !== -1) {
        activesearchParam.partner = value;
      }
    });
    setSelectedMenu(activesearchParam);
    searchProfile(activesearchParam);

    //setSelectedMenu({"community":"Hindu","city":"Delhi","caste":"Gupta","partner":"any","education":"IIM"});

    return;
  };
  useEffect(() => {
    urlExtration(activeUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUrl]);

  const paginationChange = (e: any) => {
    history.replace('/login');
  };

  const ProfileFound = () => {
    return (
      <Row>
        <Col md={24}>
          {profiles?.map((profile: IProfile, i: number) => renderProfileCard(profile, i))}
          <Pagination defaultCurrent={1} onChange={paginationChange} total={50} />
        </Col>
      </Row>
    );
  };

  const RadioMenu = (prop: any) => {
    let defaultOption = prop.defaultOption.toLowerCase();
    const [lookingFor, setLookingFor] = useState('');
    let clickHandler = (searchType: string) => (e: any) => {
      e.preventDefault();
      setLookingFor(searchType);
      activesearchParam.partner = searchType;
      navigateUrl(activesearchParam);
    };
    return (
      <ul className="menu-style-2">
        <li key={'any'} className={lookingFor === 'any' || defaultOption === 'any' ? 'active' : ''}>
          <button type="button" onClick={clickHandler('any')}>
            All
          </button>
        </li>
        <li
          key={'bride'}
          className={lookingFor === 'bride' || defaultOption === 'bride' ? 'active' : ''}
        >
          <button type="button" onClick={clickHandler('bride')}>
            Bride
          </button>
        </li>
        <li
          key={'groom'}
          className={lookingFor === 'groom' || defaultOption === 'groom' ? 'active' : ''}
        >
          <button type="button" onClick={clickHandler('groom')}>
            Groom
          </button>
        </li>
      </ul>
    );
  };
  const DisplayMenu = (prop: any) => {
    let [sideMenu, setSideMenu] = useState('default');
    // let activeLink="";

    let defaultOption = prop.defaultOption.toLowerCase();
    let arrayList = prop.arr;
    let type = prop.type;
    let resetMenu = (searchVal: string) => (e: any) => {
      switch (type) {
        case 'caste':
          activesearchParam.caste = 'any';
          break;
        case 'city':
          activesearchParam.city = 'any';
          break;
        case 'education':
          activesearchParam.education = 'any';
          break;
        case 'community':
         // activesearchParam.community = 'any';
          break;
      }
      setSideMenu(type);
    };
    let dynamicUrl = (searchType: string, searchVal: string) => (e: any) => {
      e.preventDefault();
      switch (type) {
        case 'caste':
          activesearchParam.caste = searchVal;
          break;
        case 'city':
          activesearchParam.city = searchVal;
          break;
        case 'education':
          activesearchParam.education = searchVal;
          break;
        case 'community':
        //  activesearchParam.community = searchVal;
          break;
      }
      setSideMenu(searchType);
      navigateUrl(activesearchParam);
    };

    return (
      <div>
        <h3 className="heading-style-1">
          <span className="title">{prop.title}</span>
          <span className="refreshIcon" onClick={resetMenu(type)}>
            <ReloadOutlined />
          </span>
        </h3>
        <ul className="menu-style-1">
          {arrayList?.map((name: any, i: number) => (
            <li
              key={type + '|' + name}
              className={
                (sideMenu === type + '|' + name || defaultOption === name.toLowerCase()) &&
                  sideMenu !== type
                  ? 'active'
                  : ''
              }
            >
              <button onClick={dynamicUrl(type + '|' + name, name)}>{name}</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <PageSkeleton className="pj-white" defaultLoginModal={false} defaultSideBar={false}>
      
      <div className="container">
        <div className="row">
          <div className="col-md-3 border-right">
            <DisplayMenu
              arr={caste}
              title={'Search By Caste'}
              type={'caste'}
              defaultOption={activesearchParam.caste}
            ></DisplayMenu>
            <DisplayMenu
              arr={city}
              title={'Search By City'}
              type={'city'}
              defaultOption={activesearchParam.city}
            ></DisplayMenu>
            <DisplayMenu
              arr={education}
              title={'Search By Education'}
              type={'education'}
              defaultOption={activesearchParam.education}
            ></DisplayMenu>
            {/* <DisplayMenu
              arr={community}
              title={'Search By Community'}
              type={'community'}
              defaultOption={activesearchParam.community}
            ></DisplayMenu> */}
          </div>
          <div className="col-md-9">
            <div className="text-center">
              <h3 className="heading-style-1">
                <span>Looking For</span>
              </h3>
              <RadioMenu
                type={'all'}
                title={'All'}
                defaultOption={activesearchParam.partner}
              ></RadioMenu>
            </div>
            <Divider orientation="left">Profiles</Divider>
            {/* <div className="banner">
              <img src={banner} className="img-responsive" alt="banner" />
            </div> */}

            {profiles.length === 0 ? (
              <NoProfileFound></NoProfileFound>
            ) : (
                <ProfileFound></ProfileFound>
              )}
          </div>
        </div>
      </div>
      {/* <Footer></Footer> */}
      <Footerdiv></Footerdiv>
    </PageSkeleton>
  );
}
const logo = require('../../../assets/images/pakkijodi-logoH-white.png');
const NoProfileFound = (prop: any) => {
  return (
    <Row>
      <Col md={24}>
        <Card>
          <p className="text-center">No Profile Found</p>
        </Card>
      </Col>
    </Row>
  );
};

const Footerdiv = (prop: any) => {
  return (
    <div className="text-center">
      <Divider />
      <Row>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <div className="header-brand">
            <Link to="/">
              <img src={logo} alt="logo" height="120px" />
            </Link>
          </div>
        </Col>
      </Row>
      <Divider />
    </div>
  );
};
