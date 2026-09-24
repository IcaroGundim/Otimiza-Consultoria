import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  organization: z.string().trim().max(160).optional(),
  service: z.string().trim().max(120).optional(),
  message: z.string().trim().min(20).max(3000),
});

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload inválido." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Revise os dados do formulário." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail =
    process.env.CONTACT_TO_EMAIL || "contato@otimizaconsultoria.com.br";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL || "Site Otimiza <no-reply@otimiza.eco.br>";

  if (!resendApiKey) {
    return NextResponse.json(
      { ok: false, error: "Serviço de e-mail não configurado no servidor." },
      { status: 500 }
    );
  }

  const { name, email, organization, service, message } = parsed.data;

  const html = `
    <h2>Novo contato recebido pelo site</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Instituição:</strong> ${escapeHtml(
      organization || "Não informada"
    )}</p>
    <p><strong>Frente de trabalho:</strong> ${escapeHtml(
      service || "Não informada"
    )}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  const text = [
    "Novo contato recebido pelo site",
    `Nome: ${name}`,
    `E-mail: ${email}`,
    `Instituição: ${organization || "Não informada"}`,
    `Frente de trabalho: ${service || "Não informada"}`,
    "Mensagem:",
    message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject: `[Site Otimiza] Novo contato de ${name}`,
      html,
      text,
    }),
  });

  if (!response.ok) {
    const errorPayload = await response
      .json()
      .catch(() => ({ message: "Falha desconhecida." }));
    const messageFromProvider =
      typeof errorPayload === "object" &&
      errorPayload !== null &&
      "message" in errorPayload
        ? String(errorPayload.message)
        : "Falha no envio de e-mail.";

    return NextResponse.json(
      { ok: false, error: messageFromProvider },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
