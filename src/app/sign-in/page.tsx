import { SignInForm } from "@/components/SignInForm";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 text-2xl font-semibold">Sign In</h1>
      <SignInForm />
    </div>
  );
}
