import { networkBoundary } from "@/error/network-boundary";
import { zUsers } from "@/lib/schemas";

export default async function UsersPage() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  const users = await networkBoundary({
    schema: zUsers,
    input: `${base}/api/users`,
  });

  return (
    <div className="mx-auto max-w-2xl p-8">
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <ul className="list-disc pl-6">
        {users.map((u) => (
          <li key={u.id}>
            <a className="text-blue-600 underline" href={`/users/${u.id}`}>
              {u.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
