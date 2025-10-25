import { ErrorBoundary } from "@/components/ErrorBoundary";
import { UserProfile } from "@/components/UserProfile";

export default function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 text-2xl font-semibold">User Profile</h1>
      <ErrorBoundary>
        <UserProfile userId={userId} />
      </ErrorBoundary>
    </div>
  );
}
