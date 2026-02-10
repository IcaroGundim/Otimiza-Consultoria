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
    <section id="contato" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <div className="border border-border bg-black/55 backdrop-blur-sm p-7 md:p-10 lg:p-12">
          <Pill className="mb-6">CONTATO</Pill>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl text-balance">
                Planeje decisões estratégicas com inteligência econômica
                orientada por evidências.
              </h2>
              <p className="font-mono text-sm sm:text-base text-foreground/70 mt-6 text-pretty">
                Envie sua demanda e retornaremos com uma proposta técnica
                alinhada ao contexto da sua instituição no Acre.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs uppercase tracking-wide font-mono text-foreground/70 mb-2"
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
                  className="w-full h-12 px-4 bg-black/40 border border-border text-foreground font-mono text-sm outline-none focus:border-primary transition-colors"
                  placeholder="Seu nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wide font-mono text-foreground/70 mb-2"
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
                  className="w-full h-12 px-4 bg-black/40 border border-border text-foreground font-mono text-sm outline-none focus:border-primary transition-colors"
                  placeholder="voce@instituicao.com.br"
                />
              </div>

              <div>
                <label
                  htmlFor="organization"
                  className="block text-xs uppercase tracking-wide font-mono text-foreground/70 mb-2"
                >
                  Instituição
                </label>
                <input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={updateField("organization")}
                  className="w-full h-12 px-4 bg-black/40 border border-border text-foreground font-mono text-sm outline-none focus:border-primary transition-colors"
                  placeholder="Órgão, secretaria, empresa ou organização"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-wide font-mono text-foreground/70 mb-2"
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
                  className="w-full px-4 py-3 bg-black/40 border border-border text-foreground font-mono text-sm outline-none focus:border-primary transition-colors resize-y min-h-36"
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
                    ? "[Enviando...]"
                    : "[Enviar solicitação]"}
                </Button>
              </div>

              {feedback && (
                <p
                  role="status"
                  className={
                    status === "success"
                      ? "font-mono text-sm text-primary"
                      : "font-mono text-sm text-red-300"
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
