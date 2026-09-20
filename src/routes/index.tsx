import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Leaf, Minus, Plus, ShoppingBag, ShieldCheck, Truck, Heart, ChevronLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import praiaAsset from "@/assets/moka-praia.jpg.asset.json";
import etiquetaAsset from "@/assets/moka-etiqueta.jpg.asset.json";
import piscinaAsset from "@/assets/moka-piscina.jpg.asset.json";
import toalhasAsset from "@/assets/moka-praia-toalhas.jpg.asset.json";
import colecaoAsset from "@/assets/moka-colecao.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Moka — Puffes de praia feitos para ficar" },
    { name: "description", content: "Descubra os produtos Moka: puffes, lancheiras, necessaires e mais, feitos à mão em Portugal." },
    { property: "og:title", content: "Moka — Puffes de praia feitos para ficar" },
    { property: "og:description", content: "Conforto para levar consigo, da varanda até à praia." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const SHIPPING = 4.99;
const PERSONALIZATION_PRICE = 5;
const eur = (value: number) => Number.isInteger(value) ? `${value} €` : `${value.toFixed(2).replace(".", ",")} €`;

// ── Percinta options — now image-based ──────────────────────────────────────
export type PercintaOption = { id: string; name: string; desc: string; image: string; alt: string };
export const percintas: PercintaOption[] = [
  { id: "palha",   name: "Palha",   desc: "Riscas douradas e branco",   image: "/images/percinta-palha.jpg",   alt: "Percinta às riscas palha e branco" },
  { id: "violeta", name: "Violeta", desc: "Riscas violeta e amarelo",   image: "/images/percinta-violeta.jpg", alt: "Percinta às riscas violeta e amarelo" },
  { id: "jardim",  name: "Jardim",  desc: "Estampado floral paisley",   image: "/images/percinta-jardim.jpg",  alt: "Percinta com estampado paisley floral" },
  { id: "serena",  name: "Serena",  desc: "Flores brancas em azul",     image: "/images/percinta-serena.jpg",  alt: "Percinta com flores brancas em fundo azul" },
  { id: "coral",   name: "Coral",   desc: "Estampado coral vermelho",   image: "/images/percinta-coral.jpg",   alt: "Percinta com estampado coral vermelho" },
];

// ── Fabric models — apelidos portugueses tradicionais ────────────────────────
type FabricModel = { id: string; name: string; subtitle: string; image: string; alt: string };
const fabricModels: FabricModel[] = [
  { id: "ferreira", name: "Ferreira", subtitle: "Riscas rosa e cru",          image: "/images/tecido-riscas-rosa.jpg",      alt: "Tecido Ferreira às riscas rosa e cru" },
  { id: "carvalho", name: "Carvalho", subtitle: "Liso violeta texturado",      image: "/images/tecido-violeta.jpg",          alt: "Tecido Carvalho liso violeta" },
  { id: "azevedo",  name: "Azevedo",  subtitle: "Riscas bege e branco",        image: "/images/tecido-riscas-bege.jpg",      alt: "Tecido Azevedo às riscas bege e branco" },
  { id: "monteiro", name: "Monteiro", subtitle: "Estampado folha verde",       image: "/images/tecido-folha-verde.jpg",      alt: "Tecido Monteiro estampado com folhas verdes" },
  { id: "fonseca",  name: "Fonseca",  subtitle: "Estampado folha multicolor",  image: "/images/tecido-folha-multicolor.jpg", alt: "Tecido Fonseca estampado com folhas multicolor" },
  { id: "alves",    name: "Alves",    subtitle: "Riscas palha e branco",       image: "/images/tecido-riscas-palha.jpg",     alt: "Tecido Alves às riscas palha e branco" },
  { id: "tavares",  name: "Tavares",  subtitle: "Riscas violeta e amarelo",    image: "/images/tecido-riscas-violeta.jpg",   alt: "Tecido Tavares às riscas violeta e amarelo" },
  { id: "mendes",   name: "Mendes",   subtitle: "Estampado paisley floral",    image: "/images/tecido-paisley.jpg",          alt: "Tecido Mendes com estampado paisley floral" },
  { id: "silveira", name: "Silveira", subtitle: "Flores brancas em azul",      image: "/images/tecido-flores-azul.jpg",      alt: "Tecido Silveira com flores brancas em azul" },
  { id: "meireles", name: "Meireles", subtitle: "Estampado coral vermelho",    image: "/images/tecido-coral.jpg",            alt: "Tecido Meireles com coral vermelho" },
];

// ── SVG icons for product categories ────────────────────────────────────────
function PuffeIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="10" y="28" width="60" height="32" rx="16" fill="currentColor" opacity="0.15"/>
      <rect x="14" y="32" width="52" height="24" rx="12" fill="currentColor" opacity="0.3"/>
      <path d="M22 44 Q40 36 58 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <rect x="34" y="56" width="12" height="6" rx="3" fill="currentColor" opacity="0.4"/>
    </svg>
  );
}
function LancheiraIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="16" y="28" width="48" height="38" rx="6" fill="currentColor" opacity="0.15"/>
      <rect x="20" y="32" width="40" height="30" rx="4" fill="currentColor" opacity="0.25"/>
      <path d="M30 28 Q30 18 40 18 Q50 18 50 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.5"/>
      <line x1="20" y1="44" x2="60" y2="44" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
      <circle cx="40" cy="38" r="3" fill="currentColor" opacity="0.5"/>
    </svg>
  );
}
function NecessaireIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="18" y="30" width="44" height="34" rx="8" fill="currentColor" opacity="0.15"/>
      <rect x="22" y="34" width="36" height="26" rx="6" fill="currentColor" opacity="0.25"/>
      <path d="M28 30 L28 24 Q28 20 32 20 L48 20 Q52 20 52 24 L52 30" stroke="currentColor" strokeWidth="2.5" fill="none" opacity="0.5"/>
      <circle cx="40" cy="47" r="4" fill="currentColor" opacity="0.4"/>
      <line x1="38" y1="47" x2="42" y2="47" stroke="white" strokeWidth="1.5"/>
      <line x1="40" y1="45" x2="40" y2="49" stroke="white" strokeWidth="1.5"/>
    </svg>
  );
}
function PortaTalheresIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="20" y="18" width="40" height="48" rx="6" fill="currentColor" opacity="0.15"/>
      <rect x="24" y="22" width="32" height="40" rx="4" fill="currentColor" opacity="0.25"/>
      <line x1="34" y1="26" x2="34" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="40" y1="26" x2="40" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="46" y1="26" x2="46" y2="58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M22 38 Q40 34 58 38" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4"/>
    </svg>
  );
}
function GuardaFatoIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <line x1="40" y1="12" x2="40" y2="22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6"/>
      <path d="M32 22 Q40 16 48 22 L54 30 L26 30 Z" fill="currentColor" opacity="0.3"/>
      <rect x="22" y="30" width="36" height="38" rx="4" fill="currentColor" opacity="0.15"/>
      <rect x="26" y="34" width="28" height="30" rx="3" fill="currentColor" opacity="0.25"/>
      <line x1="40" y1="38" x2="40" y2="60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
    </svg>
  );
}

// ── Product categories ───────────────────────────────────────────────────────
type ProductCategory = { id: string; name: string; subtitle: string; price: number; icon: React.ReactNode; image?: string };
const productCategories: ProductCategory[] = [
  { id: "puffe",          name: "Puffe Moka",            subtitle: "Conforto da praia ao jardim",  price: 40, icon: <PuffeIcon />,          image: praiaAsset.url },
  { id: "lancheira",      name: "Lancheira Impermeável", subtitle: "Fresca e resistente à água",   price: 30, icon: <LancheiraIcon /> },
  { id: "necessaire",     name: "Necessaire Moka",       subtitle: "Organização com estilo",        price: 18, icon: <NecessaireIcon /> },
  { id: "porta-talheres", name: "Porta Talheres Moka",   subtitle: "Para levar a refeição",         price: 12, icon: <PortaTalheresIcon /> },
  { id: "guarda-fato",    name: "Guarda-fato Moka",      subtitle: "Protege e decora",              price: 25, icon: <GuardaFatoIcon /> },
];

const gallery: Array<[string, string, string]> = [
  [toalhasAsset.url, "Puffe Moka Lilás na praia, sobre as toalhas", "Na praia"],
  [piscinaAsset.url, "Puffe Moka Folha à beira da piscina", "Na piscina"],
  [colecaoAsset.url, "Coleção Moka: quatro puffes no jardim", "Toda a família"],
];
const benefits: Array<[React.ComponentType<{ className?: string }>, string, string]> = [
  [Truck, "Envio 4,99 €",               "Portugal Continental"],
  [Heart, "Feito à mão com carinho",    "Cosido com calma, peça a peça"],
  [Leaf,  "10% de desconto na 2ª Moka", "Desconto automático no carrinho"],
];
const questions: Array<[string, string]> = [
  ["O puffe pode molhar-se?",    "A capa exterior repele salpicos e seca rapidamente."],
  ["Como se lava?",              "Retire a capa pelo fecho protegido e lave a 30 ºC, num programa delicado. Deixe secar naturalmente."],
  ["O enchimento está incluído?","Sim. Todos os puffes Moka são entregues completos e prontos a usar. Também temos o serviço de encher puffes ou arranjos."],
  ["Quanto demora a entrega?",   "Em Portugal Continental, a entrega estimada é de 2 a 4 dias úteis após expedição."],
  ["Posso personalizar?",        "Sim! Pode adicionar até duas palavras bordadas ou impressas em qualquer produto por apenas +5 €."],
];
const paymentMethods: Array<[string, string]> = [["visa", "VISA"], ["mbway", "MB WAY"], ["revolut", "Revolut"]];

function Brand() {
  return <span className="font-display text-3xl leading-none tracking-normal">moka<span className="text-accent">.</span></span>;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
const CART_SEP = "|";
const buildKey = (categoryId: string, modelId: string, percintaId: string, personalization: string) =>
  [categoryId, modelId, percintaId, personalization.trim()].join(CART_SEP);

const parseKey = (key: string) => {
  const [categoryId, modelId, percintaId, ...rest] = key.split(CART_SEP);
  return { categoryId, modelId, percintaId, personalization: rest.join(CART_SEP) };
};

const validateWords = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length <= 2;
};

// ── Shop — 3-step selection flow ─────────────────────────────────────────────
type ShopStep = "category" | "model" | "percinta";

function ShopSection({ onAddToCart }: { onAddToCart: (key: string) => void }) {
  const [step, setStep]                         = useState<ShopStep>("category");
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);
  const [selectedModel, setSelectedModel]       = useState<FabricModel | null>(null);
  const [selectedPercinta, setSelectedPercinta] = useState<string>("palha");
  const [personalizeOn, setPersonalizeOn]       = useState(false);
  const [personalizeText, setPersonalizeText]   = useState("");
  const [wordError, setWordError]               = useState(false);

  const goToModel = (cat: ProductCategory) => { setSelectedCategory(cat); setStep("model"); };
  const goToPercinta = (model: FabricModel) => { setSelectedModel(model); setSelectedPercinta("palha"); setPersonalizeOn(false); setPersonalizeText(""); setWordError(false); setStep("percinta"); };
  const goBack = () => {
    if (step === "percinta") setStep("model");
    else if (step === "model") { setStep("category"); setSelectedCategory(null); }
  };

  const handlePersonalizeText = (v: string) => {
    setPersonalizeText(v);
    setWordError(!validateWords(v));
  };

  const handleConfirm = () => {
    if (!selectedCategory || !selectedModel) return;
    if (personalizeOn && wordError) return;
    const personalization = personalizeOn ? personalizeText.trim() : "";
    const key = buildKey(selectedCategory.id, selectedModel.id, selectedPercinta, personalization);
    onAddToCart(key);
    setStep("category"); setSelectedCategory(null); setSelectedModel(null);
    setSelectedPercinta("palha"); setPersonalizeOn(false); setPersonalizeText(""); setWordError(false);
  };

  const stepIdx = step === "category" ? 0 : step === "model" ? 1 : 2;
  const selPercinta = percintas.find((p) => p.id === selectedPercinta);

  return (
    <section id="colecao" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">

      {/* ── Header & Breadcrumb ── */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Coleção Moka · 10% na 2ª peça</p>
        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <button className={`font-display tracking-normal transition-colors ${step === "category" ? "text-4xl sm:text-5xl text-foreground" : "text-2xl sm:text-3xl text-muted-foreground hover:text-foreground"}`}
            onClick={() => { setStep("category"); setSelectedCategory(null); setSelectedModel(null); }}>
            Produtos
          </button>
          {selectedCategory && (<>
            <span className="text-muted-foreground text-xl">/</span>
            <button className={`font-display tracking-normal transition-colors ${step === "model" ? "text-4xl sm:text-5xl text-foreground" : "text-2xl sm:text-3xl text-muted-foreground hover:text-foreground"}`}
              onClick={() => step === "percinta" && setStep("model")}>
              {selectedCategory.name}
            </button>
          </>)}
          {selectedModel && step === "percinta" && (<>
            <span className="text-muted-foreground text-xl">/</span>
            <span className="font-display text-4xl sm:text-5xl tracking-normal text-foreground">{selectedModel.name}</span>
          </>)}
        </div>

        {step !== "category" && (
          <button onClick={goBack} className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="size-4" /> Voltar
          </button>
        )}

        {/* Step indicator */}
        <div className="mt-6 flex items-center gap-0 flex-wrap">
          {[["1","Produto"],["2","Padrão"],["3","Percinta"]].map(([num, label], idx) => {
            const active = idx === stepIdx, done = idx < stepIdx;
            return (
              <div key={num} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold transition-colors ${active ? "text-foreground" : done ? "text-accent" : "text-muted-foreground"}`}>
                  <span className={`grid size-5 place-items-center rounded-full text-[10px] ${active ? "bg-primary text-primary-foreground" : done ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                    {done ? <Check className="size-3" /> : num}
                  </span>
                  {label}
                </div>
                {idx < 2 && <span className="text-muted-foreground/40 text-xs">→</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Step 1: Product Categories ── */}
      {step === "category" && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {productCategories.map((cat) => (
            <article key={cat.id} className="group cursor-pointer" onClick={() => goToModel(cat)}>
              <div className="relative aspect-square overflow-hidden bg-secondary border border-border transition-all duration-300 group-hover:border-primary">
                {cat.image
                  ? <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  : <div className="flex h-full w-full items-center justify-center text-primary p-10">{cat.icon}</div>
                }
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
              </div>
              <div className="py-4">
                <h3 className="font-display text-xl">{cat.name}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{cat.subtitle}</p>
                <p className="mt-2 text-sm font-semibold">a partir de {eur(cat.price)}</p>
              </div>
              <Button variant="outline" className="h-10 w-full rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm">
                Ver padrões <ArrowRight className="size-3.5" />
              </Button>
            </article>
          ))}
        </div>
      )}

      {/* ── Step 2: Fabric Models ── */}
      {step === "model" && selectedCategory && (
        <div>
          <p className="mb-8 text-sm text-muted-foreground max-w-md">
            Escolha o padrão de tecido para o <strong className="text-foreground">{selectedCategory.name}</strong>.
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {fabricModels.map((model) => (
              <article key={model.id} className="group cursor-pointer" onClick={() => goToPercinta(model)}>
                <div className="relative aspect-square overflow-hidden bg-muted border border-border transition-all duration-300 group-hover:border-primary">
                  <img src={model.image} alt={model.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
                </div>
                <div className="py-4">
                  <h3 className="font-display text-xl">{model.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">{model.subtitle}</p>
                  <p className="mt-2 text-sm font-semibold">{eur(selectedCategory.price)}</p>
                </div>
                <Button variant="outline" className="h-10 w-full rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm">
                  Escolher percinta <ArrowRight className="size-3.5" />
                </Button>
              </article>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3: Percinta + Personalização ── */}
      {step === "percinta" && selectedCategory && selectedModel && (
        <div className="max-w-3xl">
          <p className="mb-8 text-sm text-muted-foreground">
            Escolha a percinta e personalize o seu <strong className="text-foreground">{selectedCategory.name} {selectedModel.name}</strong>.
          </p>

          <div className="flex flex-col gap-8 sm:flex-row">
            {/* Model preview */}
            <div className="w-full sm:w-44 shrink-0">
              <div className="aspect-square overflow-hidden border border-border">
                <img src={selectedModel.image} alt={selectedModel.alt} className="h-full w-full object-cover" />
              </div>
              <p className="mt-2 text-xs text-center text-muted-foreground">{selectedModel.name}</p>
            </div>

            <div className="flex-1 flex flex-col gap-7">
              {/* Percinta image selector */}
              <div>
                <p className="mb-4 text-sm font-semibold">Cor da percinta</p>
                <div className="grid grid-cols-5 gap-2">
                  {percintas.map((pc) => (
                    <button key={pc.id} onClick={() => setSelectedPercinta(pc.id)}
                      className={`group/pc relative flex flex-col items-center gap-1.5 transition-all`}>
                      <div className={`relative aspect-square w-full overflow-hidden border-2 transition-all duration-200 ${selectedPercinta === pc.id ? "border-primary scale-105 shadow-md" : "border-border hover:border-primary/50"}`}>
                        <img src={pc.image} alt={pc.alt} className="h-full w-full object-cover" />
                        {selectedPercinta === pc.id && (
                          <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                            <Check className="size-4 text-primary drop-shadow-sm" />
                          </div>
                        )}
                      </div>
                      <span className={`text-[10px] font-medium text-center leading-tight ${selectedPercinta === pc.id ? "text-primary" : "text-muted-foreground"}`}>{pc.name}</span>
                    </button>
                  ))}
                </div>
                {selPercinta && (
                  <p className="mt-3 text-xs text-muted-foreground">{selPercinta.desc}</p>
                )}
              </div>

              {/* Personalização */}
              <div className="border border-border rounded-none p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Pencil className="size-4 text-accent" />
                    <div>
                      <p className="text-sm font-semibold">Personalizar</p>
                      <p className="text-xs text-muted-foreground">Adicione até 2 palavras bordadas</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-accent">+{eur(PERSONALIZATION_PRICE)}</span>
                    <button
                      onClick={() => { setPersonalizeOn(!personalizeOn); if (personalizeOn) { setPersonalizeText(""); setWordError(false); } }}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${personalizeOn ? "bg-primary" : "bg-muted"}`}
                      aria-label="Ativar personalização"
                    >
                      <span className={`inline-block size-3.5 rounded-full bg-white shadow transition-transform ${personalizeOn ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </div>
                </div>
                {personalizeOn && (
                  <div className="mt-4">
                    <Input
                      placeholder="Ex: João & Maria"
                      value={personalizeText}
                      onChange={(e) => handlePersonalizeText(e.target.value)}
                      className={`rounded-none ${wordError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      maxLength={30}
                    />
                    {wordError && <p className="mt-1.5 text-xs text-destructive">Máximo 2 palavras.</p>}
                    {!wordError && personalizeText && (
                      <p className="mt-1.5 text-xs text-muted-foreground">{personalizeText.trim().split(/\s+/).filter(Boolean).length}/2 palavras</p>
                    )}
                  </div>
                )}
              </div>

              {/* Summary & CTA */}
              <div className="border-t border-border pt-5">
                <div className="flex items-center justify-between mb-1.5 text-sm">
                  <span className="text-muted-foreground">{selectedCategory.name} · {selectedModel.name} · {selPercinta?.name}</span>
                </div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-muted-foreground">{personalizeOn && personalizeText ? `+ personalização: "${personalizeText.trim()}"` : ""}</span>
                  <span className="font-semibold">{eur(selectedCategory.price + (personalizeOn && !wordError ? PERSONALIZATION_PRICE : 0))}</span>
                </div>
                <Button className="h-12 w-full rounded-none" onClick={handleConfirm} disabled={personalizeOn && wordError}>
                  Adicionar ao carrinho <ShoppingBag className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
function Index() {
  const [cart, setCart]         = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered]   = useState(false);

  const cartItems = Object.entries(cart)
    .filter(([_, qty]) => qty > 0)
    .map(([key, qty]) => {
      const { categoryId, modelId, percintaId, personalization } = parseKey(key);
      const category = productCategories.find((c) => c.id === categoryId);
      const model    = fabricModels.find((m) => m.id === modelId);
      const percinta = percintas.find((p) => p.id === percintaId);
      const hasPersonalization = !!personalization;
      const itemPrice = (category?.price ?? 0) + (hasPersonalization ? PERSONALIZATION_PRICE : 0);
      return { key, category: category!, model: model!, percinta: percinta!, personalization, hasPersonalization, itemPrice, qty };
    })
    .filter((item) => item.category && item.model && item.percinta);

  const count    = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.itemPrice, 0);
  const allPrices = cartItems.flatMap((item) => Array(item.qty).fill(item.itemPrice));
  const discount  = allPrices.reduce((acc, price, idx) => (idx % 2 === 1 ? acc + price * 0.1 : acc), 0);
  const total     = count > 0 ? subtotal - discount + SHIPPING : 0;

  const updateItem = (key: string, delta: number) => {
    setCart((prev) => {
      const next = Math.max(0, (prev[key] ?? 0) + delta);
      if (next === 0) { const copy = { ...prev }; delete copy[key]; return copy; }
      return { ...prev, [key]: next };
    });
  };

  const handleAddToCart = (key: string) => {
    setCart((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + 1 }));
    setCartOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
        10% de desconto na 2ª Moka · Envio 4,99 € · Portugal Continental · Entregas em 2–4 dias úteis
      </div>

      <header className="absolute top-8 z-20 w-full border-b border-primary-foreground/25 text-primary-foreground">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#inicio" aria-label="Moka — início"><Brand /></a>
          <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Navegação principal">
            <a href="#inicio"    className="transition-opacity hover:opacity-70">Início</a>
            <a href="#historia"  className="transition-opacity hover:opacity-70">A nossa história</a>
            <a href="#colecao"   className="transition-opacity hover:opacity-70">Coleção</a>
            <a href="#moka"      className="transition-opacity hover:opacity-70">O puffe</a>
            <a href="#perguntas" className="transition-opacity hover:opacity-70">Ajuda</a>
          </nav>

          <Sheet open={cartOpen} onOpenChange={(open) => { setCartOpen(open); if (!open) { setCheckout(false); setOrdered(false); } }}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground" aria-label={`Carrinho com ${count} artigos`}>
                <ShoppingBag />
                {count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">{count}</span>}
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
              <SheetHeader className="border-b p-6">
                <SheetTitle className="font-display text-3xl font-normal">O seu carrinho</SheetTitle>
                <SheetDescription>{count ? `${count} ${count === 1 ? "artigo" : "artigos"}` : "Ainda não adicionou nenhum produto."}</SheetDescription>
              </SheetHeader>

              {ordered ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <span className="mb-5 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></span>
                  <h2 className="font-display text-3xl">Pedido recebido</h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">Esta é uma demonstração. A sua encomenda não foi cobrada.</p>
                </div>
              ) : checkout ? (
                <Checkout total={total} onBack={() => setCheckout(false)} onSubmit={() => setOrdered(true)} />
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    {count === 0 ? (
                      <div className="grid h-full place-items-center text-sm text-muted-foreground">Escolha o seu lugar ao sol.</div>
                    ) : cartItems.map((item) => (
                      <div key={item.key} className="flex gap-4 border-b py-4 first:pt-0">
                        <div className="h-24 w-20 rounded overflow-hidden bg-secondary shrink-0">
                          <img src={item.model.image} alt={item.model.alt} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <p className="font-medium text-sm">{item.category.name}</p>
                            <p className="text-xs text-muted-foreground">{item.model.name}</p>
                            <div className="mt-1.5 flex items-center gap-1.5">
                              <div className="size-3 shrink-0 overflow-hidden rounded-full border border-border">
                                <img src={item.percinta.image} alt={item.percinta.alt} className="h-full w-full object-cover" />
                              </div>
                              <span className="text-[11px] font-medium text-foreground/80">Percinta: {item.percinta.name}</span>
                            </div>
                            {item.hasPersonalization && (
                              <div className="mt-1 flex items-center gap-1">
                                <Pencil className="size-2.5 text-accent" />
                                <span className="text-[11px] text-accent font-medium">"{item.personalization}"</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center border">
                              <Button variant="ghost" size="icon" className="size-7 rounded-none" onClick={() => updateItem(item.key, -1)} aria-label="Diminuir"><Minus /></Button>
                              <span className="w-7 text-center text-xs">{item.qty}</span>
                              <Button variant="ghost" size="icon" className="size-7 rounded-none" onClick={() => updateItem(item.key, 1)} aria-label="Aumentar"><Plus /></Button>
                            </div>
                            <span className="text-sm font-semibold">{eur(item.itemPrice * item.qty)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {count > 0 && (
                    <div className="border-t p-6">
                      <div className="mb-2 flex justify-between text-sm"><span>Subtotal</span><span>{eur(subtotal)}</span></div>
                      {discount > 0 && <div className="mb-2 flex justify-between text-sm font-semibold text-accent"><span>Desconto 2ª Moka (-10%)</span><span>-{eur(discount)}</span></div>}
                      <div className="mb-2 flex justify-between text-sm"><span>Envio</span><span>{eur(SHIPPING)}</span></div>
                      <div className="mb-2 flex justify-between text-sm font-semibold"><span>Total</span><strong>{eur(total)}</strong></div>
                      {count === 1 && <div className="mb-3 rounded border border-accent/30 bg-accent/10 px-3 py-2 text-xs text-accent-foreground">💡 Adicione uma 2ª Moka e tenha <strong>10% de desconto</strong> nessa unidade!</div>}
                      {discount > 0 && <div className="mb-3 rounded border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary">🎉 <strong>10% de desconto aplicado</strong> na 2ª Moka!</div>}
                      <p className="mb-5 text-xs text-muted-foreground">Impostos incluídos.</p>
                      <Button className="h-12 w-full rounded-none" onClick={() => setCheckout(true)}>Finalizar compra <ArrowRight /></Button>
                    </div>
                  )}
                </>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="inicio" className="relative min-h-[760px] overflow-hidden sm:min-h-[820px]">
        <img src={praiaAsset.url} alt="Puffe Moka na areia, frente ao mar" className="absolute inset-0 h-full w-full object-cover object-bottom" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/30 to-transparent" />
        <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-16 pt-32 text-primary-foreground sm:min-h-[820px] sm:items-center sm:px-8 sm:pb-0">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em]">Portugal Handmade · 10% na 2ª Moka</p>
            <h1 className="font-display text-4xl leading-[1.04] tracking-normal sm:text-6xl">O verão pede praia,<br />a praia pede Moka.</h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-primary-foreground/90 sm:text-lg">Peças nascidas de um curso de costura e da paixão pelo trabalho manual. Feitas à mão, uma a uma com calma e carinho, para que goste tanto delas como eu gosto de as criar.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-none bg-accent px-7 text-accent-foreground hover:bg-accent/90"><a href="#colecao">Descobrir a coleção <ArrowRight /></a></Button>
              <Button asChild variant="outline" size="lg" className="h-12 rounded-none border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"><a href="#historia">A nossa história</a></Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── História ── */}
      <section id="historia" className="border-b border-border bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">A nossa história · Feito à mão</p>
          <h2 className="mt-3 font-display text-4xl tracking-normal text-foreground sm:text-5xl">Ponto por ponto, feito com calma e carinho.</h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">A história da <strong className="font-semibold text-foreground">Moka</strong> começou quando decidi tirar um curso de costura e me apaixonei pela criação manual. Longe da produção industrial em série, crio e coso cada peça à mão, com calma, tempo e verdadeiro carinho, para que quem leva uma Moka para a praia sinta toda essa dedicação e goste tanto dela quanto eu gosto de a fazer.</p>
          <p className="mt-6 font-display text-lg text-primary sm:text-xl">— Da minha oficina até ao seu lugar ao sol.</p>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">
          {benefits.map(([Icon, title, text]) => (
            <div key={title} className="flex items-center gap-4 py-6 sm:px-8 sm:first:pl-0">
              <Icon className="size-5 text-accent" />
              <div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shop ── */}
      <ShopSection onAddToCart={handleAddToCart} />

      {/* ── Gallery ── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
          <div className="mb-8 flex items-baseline justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Moka por aí</p>
            <p className="hidden text-sm text-muted-foreground md:block">Onde os seus levam o nosso.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {gallery.map(([image, alt, caption]) => (
              <figure key={alt} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
                </div>
                <figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── O puffe ── */}
      <section id="moka" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="min-h-[480px]"><img src={etiquetaAsset.url} alt="Etiqueta Moka bordada num puffe de riscas" loading="lazy" className="h-full w-full object-cover" /></div>
          <div className="flex items-center px-7 py-16 sm:px-14 lg:px-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Por dentro da Moka</p>
              <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Leve no caminho.<br />Sério no conforto.</h2>
              <p className="mt-6 max-w-md leading-7 text-primary-foreground/75">A forma adapta-se ao corpo e cria apoio onde precisa. A capa exterior aguenta o uso, sai para lavar e a pega reforçada simplifica cada viagem.</p>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-8">
                <div><dt className="font-display text-3xl">70 × 70</dt><dd className="mt-1 text-xs text-primary-foreground/65">centímetros</dd></div>
                <div><dt className="font-display text-3xl">UV 50+</dt><dd className="mt-1 text-xs text-primary-foreground/65">cor mais protegida</dd></div>
                <div><dt className="font-display text-3xl">100%</dt><dd className="mt-1 text-xs text-primary-foreground/65">capa removível</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="perguntas" className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Antes de ir</p>
          <h2 className="mt-3 font-display text-5xl">Perguntas frequentes.</h2>
        </div>
        <Accordion type="single" collapsible>
          {questions.map(([q, a]) => (
            <AccordionItem value={q} key={q}>
              <AccordionTrigger className="py-6 text-base hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-6 leading-6 text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="flex flex-col justify-between gap-10 border-b border-background/20 pb-12 sm:flex-row">
            <div>
              <Brand />
              <p className="mt-4 max-w-xs text-sm leading-6 text-background/65">Puffes desenhados para dias longos, dentro e fora de casa.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 text-sm">
              <div>
                <p className="mb-3 font-semibold">Apoio</p>
                <a href="mailto:mokaportugal@gmail.com" className="block py-1 text-background/65 hover:text-background transition-colors">mokaportugal@gmail.com</a>
                <a href="#perguntas" className="block py-1 text-background/65 hover:text-background transition-colors">Perguntas frequentes</a>
              </div>
              <div>
                <p className="mb-3 font-semibold">Segue-nos</p>
                <a href="https://instagram.com/moka_portugal_" target="_blank" rel="noopener noreferrer" className="block py-1 text-background/65 hover:text-background transition-colors">moka_portugal_</a>
                <span className="block py-1 text-background/65">Portugal</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-xs text-background/50 sm:flex-row sm:justify-between">
            <span>© 2026 Moka. Todos os direitos reservados.</span>
            <span>Visa · MB WAY · Revolut</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Checkout({ total, onBack, onSubmit }: { total: number; onBack: () => void; onSubmit: () => void }) {
  const [method, setMethod] = useState("mbway");
  return (
    <div className="flex flex-1 flex-col overflow-y-auto p-6">
      <Button variant="ghost" className="mb-4 w-fit px-0 text-muted-foreground" onClick={onBack}>← Voltar</Button>
      <h2 className="font-display text-3xl">Finalizar compra</h2>
      <p className="mt-1 text-sm text-muted-foreground">Envio 4,99 € · Total {eur(total)}</p>
      <div className="mt-7 grid gap-3">
        <Input placeholder="Nome completo" aria-label="Nome completo" />
        <Input type="email" placeholder="Email" aria-label="Email" />
        <Input placeholder="Morada" aria-label="Morada" />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Código postal" aria-label="Código postal" />
          <Input placeholder="Localidade" aria-label="Localidade" />
        </div>
      </div>
      <fieldset className="mt-8">
        <legend className="mb-3 text-sm font-semibold">Método de pagamento</legend>
        <div className="grid grid-cols-3 gap-2">
          {paymentMethods.map(([id, label]) => (
            <label key={id} className={`cursor-pointer border p-3 text-center text-xs font-semibold transition-colors ${method === id ? "border-primary bg-secondary" : "border-border"}`}>
              <input type="radio" name="payment" value={id} checked={method === id} onChange={() => setMethod(id)} className="sr-only" />{label}
            </label>
          ))}
        </div>
      </fieldset>
      {method === "mbway" && <Input className="mt-4" type="tel" placeholder="Número de telemóvel" aria-label="Número MB WAY" />}
      {method === "visa" && (
        <div className="mt-4 grid gap-3">
          <Input inputMode="numeric" placeholder="Número do cartão" aria-label="Número do cartão" />
          <div className="grid grid-cols-2 gap-3">
            <Input placeholder="MM / AA" aria-label="Validade" />
            <Input placeholder="CVC" aria-label="CVC" />
          </div>
        </div>
      )}
      <div className="mt-auto pt-8">
        <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4" /> Pagamento seguro e encriptado</div>
        <Button className="h-12 w-full rounded-none" onClick={onSubmit}>Pagar {eur(total)}</Button>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">Modo de demonstração — não será efetuada qualquer cobrança.</p>
      </div>
    </div>
  );
}
