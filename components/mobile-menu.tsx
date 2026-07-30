"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileMenuProps {
  className?: string;
}

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Início", href: "/#inicio" },
    { name: "Serviços", href: "/#servicos" },
    { name: "Diferenciais", href: "/#diferenciais" },
    { name: "Trabalhos", href: "/#trabalhos" },
    { name: "Acre", href: "/#acre" },
    { name: "Contato", href: "/#contato" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 text-ink transition-colors",
            className
          )}
          aria-label="Open menu"
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-paper/95 backdrop-blur-sm animate-in fade-in duration-200"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-28 md:py-40 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-4 data-[state=open]:duration-300"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className="py-2 font-mono text-xl uppercase tracking-[0.08em] text-ink/60 transition-colors duration-150 ease-out hover:text-ink"
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/#contato"
              onClick={handleLinkClick}
              className="inline-block py-2 font-mono text-xl uppercase tracking-[0.08em] text-terracotta transition-colors duration-150 ease-out hover:text-terracotta/80"
            >
              Falar com a Otimiza
            </Link>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
