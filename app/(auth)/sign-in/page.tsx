"use client";

import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useForm} from "react-hook-form";

const SignIn = () => {
    const {
        register,
        handleSubmit,
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
                        pattern: /^[^\s@]@[a-zA-Z\s]{2,20}\.[a-zA-Z\s]{2,10}$/,
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
                <FooterLink text={"Don't have an account?"} linkText={"Create an account"} href={"/sign-up"} />
            </form>
        </div>
    )
}

export default SignIn