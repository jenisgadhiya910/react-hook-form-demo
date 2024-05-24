import { Card, Heading } from "@chakra-ui/react";
import ReactJson from "react-json-view";
import { useFormContext } from "react-hook-form";

export const PreviewUserDetails = () => {
  const { getValues, formState } = useFormContext();
  const values = getValues();
  const {
    defaultValues,
    dirtyFields,
    disabled,
    errors,
    isDirty,
    isLoading,
    isSubmitSuccessful,
    isSubmitted,
    isSubmitting,
    isValid,
    isValidating,
    submitCount,
    touchedFields,
    validatingFields,
  } = formState;
  return (
    <>
      <Heading as="h1" size="lg" mt={8}>
        Preview User Details
      </Heading>
      <Card variant="outline" p={4} gap={3}>
        <ReactJson
          src={values}
          name={"form values"}
          displayDataTypes={false}
          displayObjectSize={false}
        />
        <ReactJson
          src={{
            defaultValues,
            disabled,
            isDirty,
            isLoading,
            isSubmitSuccessful,
            isSubmitted,
            isSubmitting,
            isValid,
            isValidating,
            submitCount,
          }}
          name={"form state"}
          displayDataTypes={false}
          displayObjectSize={false}
        />
      </Card>
    </>
  );
};
