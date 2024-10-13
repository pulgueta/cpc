export type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  code: string;
};
