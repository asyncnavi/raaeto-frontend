import { SignIn } from "@clerk/clerk-react";

export default function SigninPage() {
  return <SignIn path="/auth/signin" />;
}
