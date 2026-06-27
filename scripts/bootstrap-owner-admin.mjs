import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const email = (
  process.env.OWNER_ADMIN_EMAIL || "injamulhoquemiddya@gmail.com"
)
  .trim()
  .toLowerCase();
const password = process.env.OWNER_ADMIN_PASSWORD || "";
const name = (process.env.OWNER_ADMIN_NAME || "ilmaLink Owner Admin").trim();

if (password.length < 8) {
  console.error(
    "Set OWNER_ADMIN_PASSWORD to at least 8 characters before running this command."
  );
  process.exitCode = 1;
} else {
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        name,
        password: passwordHash,
        role: "admin",
        portalAccess: true,
        portalRole: "super_admin",
      },
      create: {
        name,
        email,
        password: passwordHash,
        role: "admin",
        portalAccess: true,
        portalRole: "super_admin",
      },
      select: {
        email: true,
        role: true,
        portalAccess: true,
        portalRole: true,
      },
    });

    console.log(
      `Owner administrator ready: ${user.email} · blog=${user.role} · portal=${user.portalRole}`
    );
  } catch (error) {
    console.error(
      error instanceof Error
        ? error.message
        : "Unable to bootstrap the owner administrator."
    );
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}
