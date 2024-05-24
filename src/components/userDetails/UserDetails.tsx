import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Controller, FormProvider } from "react-hook-form";
import { Select, chakraComponents } from "chakra-react-select";
import { FaCheck } from "react-icons/fa";
import "./UserDetails.css";
import React from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { PreviewUserDetails } from "../previewUserDetails/PreviewUserDetails";
import { genderOptions } from "../../utils/constant";
import { useUserDetails } from "../../hooks/useUserDetails";
import { MaritalStatus } from "../../types/userDetails";

const customSelectComponents = {
  Option: ({
    children,
    isSelected,
    ...props
  }: {
    children: React.ReactNode;
    isSelected: boolean;
  }) => (
    <chakraComponents.Option {...props}>
      {children}
      {isSelected && (
        <Box ml="auto">
          <FaCheck color="green" />
        </Box>
      )}
    </chakraComponents.Option>
  ),
};

export const UserDetails = () => {
  const {
    methods,
    errors,
    control,
    isSubmitting,
    teckStacksValue,
    lastTechStackRef,
    addStack,
    removeStack,
    register,
    handleSubmit,
    onSubmit,
    reset,
  } = useUserDetails();

  //Add both register and controller methods for user details fields in the form for demonstration purposes.
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container">
        <Heading as="h1" size="lg">
          User Details
        </Heading>
        <Card variant="outline" p={4}>
          <Heading as="h6" size="md" mb={2}>
            Basic Details
          </Heading>
          <Stack direction={["column", "row"]}>
            <FormControl isInvalid={!!errors.firstName?.message}>
              <FormLabel>
                First name <span className="error">*</span>
              </FormLabel>
              <Input
                {...register("firstName")}
                variant="outline"
                placeholder="Enter First Name"
              />
              {errors.firstName?.message && (
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.lastName?.message}>
              <FormLabel>
                Last name <span className="error">*</span>
              </FormLabel>
              <Input
                variant="outline"
                placeholder="Enter Last Name"
                {...register("lastName")}
              />
              {errors.lastName?.message && (
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
          <Heading as="h6" size="md" mb={2} mt={6}>
            Other Information
          </Heading>
          <Stack spacing={4}>
            <Stack direction={["column", "row"]}>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.gender?.value?.message}>
                    <FormLabel>
                      Gender <span className="error">*</span>
                    </FormLabel>
                    <Select
                      {...field}
                      options={genderOptions}
                      placeholder="Select Gender"
                      components={customSelectComponents}
                      isInvalid={!!errors.gender?.value?.message}
                    />
                    {errors.gender?.value?.message && (
                      <FormErrorMessage>
                        {errors.gender?.value?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <FormControl isInvalid={!!errors.dob?.message}>
                <FormLabel>
                  Date of Birth <span className="error">*</span>
                </FormLabel>
                <Input
                  placeholder="Enter Date in DD-MM-YYYY"
                  size="md"
                  {...register("dob")}
                />
                {errors.dob?.message && (
                  <FormErrorMessage>{errors.dob?.message}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
            <Stack direction={["column", "row"]}>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.email?.message}>
                    <FormLabel>
                      Email Address <span className="error">*</span>
                    </FormLabel>
                    <Input
                      placeholder="Enter email address"
                      type="email"
                      {...field}
                    />
                    {errors.email?.message && (
                      <FormErrorMessage>
                        {errors.email?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.phoneNumber?.message}>
                    <FormLabel>
                      Phone Number <span className="error">*</span>
                    </FormLabel>
                    <InputGroup>
                      <InputLeftAddon>+91</InputLeftAddon>
                      <Input
                        type="number"
                        placeholder="Enter phone number"
                        {...field}
                      />
                    </InputGroup>
                    {errors.phoneNumber?.message && (
                      <FormErrorMessage>
                        {errors.phoneNumber?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
            <Stack direction={["column", "row"]}>
              <Controller
                control={control}
                name="marital_status"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.marital_status?.message}>
                    <FormLabel>
                      Marital status <span className="error">*</span>
                    </FormLabel>
                    <RadioGroup size="lg" {...field}>
                      <Stack direction="row">
                        <Radio value={MaritalStatus.MARRIED}>Married</Radio>
                        <Radio value={MaritalStatus.SINGLE}>Single</Radio>
                      </Stack>
                    </RadioGroup>
                    {errors.marital_status?.message && (
                      <FormErrorMessage>
                        {errors.marital_status?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name="partner_name"
                render={({ field }) => (
                  <FormControl isInvalid={!!errors.partner_name?.message}>
                    <FormLabel>
                      Partner name <span className="error">*</span>
                    </FormLabel>
                    <Input placeholder="Enter Partner name" {...field} />
                    {errors.partner_name?.message && (
                      <FormErrorMessage>
                        {errors.partner_name?.message}
                      </FormErrorMessage>
                    )}
                  </FormControl>
                )}
              />
            </Stack>
            <Stack spacing={4} mt={2} width={["100%", "100%"]}>
              <Flex
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Heading as="h6" size="md">
                  Tech stacks
                </Heading>
                <IconButton
                  icon={<RiAddLine />}
                  aria-label="Add"
                  size="sm"
                  onClick={addStack}
                  mr="1.25rem"
                />
              </Flex>
              <FormControl isInvalid={!!errors.techStacks?.root?.message}>
                {teckStacksValue?.map((_, index: number) => (
                  <Stack key={index} direction={["column", "row"]} mb={4}>
                    <FormControl
                      isInvalid={!!errors.techStacks?.[index]?.skill}
                    >
                      <FormLabel>
                        Skill <span className="error">*</span>
                      </FormLabel>
                      <Controller
                        name={`techStacks.${index}.skill`}
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            isInvalid={
                              !!errors.techStacks?.[index]?.skill?.message
                            }
                          >
                            <Input
                              {...field}
                              placeholder="Enter Skill"
                              ref={
                                index === teckStacksValue.length - 1
                                  ? lastTechStackRef
                                  : null
                              }
                            />
                            {errors.techStacks?.[index]?.skill?.message && (
                              <FormErrorMessage>
                                {errors.techStacks?.[index]?.skill?.message}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      />
                    </FormControl>
                    <FormControl
                      isInvalid={!!errors.techStacks?.[index]?.level}
                    >
                      <FormLabel>
                        Level <span className="error">*</span>
                      </FormLabel>
                      <Controller
                        name={`techStacks.${index}.level`}
                        control={control}
                        render={({ field }) => (
                          <FormControl
                            isInvalid={
                              !!errors.techStacks?.[index]?.level?.message
                            }
                          >
                            <NumberInput
                              {...field}
                              onChange={(value) =>
                                field.onChange(
                                  value === "" ? "" : Number(value)
                                )
                              }
                            >
                              <NumberInputField placeholder="Enter level between 0 to 10" />
                            </NumberInput>
                            {errors.techStacks?.[index]?.level?.message && (
                              <FormErrorMessage>
                                {errors.techStacks?.[index]?.level?.message}
                              </FormErrorMessage>
                            )}
                          </FormControl>
                        )}
                      />
                    </FormControl>
                    {teckStacksValue?.length > 1 && (
                      <IconButton
                        size="sm"
                        icon={<RiCloseLine />}
                        aria-label="Remove"
                        onClick={() => removeStack(index)}
                        mt={8}
                      />
                    )}
                  </Stack>
                ))}

                {errors.techStacks?.root?.message && (
                  <FormErrorMessage>
                    {errors.techStacks?.root?.message}
                  </FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </Stack>
          <Stack>
            <Button
              colorScheme="teal"
              size="sm"
              type="reset"
              className="submitbtn"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button
              colorScheme="teal"
              size="sm"
              type="submit"
              className="submitbtn"
              isLoading={isSubmitting}
            >
              Submit
            </Button>
          </Stack>
        </Card>
        <PreviewUserDetails />
      </form>
    </FormProvider>
  );
};
