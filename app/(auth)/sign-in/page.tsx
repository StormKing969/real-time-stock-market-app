"use client";

import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import { useForm } from "react-hook-form";
import { signInWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignIn = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: SignInFormData) => {
    try {
      const result = await signInWithEmail(data);

      if (result.success) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Sign-in failed. Please try again.", {
        description:
          error instanceof Error ? error.message : "Failed to sign in",
      });
    }
  };

  return (
    <div className={""}>
      <h1 className={"form-title"}>Welcome back</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={"space-y-5"}>
        <InputField
          name={"email"}
          label={"Email Address"}
          placeholder={"Enter your email"}
          register={register}
          error={errors.email}
          validation={{
            required: "Email Address is required",
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address.",
          }}
        />
        <InputField
          name={"password"}
          label={"Password"}
          placeholder={"Enter your password"}
          type={"password"}
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
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
        <FooterLink
          text={"Don't have an account?"}
          linkText={"Create an account"}
          href={"/sign-up"}
        />
      </form>
    </div>
  );
};

export default SignIn;