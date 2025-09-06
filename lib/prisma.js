import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

/// TODO prisma nedir ogrenilecek
// TODO next ogrenilecek
// TODO veritabani nedir ogrenilecek
// TODO ORM nedir ogrenilecek
// TODO CRUD nedir ogrenilecek
// TODO REST API nedir ogrenilecek
// TODO fetch API nedir ogrenilecek
// TODO Zustand nedir ogrenilecek
// TODO Tailwind CSS nedir ogrenilecek
