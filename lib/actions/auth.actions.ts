"use server";

import {inngest} from "@/lib/inngest/client";
import {auth} from "@/lib/better-auth/auth";

export const signUpWithEmail = async ({
  email,
  fullName,
  country,
  investmentGoals,
  riskTolerance,
  password,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: { email: email, password: password, name: fullName },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email: email,
          name: fullName,
          country: country,
          investmentGoals: investmentGoals,
          riskTolerance: riskTolerance,
          preferredIndustry: preferredIndustry,
        },
      });
    }

    return { success: true, message: "Sign-up successful!", data: response };
  } catch (error) {
    console.error("Error during sign-up:", error);
    return { success: false, message: "Sign-up failed. Please try again." };
  }
};