import { Admin } from "@/models/Admin";

async function main() {
  // Create a new admin
  const admin = new Admin("12345678900", "securePassword");
  await admin.save();

  // Find an admin by CPF
  const foundAdmin = await Admin.findByCPF("12345678900");
  console.log("Found admin:", foundAdmin);

  // Update an admin's details
  await Admin.updateByCPF("12345678900", { senha: "newSecurePassword" });

  // Delete an admin by CPF
  await Admin.deleteByCPF("12345678900");

  // List all admins
  const allAdmins = await Admin.listAll();
  console.log("All admins:", allAdmins);
}

main().catch(console.error);
