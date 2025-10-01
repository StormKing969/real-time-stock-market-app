"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import {
  INVESTMENT_GOALS,
  PREFERRED_INDUSTRIES,
  RISK_TOLERANCE_OPTIONS,
} from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "United States",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: SignUpFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className={"form-title"}>Sign Up Page & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5"}>
        <InputField
          name={"fullName"}
          label={"Full Name"}
          placeholder={"John Doe"}
          register={register}
          error={errors.fullName}
          validation={{ required: "Full Name is required", minLength: 2 }}
        />
        <InputField
          name={"email"}
          label={"Email Address"}
          placeholder={"Enter your email"}
          register={register}
          error={errors.email}
          validation={{
            required: "Email Address is required",
            pattern: /^[^\s@]@[a-zA-Z\s]{2,20}\.[a-zA-Z\s]{2,10}$/,
            message: "Invalid email address.",
          }}
        />
        <CountrySelectField
          name={"country"}
          label={"Country"}
          control={control}
          error={errors.country}
          required={true}
        />
        <InputField
          name={"password"}
          label={"Password"}
          placeholder={"Enter a strong password"}
          type={"password"}
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />
        <InputField
          name={"confirmPassword"}
          label={"Confirm Password"}
          placeholder={"Reenter the password"}
          type={"password"}
          register={register}
          error={errors.confirmPassword}
          validation={{ required: "Password is required", minLength: 8 }}
        />
        <SelectField
          name={"investmentGoals"}
          label={"Investment Goals"}
          placeholder={"Select your investment goal"}
          options={INVESTMENT_GOALS}
          control={control}
          error={errors.investmentGoals}
          required={true}
        />
        <SelectField
          name={"riskTolerance"}
          label={"Risk Tolerance"}
          placeholder={"Select your risk tolerance"}
          options={RISK_TOLERANCE_OPTIONS}
          control={control}
          error={errors.riskTolerance}
          required={true}
        />
        <SelectField
          name={"preferredIndustry"}
          label={"Preferred Industry"}
          placeholder={"Select your preferred industry"}
          options={PREFERRED_INDUSTRIES}
          control={control}
          error={errors.preferredIndustry}
          required={true}
        />
        <Button
          type={"submit"}
          disabled={isSubmitting}
          className={"yellow-btn w-full mt-5"}
        >
          {isSubmitting
            ? "Creating Account..."
            : "Start Your Investment Journey"}
        </Button>
      </form>
    </>
  );
};

export default SignUp;