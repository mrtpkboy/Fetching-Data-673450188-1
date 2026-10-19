import Link from "next/link";

const links = [
  { href: "/students", label: "รายการนักศึกษา (Prisma)" },
  { href: "/students/create", label: "เพิ่มนักศึกษา (Zod + Server Action)" },
  { href: "/blogs", label: "บทความ (Suspense + Skeleton)" },
  { href: "/blogs/1", label: "รายละเอียดบทความ" },
  { href: "/blogs/999", label: "ทดสอบ not-found" },
  { href: "/skeleton", label: "ตัวอย่าง Skeleton" },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Streaming Demo</h1>
      <ul className="list-disc space-y-2 pl-6">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-blue-600 underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
