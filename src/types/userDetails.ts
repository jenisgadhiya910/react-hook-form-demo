export type FormInputs = {
  firstName: string;
  lastName: string;
  gender: { value: string; label: string };
  dob: string;
  techStacks: {
    skill: string;
    level: number | undefined;
  }[];
  email: string;
  phoneNumber: string;
  marital_status: MaritalStatus;
  partner_name?: string;
};

export enum MaritalStatus {
  SINGLE = "single",
  MARRIED = "married",
}
