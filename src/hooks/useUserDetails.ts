import * as yup from "yup";
import { PhoneNumberRegex, emailRegex } from "../utils/regex";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputs, MaritalStatus } from "../types/userDetails";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef } from "react";
import moment from "moment";

const defaultValuesSample = {
  firstName: "jenis",
  lastName: "gadhiya",
  gender: {
    value: "male",
    label: "Male",
  },
  dob: "26-04-2000",
  email: "jenis@simformsolutions.com",
  phoneNumber: "9664834708",
  techStacks: [
    {
      skill: "reactjs",
      level: 9,
    },
    {
      skill: "nodejs",
      level: 7,
    },
  ],
};

const defaultValues = {
  firstName: "",
  lastName: "",
  gender: undefined,
  dob: undefined,
  email: undefined,
  phoneNumber: undefined,
  techStacks: [{ skill: "" }],
};

const schema: yup.ObjectSchema<FormInputs> = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name is incorrect"),
  lastName: yup
    .string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name is incorrect"),
  gender: yup.object().shape({
    value: yup.string().required("Gender is required"),
    label: yup.string().required("Gender is required"),
  }),
  dob: yup
    .string()
    .required("Date is required")
    .matches(/^(\d{2})-(\d{2})-(\d{4})$/, "Date must be in DD-MM-YYYY format")
    .test("is-valid-date", "Date is not valid", (value) =>
      moment(value, "DD-MM-YYYY", true).isValid()
    )
    .test("date-not-future", "Date should not be in future", (value) =>
      moment(value, "DD-MM-YYYY").isBefore(moment())
    ),
  techStacks: yup
    .array()
    .of(
      yup.object().shape({
        skill: yup.string().required("Skill is required"),
        level: yup
          .number()
          .typeError("level must be a number")
          .required("level is required")
          .max(10, "level must be between 0 to 10")
          .min(0, "level must be between 0 to 10"),
      })
    )
    .min(1, "Atleast one tech stack is required")
    .test("skill-unique", "Skill should be unique", (techStacks) => {
      const skills = techStacks?.map((item) => item?.skill);
      return skills?.length === new Set(skills)?.size;
    })
    .required(),
  email: yup
    .string()
    .required("Email address is required")
    .matches(emailRegex(), "Email format is incorrect"),
  phoneNumber: yup
    .string()
    .required("phone number is required")
    .matches(PhoneNumberRegex(), "Mobile format is incorrect"),
  marital_status: yup
    .mixed<MaritalStatus>()
    .oneOf(Object.values(MaritalStatus))
    .required("marital status is required"),
  partner_name: yup.string().when("marital_status", {
    is: MaritalStatus.MARRIED,
    then: (schema) => schema.required("Partner name is required"),
    otherwise: (schema) => schema.optional(),
  }),
});

export const useUserDetails = () => {
  const methods = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues,
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = methods;
  const lastTechStackRef = useRef<HTMLInputElement | null>(null);
  const doSetAutoFocus = useRef(false);
  const teckStacksValue = watch("techStacks");

  useEffect(() => {
    if (lastTechStackRef.current && doSetAutoFocus.current)
      lastTechStackRef.current.focus();
  }, [teckStacksValue.length, doSetAutoFocus]);

  const onSubmit: SubmitHandler<FormInputs> = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 3000);
    });
  };

  const addStack = () => {
    const currentStacks = getValues("techStacks");
    setValue("techStacks", [...currentStacks, { skill: "", level: undefined }]);
    doSetAutoFocus.current = true;
  };

  const removeStack = (indexToRemove: number) => {
    const currentStacks = getValues("techStacks");
    setValue(
      "techStacks",
      currentStacks.filter((_, index) => index !== indexToRemove)
    );
  };

  return {
    methods,
    control,
    errors,
    isSubmitting,
    lastTechStackRef,
    teckStacksValue,
    addStack,
    removeStack,
    onSubmit,
    register,
    handleSubmit,
    reset,
  };
};
