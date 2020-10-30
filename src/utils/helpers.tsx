import moment from 'moment';

export const sum = (a: number, b: number): number => a + b;

export function getAge(birthday: any): number {
  return Math.floor(moment(new Date()).diff(moment(birthday, 'DD-MM-YYYY'), 'years', true));
}

export const getHeightFromValue = (value: any) => {
  const height = `${getFeet(value)}.${getInches(value)}`;
  return height;
};

export const getHeightWithLabelFromValue = (h: any) => {
  if (!h) return;
  const dec = (h + '').split('.')[1];
  const height = `${Math.floor(h)}' ${dec}"`;
  return height;
};

export const getValueFromHeight = (value: any) => {
  const dec = +(value + '').split('.')[1];
  const di = Math.floor(value);
  return +(di * 12 + dec);
};

function getFeet(n: number) {
  return Math.floor(n / 12);
}

function getInches(n: number) {
  return n % 12;
}

export const queryfie = (string: string): any => {
  return string
    .slice(1)
    .split('&')
    .map((q) => q.split('='))
    .reduce((a: any, c: any) => {
      a[c[0]] = c[1];
      return a;
    }, {});
};

export function lowerStrings(obj: any) {
  for (let attr in obj) {
    if (typeof obj[attr] === 'string') {
      obj[attr] = obj[attr].toLowerCase();
    } else if (typeof obj[attr] === 'object') {
      lowerStrings(obj[attr]);
    }
  }
}

export function convertToSlug(Text: string) {
  if (!Text) return '';
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function getZodiac(dob: string) {
  const d = new Date(dob);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  var bound = [20, 19, 20, 20, 20, 21, 22, 22, 21, 22, 21, 21];
  var startMonth = [
    'Capricorn',
    'Aquarius',
    'Pisces',
    'Aries',
    'Taurus',
    'Gemini',
    'Cancer',
    'Leo',
    'Virgo',
    'Libra',
    'Scorpio',
    'Sagittarius',
  ];
  let monthIndex = month - 1;
  let signMonthIndex;
  if (day <= bound[monthIndex]) {
    signMonthIndex = monthIndex;
  } else {
    signMonthIndex = (monthIndex + 1) % 12; //mod 12 to loop around to January index.
  }
  return startMonth[signMonthIndex]; //return the Zodiac sign of start Of that month.
}

export const renderTitle = (
  signAs: string,
  returnType:
    | 'profile_title'
    | 'gender_title'
    | 'dob_title'
    | 'city_title'
    | 'community_title'
    | 'height_title'
    | 'm_status'
    | 'workplace_title'
    | 'salary_title'
    | 'designation_title',
  gender: string,
  name?: string
) => {
  let gender_name = '';
  let profile_title = 'Profile created for my';
  let gender_title = '';
  let dob_title = '';
  let city_title = '';
  let community_title = 'What’s your community?';
  let height_title = 'How tall is you';
  let m_status = '';
  let workplace_title = '';
  let designation_title = '';
  let salary_title = '';
  signAs = signAs?.toLocaleLowerCase();
  gender = gender?.toLocaleLowerCase();
  console.log(gender + ' ' + signAs);
  switch (signAs) {
    case 'father':
      if (gender) gender_name = gender === 'female' ? 'daughter' : 'son';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'mother':
      if (gender) gender_name = gender === 'female' ? 'daughter' : 'son';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'brother':
      if (gender) gender_name = gender === 'female' ? 'sister' : 'brother';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'sister':
      if (gender) gender_name = gender === 'female' ? 'sister' : 'brother';
      gender_title = `And my ${gender_name} name is?`;
      dob_title = `What's your ${gender_name} date of birth ?`;
      city_title = `Where does your ${gender_name} live?'`;
      height_title += `r ${gender_name}?`;
      m_status = `What’s your ${gender_name}’s marital status?`;
      workplace_title = `Where is your ${gender_name} working?`;
      designation_title = `And what’s your ${gender_name}’s designation?`;
      salary_title = `And your ${gender_name}’s salary range?`;
      break;
    case 'guardian':
      profile_title = 'Searching for a';
      gender_title = 'And profile display name will be?';
      dob_title = "What's date of birth for profile?";
      city_title = `Where does ${name} live?`;
      community_title = `What’s ${name}’s community?`;
      height_title = `How tall is ${name}?`;
      m_status = `What’s ${name}’s marital status?`;
      workplace_title = `Where is ${name} working?`;
      designation_title = `And what’s ${name}’s designation?`;
      salary_title = `And ${name}’s salary range?`;
      break;
    default:
      profile_title = 'Searching for a';
      gender_title = 'And profile display name will be?';
      dob_title = "What's your date of birth?";
      city_title = `Where do you live?`;
      community_title = 'What’s your community?';
      height_title = 'How tall are you?';
      m_status = 'What’s your marital status?';
      workplace_title = 'Where do you work?';
      designation_title = 'And what’s your designation?';
      salary_title = `And your salary range?`;
      break;
  }
  if (returnType === 'profile_title') return profile_title;
  if (returnType === 'gender_title') return gender_title;
  if (returnType === 'dob_title') return dob_title;
  if (returnType === 'city_title') return city_title;
  if (returnType === 'community_title') return community_title;
  if (returnType === 'height_title') return height_title;
  if (returnType === 'm_status') return m_status;
  if (returnType === 'workplace_title') return workplace_title;
  if (returnType === 'designation_title') return designation_title;
  if (returnType === 'salary_title') return salary_title;
};

export const ArrayIDS = (value: Array<any>): Array<string> => {
  const data = [] as Array<string>;
  if (value?.length) {
    value?.map((i: any) => data.push(i.value));
  }
  return data;
};
