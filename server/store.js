import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "data", "inquiries.json");

export async function saveInquiry(doc, useMongo) {
  if (useMongo) {
    const { default: Inquiry } = await import("./models/Inquiry.js");
    return Inquiry.create(doc);
  }

  await fs.mkdir(path.dirname(file), { recursive: true });
  let list = [];
  try {
    list = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    list = [];
  }
  const saved = { ...doc, _id: `${Date.now()}`, createdAt: new Date().toISOString() };
  list.push(saved);
  await fs.writeFile(file, JSON.stringify(list, null, 2));
  return saved;
}
