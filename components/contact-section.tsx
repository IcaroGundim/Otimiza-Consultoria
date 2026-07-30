"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Pill } from "./pill";
import { Button } from "./ui/button";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  organization: "",
  message: "",
};

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const updateField =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
      if (status !== "idle") {
        setStatus("idle");
        setFeedback("");
      }
    };

  const validate = () => {
    if (!formData.name.trim()) {
      return "Informe seu nome.";
    }

    if (!formData.email.trim()) {
      return "Informe seu e-mail.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      return "Informe um e-mail válido.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 20) {
      return "Descreva sua necessidade em pelo menos 20 caracteres.";
    }

    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setFeedback(validationError);
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim() || undefined,
          message: formData.message.trim(),
        }),
      });

      const payload = (await response.json()) as {
        ok: boolean;
        error?: string;
      };

      if (!response.ok || !payload.ok) {
        throw new Error(
          payload.error ||
            "Não foi possível enviar agora. Tente novamente em alguns minutos."
        );
      }

      setStatus("success");
      setFeedback("Mensagem enviada. Nossa equipe retornará em breve.");
      setFormData(initialFormData);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Falha de conexão. Tente novamente."
      );
    }
  };

  return (
    <section id="contato" className="bg-sage-50 py-section">
      <div className="container">
        <div
          data-reveal
          className="rounded-card border border-sage-200 bg-paper p-7 md:p-10 lg:p-14"
        >
          <Pill className="mb-8">CONTATO</Pill>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div>
              <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl md:text-5xl lg:text-6xl">
                Planeje decisões estratégicas com inteligência econômica
                orientada por evidências.
              </h2>
              <p className="mt-6 max-w-[52ch] text-base text-pretty text-foreground/70">
                Envie sua demanda e retornaremos com uma proposta técnica
                alinhada ao contexto da sua instituição no Acre.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-ink/70"
                >
                  Nome
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  value={formData.name}
                  onChange={updateField("name")}
                  className="h-12 w-full rounded-field border border-sage-200 bg-sage-50 px-4 text-sm text-ink transition-colors placeholder:text-ink/60 focus:border-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-ink/70"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.email}
                  onChange={updateField("email")}
                  className="h-12 w-full rounded-field border border-sage-200 bg-sage-50 px-4 text-sm text-ink transition-colors placeholder:text-ink/60 focus:border-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  placeholder="voce@instituicao.com.br"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-ink/70"
                >
                  Instituição
                </label>
                <input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={updateField("organization")}
                  className="h-12 w-full rounded-field border border-sage-200 bg-sage-50 px-4 text-sm text-ink transition-colors placeholder:text-ink/60 focus:border-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  placeholder="Órgão, secretaria, empresa ou organização"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs uppercase tracking-[0.14em] text-ink/70"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={updateField("message")}
                  className="min-h-36 w-full resize-y rounded-field border border-sage-200 bg-sage-50 px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink/60 focus:border-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  placeholder="Descreva o objetivo do estudo, prazo e contexto."
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto"
                >
                  {status === "submitting"
                    ? "Enviando..."
                    : "Enviar solicitação"}
                </Button>
              </div>

              {feedback && (
                <p
                  role="status"
                  className={
                    status === "success"
                      ? "text-sm text-terracotta"
                      : "text-sm text-red-700"
                  }
                >
                  {feedback}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
