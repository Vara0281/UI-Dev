export interface IEmployee {
  _id: number | string;
  name: string;
  contactPreference: string;
  email: string;
  phone: number;
  gender?: string;
  dateOfBirth?: Date;
  department?: string;
  isActive?: boolean;
  avatar?: string | File;
  skills?: ISkill[];
}

export interface ISkill {
  skillName: string;
  experienceInYears: number;
  proficiency: string;
}
