import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const applySchema = z.object({
  name: z.string().trim().min(1).max(200),
  role: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  website: z.string().trim().max(500).optional().or(z.literal("")),
  city: z.string().trim().min(1).max(100),
  industry: z.string().trim().min(1).max(100),
  team_size: z.string().trim().min(1).max(50),
  revenue: z.string().trim().min(1).max(50),
  systems: z.array(z.string().min(1).max(100)).max(20),
  challenge: z.string().trim().min(1).max(5000),
  source: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(320),
});

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  company: z.string().trim().min(1).max(200),
  city: z.string().trim().max(100).optional().or(z.literal("")),
  phone: z.string().trim().min(1).max(50),
  email: z.string().trim().email().max(320),
  system_interest: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
});

const NOTIFY_TO = "sahil@induxtron.com";
const FROM = "Induxtron Leads <onboarding@resend.dev>";

async function sendEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("RESEND_API_KEY not configured — skipping email notification");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to: [NOTIFY_TO], subject, html, reply_to: NOTIFY_TO }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("Resend send failed", res.status, body);
    }
  } catch (err) {
    console.error("Resend send error", err);
  }
}

function row(label: string, value: string | string[] | undefined | null) {
  const v = Array.isArray(value) ? value.join(", ") : value ?? "—";
  const safe = String(v).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]!));
  return `<tr><td style="padding:6px 12px;color:#888;font-family:Inter,Arial,sans-serif;font-size:13px;vertical-align:top;">${label}</td><td style="padding:6px 12px;color:#111;font-family:Inter,Arial,sans-serif;font-size:14px;white-space:pre-wrap;">${safe}</td></tr>`;
}

export const submitApply = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("apply_submissions").insert(data);
    if (error) {
      console.error("apply insert failed", error);
      throw new Error("Could not save your application. Please try again.");
    }

    const html = `
      <div style="background:#0a0a0a;padding:24px;font-family:Inter,Arial,sans-serif;">
        <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#c8a96a,#e6c98a);padding:20px 24px;">
            <div style="color:#0a0a0a;font-size:11px;letter-spacing:.2em;">NEW APPLICATION</div>
            <div style="color:#0a0a0a;font-size:22px;font-weight:700;margin-top:4px;">${data.name} — ${data.company}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Email", data.email)}
            ${row("Phone", data.phone)}
            ${row("Role", data.role)}
            ${row("Website", data.website)}
            ${row("City", data.city)}
            ${row("Industry", data.industry)}
            ${row("Team size", data.team_size)}
            ${row("Revenue", data.revenue)}
            ${row("Systems", data.systems)}
            ${row("Source", data.source)}
            ${row("Challenge", data.challenge)}
          </table>
        </div>
      </div>`;
    await sendEmail(`New Application — ${data.name} (${data.company})`, html);

    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert(data);
    if (error) {
      console.error("contact insert failed", error);
      throw new Error("Could not send your message. Please try again.");
    }

    const html = `
      <div style="background:#0a0a0a;padding:24px;font-family:Inter,Arial,sans-serif;">
        <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#c8a96a,#e6c98a);padding:20px 24px;">
            <div style="color:#0a0a0a;font-size:11px;letter-spacing:.2em;">NEW CONTACT MESSAGE</div>
            <div style="color:#0a0a0a;font-size:22px;font-weight:700;margin-top:4px;">${data.name} — ${data.company}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            ${row("Email", data.email)}
            ${row("Phone", data.phone)}
            ${row("City", data.city)}
            ${row("System interest", data.system_interest)}
            ${row("Message", data.message)}
          </table>
        </div>
      </div>`;
    await sendEmail(`New Contact — ${data.name} (${data.company})`, html);

    return { ok: true };
  });
