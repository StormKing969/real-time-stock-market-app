"use server";

import { inngest } from "@/lib/inngest/client";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";

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

export const signOut = async () => {
  try {
    await auth.api.signOut({ headers: await headers() });
  } catch (error) {
    console.error("Error during sign-out:", error);
    return { success: false, message: "Sign-out failed. Please try again." };
  }
};

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: { email: email, password: password },
    });

    return { success: true, message: "Sign-in successful!", data: response };
  } catch (error) {
    console.error("Error during sign-in:", error);
    return { success: false, message: "Sign-in failed. Please try again." };
  }
};