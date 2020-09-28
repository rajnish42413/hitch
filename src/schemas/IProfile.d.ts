  export interface IDetail {
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
      workplace?: any;
  }

  export interface IImage {
      id: number;
      entity_id: number;
      entity: string;
      thumb?: any;
      small?: any;
      medium?: any;
      large?: any;
      original: string;
      caption: string;
      index?: any;
      default: number;
      status: number;
      created_at: string;
  }

  export interface IMember {
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
      created_at?: any;
      updated_at?: any;
      gender?: any;
  }

  export interface IPreference {
      id: number;
      user_id: number;
      location: string;
      community: string;
      height: number;
      marital_status: string;
      max_education: string;
      college_name?: any;
      designation?: any;
      salary_range?: any;
      date_of_birth?: any;
      other?: any;
      status: number;
      created_at?: any;
      updated_at?: any;
      min_age:number;
      max_age:number
  }

  export interface IProfile {
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
      gender: string;
      detail: IDetail;
      media?: IImage[];
      members?: IMember[];
      preference?: IPreference;
      image?:IImage;
  }


