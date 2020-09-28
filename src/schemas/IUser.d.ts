export interface IImage {
  id: number;
  entity_id: number;
  entity: string;
  thumb: string;
  small: string;
  medium: string;
  large: string;
  original: string;
  caption: string;
  index?: any;
  default: number;
  status: number;
  created_at: string;
}

interface Detail {
  id: number;
  user_id: number;
  city: string;
  latitude?: any;
  longitute?: any;
  community: string;
  height: number;
  marital_status: string;
  max_education: string;
  college_name: string;
  designation?: any;
  salary_range?: any;
  intro: string;
  status: number;
  created_at?: any;
  updated_at?: any;
  gender?: any;
  workspace?: any;
}

interface IProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  date_of_birth: string;
  role: string;
  sub_role: string;
  status: number;
  parent_id?: any;
  gender?: any;
  detail?: Detail;
  media?: IImage[];
  image?: IImage;
  add_members_link: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  date_of_birth: string;
  role: string;
  sub_role: string;
  status: number;
  parent_id: number;
  created_at: Date;
  updated_at: Date;
  gender: string;
  profile: Profile;
}

export interface IUserLogin {
  user: User;
  token: string;
}



export enum UserActionTypes {
  FETCH_USER = '@@user/FETCH_USER',
  FETCH_SUCCESS = '@@user/FETCH_SUCCESS',
  FETCH_ERROR = '@@user/FETCH_ERROR'
}

export interface UserState {
  readonly loading: boolean;
  readonly data: IUserLogin;
  readonly errors?: string;
}