// Conteúdo compartilhado entre header, menu mobile, seções e formulário: as
// seis frentes e os trabalhos aparecem em vários lugares e precisam dizer a
// mesma coisa em todos.

export interface Service {
  num: string;
  title: string;
  /** Nome curto, para menus e para o seletor do formulário. */
  short: string;
  /** Uma linha, para o dropdown do header. */
  summary: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    num: "I",
    title: "Ciência de Dados",
    short: "Ciência de Dados",
    summary:
      "IBGE, RAIS, Datasus e portais de transparência em indicadores comparáveis.",
    description:
      "Integração e limpeza de bases públicas dispersas — IBGE, RAIS, Datasus, portais de transparência — em indicadores comparáveis entre municípios.",
    tags: ["IBGE", "RAIS", "Datasus", "Portais de transparência"],
  },
  {
    num: "II",
    title: "Machine Learning",
    short: "Machine Learning",
    summary:
      "Projeção de demanda, classificação de risco e segmentação de municípios.",
    description:
      "Modelos preditivos e de agrupamento: projeção de demanda, classificação de risco e segmentação de municípios por perfil produtivo.",
    tags: [
      "Projeção de demanda",
      "Classificação de risco",
      "Segmentação de municípios",
    ],
  },
  {
    num: "III",
    title: "Geoprocessamento",
    short: "Geoprocessamento",
    summary:
      "Cartografia temática e análise espacial: onde está a produção e por onde escoa.",
    description:
      "Cartografia temática e análise espacial: onde está a produção e por onde ela escoa.",
    tags: [
      "Cartografia temática",
      "Análise espacial",
      "Malha rodoviária e hidroviária",
    ],
  },
  {
    num: "IV",
    title: "Dashboards Interativos",
    short: "Dashboards Interativos",
    summary:
      "Filtros por recorte e período, com a leitura pronta para quem decide.",
    description:
      "Painéis onde o dado é explorado e explicado: filtros por recorte e período, séries que atualizam na mesma tela e a leitura pronta para quem decide.",
    tags: ["Filtros por recorte", "Séries por período", "Leitura para gestores"],
  },
  {
    num: "V",
    title: "Pesquisas Eleitorais",
    short: "Pesquisas Eleitorais",
    summary:
      "Intenção de voto, rejeição e avaliação de gestão, com margem declarada.",
    description:
      "Intenção de voto, rejeição e avaliação de gestão. Cada número sai com plano amostral, recorte e margem de erro declarados.",
    tags: [
      "Intenção de voto",
      "Rejeição",
      "Avaliação de gestão",
      "Margem de erro declarada",
    ],
  },
  {
    num: "VI",
    title: "Capacitação e Treinamento em Análise de Dados",
    short: "Capacitação em Dados",
    summary: "Leitura de indicadores, Excel avançado, SQL e visualização.",
    description:
      "Oficinas e trilhas formativas para equipes técnicas e gestores: leitura crítica de indicadores, Excel avançado, SQL, visualização e comunicação de dados.",
    tags: ["Leitura de indicadores", "Excel avançado", "SQL", "Visualização"],
  },
];

export const MAP_PDF = "/mapa-potencialidades-acre.pdf";

export type WorkType = "mapa" | "dashboard" | "pesquisa";

export interface Work {
  type: WorkType;
  label: string;
  /** Rótulo curto, para o dropdown do header. */
  shortLabel: string;
  title: string;
  description: string;
  meta: string;
  cta: string;
  href: string;
  /** Número grande do card, contado de 0 até o valor quando o card entra. */
  figure?: { value: number; label: string };
  figureLabel?: string;
}

export const works: Work[] = [
  {
    type: "mapa",
    label: "Mapa · Sebrae e Fórum Empresarial",
    shortLabel: "Mapa",
    title: "Mapa de Potencialidades do Acre",
    description:
      "Produção agropecuária e extrativa dos 22 municípios cruzada com a malha rodoviária e hidroviária.",
    meta: "22 municípios · 05 regionais · 02 modais",
    cta: "[Abrir PDF]",
    href: MAP_PDF,
  },
  {
    type: "dashboard",
    label: "Dashboard interativo",
    shortLabel: "Dashboard interativo",
    title: "Painel Municipal Integrado",
    description:
      "Indicadores econômicos do Mapa de Potencialidades do Acre, município a município, em um painel navegável.",
    meta: "forumdoacre.vercel.app",
    cta: "[Abrir dashboard]",
    href: "https://forumdoacre.vercel.app/",
    figureLabel: "Município a município",
  },
  {
    type: "pesquisa",
    label: "Pesquisa 2026",
    shortLabel: "Pesquisa 2026",
    title: "Ambiente de Negócios do Acre",
    description:
      "Diagnóstico e percepções empresariais, com o Índice de Ambiente de Negócios (IAN).",
    meta: "586 empresas · 12 municípios · IAN em 7 dimensões",
    cta: "[Abrir pesquisa]",
    href: "https://drive.google.com/drive/folders/1RnPrnfBJh_uD_DqTRpBUnyd6ivk__iGr",
    figure: { value: 586, label: "empresas ouvidas" },
  },
];

/**
 * Pede à seção de serviços que abra uma frente. O header e o menu mobile
 * disparam isto antes de rolar até #servicos.
 */
export const SELECT_SERVICE_EVENT = "otimiza:select-service";

export function selectService(index: number) {
  window.dispatchEvent(
    new CustomEvent<number>(SELECT_SERVICE_EVENT, { detail: index })
  );
}

/**
 * Pede ao formulário de contato que já venha com a frente escolhida. Usado
 * pelo botão "[Falar sobre este serviço]" da seção de serviços.
 */
export const PREFILL_CONTACT_EVENT = "otimiza:prefill-contact";

export function prefillContact(index: number) {
  window.dispatchEvent(
    new CustomEvent<number>(PREFILL_CONTACT_EVENT, { detail: index })
  );
}
