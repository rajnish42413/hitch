
  export interface IMedia {
    id: string;
    shaadiId: string;
    createdAt: Date;
    img_1: string;
    img_2: string;
    img_3: string;
    img_4: string;
    img_5: string;
    img_6: string;
    cap_1: string;
    cap_2: string;
    cap_3: string;
    cap_4: string;
    cap_5: string;
    cap_6: string;
}

export interface IProfile {
    user_id: string;
    created_at: Date;
    name: string;
    dob: Date;
    marital_status: boolean;
    height: number;
    location: string;
    created_by: string;
    workplace: string;
    job_title: string;
    edu_level: string;
    college: string;
    salary: number;
    community: string;
    intro: string;
    media: IMedia[];
}


