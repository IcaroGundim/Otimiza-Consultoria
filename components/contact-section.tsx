"use client";

import { PREFILL_CONTACT_EVENT, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";
import {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Logo } from "./logo";
import { Button } from "./ui/button";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  organization: string;
  service: string;
  message: string;
}

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  organization: "",
  service: "",
  message: "",
};

const MIN_MESSAGE = 20;
const MAX_MESSAGE = 3000;

const serviceOptions = [
  ...services.map((s) => ({ num: s.num, label: s.title })),
  { num: "—", label: "Ainda não sei" },
];

const fieldClass =
  "w-full h-12 px-4 bg-background/60 border border-border rounded-[2px] text-foreground font-mono text-sm outline-none transition-[border-color,box-shadow] duration-200 ease-out hover:border-[#3A3A3A] focus:border-primary focus:shadow-[0_0_0_3px_rgba(242,197,0,0.16)]";

// Entrada escalonada do card (prancheta "Contato com seletor"): o card
// aparece, depois rótulo, título, texto, formulário e o bloco da marca.
const reveal = (delay: number) =>
  ({ "--reveal-delay": `${delay}ms` }) as React.CSSProperties;

const labelClass =
  "block text-xs tracking-[0.12em] font-mono text-foreground/70 mb-2";

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");

  const [listOpen, setListOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(0);
  // Remonta as opções a cada abertura, o que refaz a entrada escalonada.
  const [opens, setOpens] = useState(0);
  const selectRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const resetStatus = () => {
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const updateField =
    (field: keyof ContactFormData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((current) => ({ ...current, [field]: event.target.value }));
      resetStatus();
    };

  // "[Falar sobre este serviço]" chega aqui com a frente já escolhida.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const option = serviceOptions[(event as CustomEvent<number>).detail];
      if (option) setFormData((current) => ({ ...current, service: option.label }));
    };
    window.addEventListener(PREFILL_CONTACT_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_CONTACT_EVENT, onPrefill);
  }, []);

  // Clique fora fecha o seletor.
  useEffect(() => {
    if (!listOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!selectRef.current?.contains(event.target as Node)) setListOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [listOpen]);

  const openList = () => {
    const current = serviceOptions.findIndex((o) => o.label === formData.service);
    setActiveOption(current >= 0 ? current : 0);
    setOpens((n) => n + 1);
    setListOpen(true);
    requestAnimationFrame(() => listRef.current?.focus());
  };

  const closeList = (refocus = true) => {
    setListOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (index: number) => {
    setFormData((current) => ({
      ...current,
      service: serviceOptions[index].label,
    }));
    resetStatus();
    closeList();
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = serviceOptions.length - 1;
    const moves: Record<string, () => number> = {
      ArrowDown: () => Math.min(activeOption + 1, last),
      ArrowUp: () => Math.max(activeOption - 1, 0),
      Home: () => 0,
      End: () => last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActiveOption(moves[event.key]());
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      choose(activeOption);
    } else if (event.key === "Escape" || event.key === "Tab") {
      if (event.key === "Escape") event.preventDefault();
      closeList(event.key === "Escape");
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

    if (formData.message.trim().length < MIN_MESSAGE) {
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
          service: formData.service || undefined,
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
      setFeedback("Mensagem enviada. Retornamos pelo e-mail informado.");
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

  const length = formData.message.trim().length;
  const tooShort = length > 0 && length < MIN_MESSAGE;
  const progress = Math.min(1, length / MIN_MESSAGE);
  const selectedIndex = serviceOptions.findIndex(
    (o) => o.label === formData.service
  );

  return (
    <section id="contato" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <div
          data-reveal
          className="border border-border bg-ink/70 backdrop-blur-sm rounded-[4px] p-7 md:p-10 lg:p-14"
        >
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-18">
            <div className="flex flex-col">
              <p
                data-reveal
                style={reveal(120)}
                className="font-mono font-medium text-xs uppercase tracking-[0.16em] text-primary"
              >
                Contato
              </p>
              <h2
                data-reveal
                style={reveal(200)}
                className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-balance mt-4"
              >
                Conte o que você precisa medir.
              </h2>
              <p
                data-reveal
                style={reveal(280)}
                className="font-mono text-sm sm:text-base text-foreground/70 mt-6 text-pretty max-w-[460px]"
              >
                Descreva o objetivo, o prazo e a decisão que depende do estudo.
                Respondemos com escopo, método e prazo.
              </p>
              {/* Marca completa no pé da coluna. 44px de "O" deixa o
                  descritor legível (o manual fecha a versão full abaixo de
                  40px). No mobile ela sai: o rodapé, logo abaixo, já repete
                  a mesma marca. */}
              <div
                data-reveal
                style={reveal(360)}
                className="mt-10 lg:mt-auto lg:pt-10 flex flex-col gap-5"
              >
                <Logo variant="full" mark={44} className="max-lg:hidden" />
                <p className="font-mono text-xs text-muted">
                  Prefere escrever direto?{" "}
                  <a
                    href="mailto:contato@otimizaconsultoria.com.br"
                    className="text-foreground/70 underline underline-offset-4 decoration-border transition-colors duration-300 ease-out hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    contato@otimizaconsultoria.com.br
                  </a>
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              data-reveal
              style={reveal(240)}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={updateField("name")}
                    className={fieldClass}
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>
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
                    className={fieldClass}
                    placeholder="voce@instituicao.com.br"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="organization" className={labelClass}>
                  Instituição
                </label>
                <input
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={updateField("organization")}
                  className={fieldClass}
                  placeholder="Órgão, secretaria, empresa ou organização"
                />
              </div>

              <div ref={selectRef} className="relative z-20">
                <span id="service-label" className={labelClass}>
                  Frente de trabalho
                </span>
                <button
                  ref={triggerRef}
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={listOpen}
                  aria-labelledby="service-label service-value"
                  onClick={() => (listOpen ? closeList() : openList())}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                      event.preventDefault();
                      openList();
                    }
                  }}
                  className={cn(
                    fieldClass,
                    "flex items-center justify-between pr-3.5 text-left cursor-pointer",
                    listOpen && "border-primary"
                  )}
                >
                  <span
                    id="service-value"
                    className={formData.service ? "text-foreground" : "text-foreground/50"}
                  >
                    {formData.service || "Escolha uma frente"}
                  </span>
                  <ChevronDown
                    aria-hidden
                    size={16}
                    className={cn(
                      "transition-transform duration-300 ease-(--ease-out-expo)",
                      listOpen && "rotate-180"
                    )}
                  />
                </button>
                <ul
                  ref={listRef}
                  role="listbox"
                  tabIndex={-1}
                  aria-labelledby="service-label"
                  aria-activedescendant={listOpen ? `service-option-${activeOption}` : undefined}
                  onKeyDown={onListKeyDown}
                  inert={!listOpen}
                  className="absolute top-[calc(100%+8px)] inset-x-0 flex flex-col rounded-[4px] border border-border bg-ink p-1.5 shadow-[0_24px_48px_rgba(0,0,0,0.6)] origin-top outline-none"
                  style={{
                    opacity: listOpen ? 1 : 0,
                    transform: listOpen ? "none" : "translateY(-6px) scaleY(0.96)",
                    visibility: listOpen ? "visible" : "hidden",
                    transition: `opacity 180ms ease-out, transform 320ms var(--ease-out-expo), visibility 0ms linear ${listOpen ? "0ms" : "200ms"}`,
                  }}
                >
                  {serviceOptions.map((option, i) => {
                    const selected = i === selectedIndex;
                    const active = i === activeOption;
                    return (
                      <li
                        key={`${opens}-${option.label}`}
                        id={`service-option-${i}`}
                        role="option"
                        aria-selected={selected}
                        onClick={() => choose(i)}
                        onPointerEnter={() => setActiveOption(i)}
                        style={{ "--stagger": `${40 + i * 28}ms` } as React.CSSProperties}
                        className={cn(
                          "flex min-h-11 items-center gap-3.5 rounded-[2px] px-3 font-mono text-sm cursor-pointer transition-[background-color,color] duration-150 ease-out [animation:otz-drop_360ms_var(--ease-out-expo)_var(--stagger)_both]",
                          active ? "bg-[#1B1B1B]" : "bg-transparent",
                          selected || active ? "text-foreground" : "text-foreground/80"
                        )}
                      >
                        <span
                          className={cn(
                            "w-7 flex-none text-[11px] tracking-[0.14em]",
                            selected ? "text-primary" : "text-muted"
                          )}
                        >
                          {option.num}
                        </span>
                        <span className="grow">{option.label}</span>
                        <Check
                          aria-hidden
                          size={16}
                          className={cn(
                            "text-primary transition-[opacity,transform] duration-[200ms,320ms] ease-(--ease-out-expo)",
                            selected ? "opacity-100" : "opacity-0 scale-60"
                          )}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="message" className={labelClass}>
                    Mensagem
                  </label>
                  <span
                    aria-live="polite"
                    className={cn(
                      "font-mono text-[11px] tracking-[0.06em] transition-colors duration-200",
                      tooShort ? "text-[#FF6B5F]" : "text-muted"
                    )}
                  >
                    {tooShort ? `Mínimo de ${MIN_MESSAGE} caracteres · ` : ""}
                    {length}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  maxLength={MAX_MESSAGE}
                  value={formData.message}
                  onChange={updateField("message")}
                  className={cn(fieldClass, "h-auto py-3 resize-y min-h-36 leading-relaxed")}
                  placeholder="Descreva o objetivo do estudo, prazo e contexto."
                />
                <div aria-hidden className="mt-2 h-0.5 overflow-hidden rounded-full bg-[#1C1C1C]">
                  <div
                    className="h-full origin-left transition-[transform,background-color] duration-[320ms,200ms] ease-(--ease-out-expo)"
                    style={{
                      transform: `scaleX(${progress})`,
                      backgroundColor: progress >= 1 ? "var(--primary)" : "#5A5A5A",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
                <Button
                  type="submit"
                  size="sm"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto overflow-hidden"
                >
                  {status === "submitting"
                    ? "[Enviando...]"
                    : "[Enviar solicitação]"}
                  {status === "submitting" && (
                    <span
                      aria-hidden
                      className="absolute left-0 bottom-0 h-[3px] w-2/5 bg-primary [animation:otz-sweep_900ms_cubic-bezier(0.65,0,0.35,1)_infinite]"
                    />
                  )}
                </Button>

                {feedback && (
                  <p
                    role="status"
                    aria-live="polite"
                    className={cn(
                      "inline-flex items-center gap-2.5 font-mono text-sm [animation:otz-slide_520ms_var(--ease-out-expo)_both]",
                      status === "success" ? "text-primary" : "text-red"
                    )}
                  >
                    {status === "success" && (
                      <svg
                        aria-hidden
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          d="M20 6 9 17l-5-5"
                          className="[stroke-dasharray:24] [animation:otz-draw_480ms_var(--ease-out-expo)_120ms_both]"
                        />
                      </svg>
                    )}
                    {feedback}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
