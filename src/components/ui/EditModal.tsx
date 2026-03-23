"use client";

import { useState } from "react";
import { editContent } from "@/actions/content";

interface EditField {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea";
  value: string | number;
}

interface EditModalProps {
  type: string;
  id: number;
  fields: EditField[];
  accentColor: string;
}

export function EditModal({ type, id, fields, accentColor }: EditModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {};
    for (const field of fields) {
      const val = form.get(field.name);
      data[field.name] = field.type === "number" ? parseInt(val as string) : val;
    }
    const result = await editContent(type, id, data);
    setLoading(false);
    if (!result.success) {
      setError("Failed to save");
    } else {
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase transition-colors hover:opacity-100"
        style={{ color: accentColor, opacity: 0.5 }}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
        Edit
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg bg-[#0d0d12] border border-neutral-800/50 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Edit Content</h3>
          <button onClick={() => setOpen(false)} className="text-neutral-500 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-1.5">{field.label}</label>
              {field.type === "textarea" ? (
                <textarea name={field.name} defaultValue={String(field.value)} rows={4} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors resize-none" style={{ borderColor: undefined }} onFocus={(e) => e.currentTarget.style.borderColor = `${accentColor}30`} onBlur={(e) => e.currentTarget.style.borderColor = ""} />
              ) : (
                <input name={field.name} type={field.type || "text"} defaultValue={String(field.value)} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors" onFocus={(e) => e.currentTarget.style.borderColor = `${accentColor}30`} onBlur={(e) => e.currentTarget.style.borderColor = ""} />
              )}
            </div>
          ))}

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-lg text-[10px] tracking-[0.2em] uppercase text-neutral-400 border border-neutral-800/50 hover:bg-white/[0.03] transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2.5 rounded-lg text-[10px] tracking-[0.2em] uppercase font-medium transition-all disabled:opacity-50" style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}20` }}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
