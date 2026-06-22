import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const allowedRoles = new Set([
  "super_admin",
  "education_admin",
  "counsellor",
  "management",
]);

const email = (
  process.argv[2] ||
  process.env.PORTAL_BOOTSTRAP_EMAIL ||
  ""
)
  .trim()
  .toLowerCase();
const role = (
  process.argv[3] ||
  process.env.PORTAL_BOOTSTRAP_ROLE ||
  "super_admin"
).trim();

if (!email || !allowedRoles.has(role)) {
  console.error(
    "Usage: npm run portal:grant -- staff@example.com super_admin"
  );
  process.exitCode = 1;
} else {
  try {
    const user = await prisma.user.update({
      where: { email },
      data: { portalAccess: true, portalRole: role },
      select: {
        name: true,
        email: true,
        role: true,
        portalRole: true,
      },
    });
    console.log(
      `Education Portal access enabled for ${user.email} as ${user.portalRole}. Blog role remains ${user.role}.`
    );
  } catch (error) {
    console.error(
      error?.code === "P2025"
        ? "No existing blog User was found for that email."
        : error instanceof Error
          ? error.message
          : "Unable to grant portal access."
    );
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}
