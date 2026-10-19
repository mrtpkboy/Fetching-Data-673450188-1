import Link from "next/link";
import { revalidatePath } from "next/cache";
import prisma from "@/app/lib/prisma";

export const dynamic = "force-dynamic";

async function deleteStudent(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  await prisma.student.delete({ where: { id } });
  revalidatePath("/students");
}

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">รายการนักศึกษา</h1>
        <Link
          href="/students/create"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          + เพิ่มนักศึกษา
        </Link>
      </div>

      <table className="w-full border border-gray-200 text-left text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3">รหัส</th>
            <th className="p-3">ชื่อ-นามสกุล</th>
            <th className="p-3">Email</th>
            <th className="p-3">สาขา</th>
            <th className="p-3">ชั้นปี</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 && (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                ยังไม่มีข้อมูลนักศึกษา
              </td>
            </tr>
          )}
          {students.map((s) => (
            <tr key={s.id} className="border-t border-gray-200">
              <td className="p-3">{s.studentCode}</td>
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.major}</td>
              <td className="p-3">{s.year}</td>
              <td className="p-3 text-right">
                <form action={deleteStudent}>
                  <input type="hidden" name="id" value={s.id} />
                  <button className="text-red-600 hover:underline">ลบ</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
