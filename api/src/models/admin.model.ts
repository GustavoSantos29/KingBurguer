import type { Prisma } from "@prisma/client";

export type Admin = Prisma.AdminGetPayload<{}>;

export type AdminLoginDTO = {
  email: string;
  password: string;
};
