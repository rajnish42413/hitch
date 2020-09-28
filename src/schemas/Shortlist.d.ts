
     interface Image {
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

     interface Member {
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
        created_at?: Date;
        updated_at?: Date;
        gender: string;
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
        designation: string;
        salary_range: string;
        intro: string;
        status: number;
        created_at?: any;
        updated_at?: any;
        gender?: any;
        workplace?:string;
    }

     interface Profile {
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
        image: Image;
        members: Member[];
        detail: Detail;
    }

     interface Profile2 {
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
    }

     interface User {
        id: number;
        name: string;
        email: string;
        phone: string;
        countryCode: string;
        date_of_birth: string;
        role: string;
        sub_role: string;
        status: number;
        parent_id?: number;
        created_at?: any;
        updated_at?: any;
        gender: string;
        profile?: Profile2;
    }

    export interface IShortlist {
        id: number;
        user_id: number;
        profile_id: number;
        accepted_by?: any;
        user_profile_id: number;
        status: number;
        created_at?: any;
        updated_at?: any;
        profile: Profile;
        user: User;
    }


