type User = {
  id: string;
  email: string;
  name: string;
  password: string; // plain for demo only
  profile?: { avatarUrl?: string };
};

const users: User[] = [
  {
    id: "1",
    email: "alice@example.com",
    name: "Alice",
    password: "password123",
    profile: { avatarUrl: "/vercel.svg" },
  },
  { id: "2", email: "bob@example.com", name: "Bob", password: "hunter2" },
];

export const db = {
  users: {
    async find(id: string): Promise<User | undefined> {
      // Simulate random DB failure
      if (Math.random() < 0.15) {
        throw new Error("Simulated DB connection failure");
      }
      return users.find((u) => u.id === id);
    },
    async list(): Promise<User[]> {
      if (Math.random() < 0.1) {
        throw new Error("Simulated DB query failure");
      }
      return users;
    },
    async findByEmail(email: string): Promise<User | undefined> {
      return users.find((u) => u.email === email);
    },
  },
};

export type { User };
