"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

interface CreateFormProps {
  title: string;
  section: string;
  color: string;
  action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  redirectPath: string;
  fields: { name: string; label: string; type?: string; required?: boolean; placeholder?: string; options?: string[]; min?: string; max?: string; step?: string; textarea?: boolean }[];
}

export function CreateForm({ title, section, color, action, redirectPath, fields }: CreateFormProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await action(new FormData(e.currentTarget));
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      router.push(redirectPath);
      router.refresh();
    }
  }

  return (
    <main className="relative min-h-screen bg-[#07070a] text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d0b1a] via-[#07070a] to-[#0d0b1a]" />
      <div className="absolute w-[400px] h-[400px] rounded-full blur-[180px] opacity-10" style={{ background: color, left: "20%", top: "20%" }} />

      <div className="relative z-10 max-w-lg mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 mb-10 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href="/create" className="hover:text-white transition-colors">Create</Link>
          <span className="opacity-30">/</span>
          <span style={{ color, opacity: 0.7 }}>{title}</span>
        </div>

        <span className="text-[10px] tracking-[0.4em] uppercase block mb-3" style={{ color, opacity: 0.5 }}>{section}</span>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">Create {title}</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 block mb-1.5">{field.label}</label>
              {field.textarea ? (
                <textarea name={field.name} required={field.required !== false} rows={4} placeholder={field.placeholder} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors resize-none" style={{ borderColor: undefined }} onFocus={(e) => e.currentTarget.style.borderColor = `${color}30`} onBlur={(e) => e.currentTarget.style.borderColor = ""} />
              ) : field.options ? (
                <select name={field.name} required={field.required !== false} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none transition-colors appearance-none" onFocus={(e) => e.currentTarget.style.borderColor = `${color}30`} onBlur={(e) => e.currentTarget.style.borderColor = ""}>
                  <option value="">Select...</option>
                  {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input name={field.name} type={field.type || "text"} required={field.required !== false} placeholder={field.placeholder} min={field.min} max={field.max} step={field.step} className="w-full bg-white/[0.03] border border-neutral-800/50 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none transition-colors" onFocus={(e) => e.currentTarget.style.borderColor = `${color}30`} onBlur={(e) => e.currentTarget.style.borderColor = ""} />
              )}
            </div>
          ))}

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-300 disabled:opacity-50" style={{ background: `${color}15`, color, border: `1px solid ${color}20` }}>
            {loading ? "Creating..." : `Publish ${title}`}
          </button>
        </form>
      </div>
    </main>
  );
}
