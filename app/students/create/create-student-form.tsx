"use client";

import { useActionState } from "react";

type FormState = {
  success: boolean;
  errors?: {
    studentCode?: string[];
    name?: string[];
    email?: string[];
    major?: string[];
    year?: string[];
  };
};

type CreateStudentFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

const inputClass = "w-full rounded-md border border-gray-300 px-3 py-2";
const labelClass = "mb-2 block text-sm font-medium text-gray-700";

export default function CreateStudentForm({ action }: CreateStudentFormProps) {
  const [state, formAction, pending] = useActionState(action, {
    success: false,
  });

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* รหัสนักศึกษา */}
      <div>
        <label htmlFor="studentCode" className={labelClass}>
          รหัสนักศึกษา
        </label>
        <input
          id="studentCode"
          name="studentCode"
          type="text"
          className={inputClass}
          disabled={pending}
        />
        {state.errors?.studentCode && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.studentCode[0]}
          </p>
        )}
      </div>

      {/* ชื่อ */}
      <div>
        <label htmlFor="name" className={labelClass}>
          ชื่อ-นามสกุล
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={inputClass}
          disabled={pending}
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-600">{state.errors.name[0]}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          className={inputClass}
          disabled={pending}
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-600">{state.errors.email[0]}</p>
        )}
      </div>

      {/* สาขา */}
      <div>
        <label htmlFor="major" className={labelClass}>
          สาขา
        </label>
        <input
          id="major"
          name="major"
          type="text"
          className={inputClass}
          disabled={pending}
        />
        {state.errors?.major && (
          <p className="mt-1 text-sm text-red-600">{state.errors.major[0]}</p>
        )}
      </div>

      {/* ชั้นปี */}
      <div>
        <label htmlFor="year" className={labelClass}>
          ชั้นปี
        </label>
        <input
          id="year"
          name="year"
          type="number"
          min="1"
          max="8"
          className={inputClass}
          disabled={pending}
        />
        {state.errors?.year && (
          <p className="mt-1 text-sm text-red-600">{state.errors.year[0]}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {pending ? "กำลังบันทึก..." : "บันทึก"}
        </button>

        <a
          href="/students"
          className="rounded-md border border-gray-300 px-5 py-2 font-medium text-gray-700 hover:bg-gray-50"
        >
          ยกเลิก
        </a>
      </div>
    </form>
  );
}
