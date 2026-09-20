import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check, Leaf, Minus, Plus, ShoppingBag, ShieldCheck, Truck, Recycle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import praiaAsset from "@/assets/moka-praia.jpg.asset.json";
import lilasAsset from "@/assets/moka-lilas.jpg.asset.json";
import rosaAsset from "@/assets/moka-rosa.jpg.asset.json";
import relvaAsset from "@/assets/moka-relva.jpg.asset.json";
import colecaoAsset from "@/assets/moka-colecao.jpg.asset.json";
import etiquetaAsset from "@/assets/moka-etiqueta.jpg.asset.json";
import piscinaAsset from "@/assets/moka-piscina.jpg.asset.json";
import toalhasAsset from "@/assets/moka-praia-toalhas.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Moka — Puffes de praia feitos para ficar" },
    { name: "description", content: "Descubra os puffes Moka: confortáveis, resistentes à água e fáceis de transportar." },
    { property: "og:title", content: "Moka — Puffes de praia feitos para ficar" },
    { property: "og:description", content:Conforto para levar consigo, da varanda até à praia." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const SHIPPING = 4.99;
const eur = (value: number) => Number.isInteger(value) ? `${value} €` : `${value.toFixed(2).replace(".", ",")} €`;

type Product = { id: string; name: string; subtitle: string; price: number; image: string; alt: string };
const products: Product[] = [
  { id: "verde", name: "Moka Maré", subtitle: "Riscas verde e natural", price: 129, image: praiaAsset.url, alt: "Puffe Moka Maré às riscas verdes na areia, frente ao mar" },
  { id: "rosa", name: "Moka Coral", subtitle: "Riscas rosa e natural", price: 129, image: rosaAsset.url, alt: "Puffe Moka Coral às riscas rosa ao ombro" },
  { id: "lilas", name: "Moka Lilás", subtitle: "Riscas lilás e natural", price: 129, image: lilasAsset.url, alt: "Puffe Moka Lilás às riscas lilás e natural" },
  { id: "folha", name: "Moka Folha", subtitle: "Estampado de folhas", price: 129, image: relvaAsset.url, alt: "Puffe Moka Folha estampado na relva" },
];
const gallery: Array<[string, string, string]> = [
  [toalhasAsset.url, "Puffe Moka Lilás na praia, sobre as toalhas", "Na praia"],
  [piscinaAsset.url, "Puffe Moka Folha à beira da piscina", "Na piscina"],
  [colecaoAsset.url, "Coleção Moka: quatro puffes no jardim", "Toda a família"],
];
const benefits: Array<[typeof Truck, string, string]> = [
  [Truck, "Envio 4,99 €", "Portugal Continental"],
  [Recycle, "Material sustentável", "Tecidos e enchimentos responsáveis"],
  [Leaf, "Feito para durar", "Capa lavável e resistente"],
];
const questions: Array<[string, string]> = [
  ["O puffe pode molhar-se?", "A capa exterior repele salpicos e seca rapidamente. Para preservar o enchimento, não deve ficar submerso nem passar a noite à chuva."],
  ["Como se lava?", "Retire a capa pelo fecho protegido e lave a 30 ºC, num programa delicado. Deixe secar naturalmente."],
  ["O enchimento está incluído?", "Sim. Todos os puffes Moka são entregues completos e prontos a usar."],
  ["Quanto demora a entrega?", "Em Portugal Continental, a entrega estimada é de 2 a 4 dias úteis após expedição."],
];
const paymentMethods: Array<[string, string]> = [["visa", "VISA"], ["mbway", "MB WAY"], ["revolut", "Revolut"]];

function Brand() {
  return <span className="font-display text-3xl leading-none tracking-normal">moka<span className="text-accent">.</span></span>;
}

function Index() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const count = Object.values(cart).reduce((sum, value) => sum + value, 0);
  const subtotal = products.reduce((sum, product) => sum + (cart[product.id] ?? 0) * product.price, 0);
  const total = count > 0 ? subtotal + SHIPPING : 0;
  const update = (id: string, delta: number) => setCart((current) => ({ ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) }));
  const add = (id: string) => { update(id, 1); setCartOpen(true); };

  return <main className="min-h-screen bg-background text-foreground">
    <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">Envio 4,99 € · Portugal Continental · Entregas em 2–4 dias úteis</div>
    <header className="absolute top-8 z-20 w-full border-b border-primary-foreground/25 text-primary-foreground">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" aria-label="Moka — início"><Brand /></a>
        <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Navegação principal">
          <a href="#colecao" className="transition-opacity hover:opacity-70">Coleção</a>
          <a href="#moka" className="transition-opacity hover:opacity-70">O puffe</a>
          <a href="#perguntas" className="transition-opacity hover:opacity-70">Ajuda</a>
        </nav>
        <Sheet open={cartOpen} onOpenChange={(open) => { setCartOpen(open); if (!open) { setCheckout(false); setOrdered(false); } }}>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="relative text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground" aria-label={`Carrinho com ${count} artigos`}><ShoppingBag />{count > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[10px] text-accent-foreground">{count}</span>}</Button></SheetTrigger>
          <SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
            <SheetHeader className="border-b p-6"><SheetTitle className="font-display text-3xl font-normal">O seu carrinho</SheetTitle><SheetDescription>{count ? `${count} ${count === 1 ? "artigo" : "artigos"}` : "Ainda não adicionou nenhum puffe."}</SheetDescription></SheetHeader>
            {ordered ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><span className="mb-5 grid size-16 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="size-7" /></span><h2 className="font-display text-3xl">Pedido recebido</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">Esta é uma demonstração. A sua encomenda não foi cobrada.</p></div> : checkout ? <Checkout total={total} onBack={() => setCheckout(false)} onSubmit={() => setOrdered(true)} /> : <>
              <div className="flex-1 overflow-y-auto p-6">{count === 0 ? <div className="grid h-full place-items-center text-sm text-muted-foreground">Escolha o seu lugar ao sol.</div> : products.filter((p) => cart[p.id]).map((product) => <div key={product.id} className="flex gap-4 border-b py-4 first:pt-0"><img src={product.image} alt={product.alt} className="h-24 w-20 rounded object-cover" /><div className="flex flex-1 flex-col justify-between"><div><p className="font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{product.subtitle}</p></div><div className="flex items-center justify-between"><div className="flex items-center border"><Button variant="ghost" size="icon" className="size-7 rounded-none" onClick={() => update(product.id, -1)} aria-label="Diminuir quantidade"><Minus /></Button><span className="w-7 text-center text-xs">{cart[product.id]}</span><Button variant="ghost" size="icon" className="size-7 rounded-none" onClick={() => update(product.id, 1)} aria-label="Aumentar quantidade"><Plus /></Button></div><span className="text-sm font-semibold">{eur(product.price * (cart[product.id] ?? 0))}</span></div></div></div>)}</div>
              {count > 0 && <div className="border-t p-6"><div className="mb-2 flex justify-between text-sm"><span>Subtotal</span><span>{eur(subtotal)}</span></div><div className="mb-2 flex justify-between text-sm"><span>Envio</span><span>{eur(SHIPPING)}</span></div><div className="mb-2 flex justify-between text-sm font-semibold"><span>Total</span><strong>{eur(total)}</strong></div><p className="mb-5 text-xs text-muted-foreground">Impostos incluídos.</p><Button className="h-12 w-full rounded-none" onClick={() => setCheckout(true)}>Finalizar compra <ArrowRight /></Button></div>}
            </>}
          </SheetContent>
        </Sheet>
      </div>
    </header>

    <section id="inicio" className="relative min-h-[760px] overflow-hidden sm:min-h-[820px]">
      <img src={praiaAsset.url} alt="Puffe Moka Maré às riscas verdes na areia, frente ao mar" className="absolute inset-0 h-full w-full object-cover object-bottom" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/30 to-transparent" />
      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-end px-5 pb-16 pt-32 text-primary-foreground sm:min-h-[820px] sm:items-center sm:px-8 sm:pb-0">
        <div className="max-w-2xl"><p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em]">Portugal Handmade beach pillows</p><h1 className="font-display text-4xl leading-[1.04] tracking-normal sm:text-6xl">O verão pede praia,<br />a praia pede Moka.</h1><p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/85 sm:text-lg">Conforto generoso, tecido resistente e uma pega para ir consigo da varanda até à praia.</p><Button asChild size="lg" className="mt-8 h-12 rounded-none bg-accent px-7 text-accent-foreground hover:bg-accent/90"><a href="#colecao">Descobrir a coleção <ArrowRight /></a></Button></div>
      </div>
    </section>

    <section className="border-b border-border bg-card"><div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-border px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8">{benefits.map(([Icon,title,text]) => <div key={title} className="flex items-center gap-4 py-6 sm:px-8 sm:first:pl-0"><Icon className="size-5 text-accent"/><div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{text}</p></div></div>)}</div></section>

    <section id="colecao" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><div className="mb-10 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Coleção Moka</p><h2 className="mt-3 font-display text-5xl tracking-normal sm:text-6xl">Escolha o seu.</h2></div><p className="hidden max-w-xs text-sm leading-6 text-muted-foreground md:block">Cores inspiradas na costa portuguesa. A mesma vontade de ficar mais um pouco.</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{products.map((product) => <article key={product.id} className="group"><div className="relative aspect-[4/5] overflow-hidden bg-muted"><img src={product.image} alt={product.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"/><span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em]">Novo</span></div><div className="flex items-start justify-between py-5"><div><h3 className="font-display text-2xl">{product.name}</h3><p className="mt-1 text-xs text-muted-foreground">{product.subtitle}</p></div><p className="font-semibold">{eur(product.price)}</p></div><Button variant="outline" className="h-11 w-full rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => add(product.id)}>Adicionar ao carrinho <Plus /></Button></article>)}</div></section>

    <section className="border-b border-border"><div className="mx-auto max-w-7xl px-5 pb-20 sm:px-8"><div className="mb-8 flex items-baseline justify-between"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Moka por aí</p><p className="hidden text-sm text-muted-foreground md:block">Onde os seus levam o nosso.</p></div><div className="grid gap-5 sm:grid-cols-3">{gallery.map(([image, alt, caption]) => <figure key={alt} className="group"><div className="aspect-[4/5] overflow-hidden bg-muted"><img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"/></div><figcaption className="mt-3 text-xs uppercase tracking-[0.16em] text-muted-foreground">{caption}</figcaption></figure>)}</div></div></section>

    <section id="moka" className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl md:grid-cols-2"><div className="min-h-[480px]"><img src={etiquetaAsset.url} alt="Etiqueta Moka bordada num puffe de riscas" loading="lazy" className="h-full w-full object-cover" /></div><div className="flex items-center px-7 py-16 sm:px-14 lg:px-20"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Por dentro da Moka</p><h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">Leve no caminho.<br/>Sério no conforto.</h2><p className="mt-6 max-w-md leading-7 text-primary-foreground/75">A forma adapta-se ao corpo e cria apoio onde precisa. A capa exterior aguenta o uso, sai para lavar e a pega reforçada simplifica cada viagem.</p><dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-primary-foreground/20 pt-8"><div><dt className="font-display text-3xl">120 × 90</dt><dd className="mt-1 text-xs text-primary-foreground/65">centímetros</dd></div><div><dt className="font-display text-3xl">3,2 kg</dt><dd className="mt-1 text-xs text-primary-foreground/65">fácil de transportar</dd></div><div><dt className="font-display text-3xl">UV 50+</dt><dd className="mt-1 text-xs text-primary-foreground/65">cor mais protegida</dd></div><div><dt className="font-display text-3xl">100%</dt><dd className="mt-1 text-xs text-primary-foreground/65">capa removível</dd></div></dl></div></div></div></section>

    <section id="perguntas" className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-8 sm:py-28 md:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Antes de ir</p><h2 className="mt-3 font-display text-5xl">Perguntas frequentes.</h2></div><Accordion type="single" collapsible>{questions.map(([q,a]) => <AccordionItem value={q} key={q}><AccordionTrigger className="py-6 text-base hover:no-underline">{q}</AccordionTrigger><AccordionContent className="pb-6 leading-6 text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></section>

    <footer className="bg-foreground text-background"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><div className="flex flex-col justify-between gap-10 border-b border-background/20 pb-12 sm:flex-row"><div><Brand/><p className="mt-4 max-w-xs text-sm leading-6 text-background/65">Puffes desenhados para dias longos, dentro e fora de casa.</p></div><div className="grid grid-cols-2 gap-12 text-sm"><div><p className="mb-3 font-semibold">Apoio</p><a href="mailto:ola@moka.pt" className="block py-1 text-background/65">ola@moka.pt</a><a href="#perguntas" className="block py-1 text-background/65">Perguntas frequentes</a></div><div><p className="mb-3 font-semibold">Segue-nos</p><span className="block py-1 text-background/65">Instagram</span><span className="block py-1 text-background/65">Portugal</span></div></div></div><div className="flex flex-col gap-3 pt-6 text-xs text-background/50 sm:flex-row sm:justify-between"><span>© 2026 Moka. Todos os direitos reservados.</span><span>Visa · MB WAY · Revolut</span></div></div></footer>
  </main>;
}

function Checkout({ total, onBack, onSubmit }: { total: number; onBack: () => void; onSubmit: () => void }) {
  const [method, setMethod] = useState("mbway");
  return <div className="flex flex-1 flex-col overflow-y-auto p-6"><Button variant="ghost" className="mb-4 w-fit px-0 text-muted-foreground" onClick={onBack}>← Voltar</Button><h2 className="font-display text-3xl">Finalizar compra</h2><p className="mt-1 text-sm text-muted-foreground">Envio 4,99 € · Total {eur(total)}</p><div className="mt-7 grid gap-3"><Input placeholder="Nome completo" aria-label="Nome completo"/><Input type="email" placeholder="Email" aria-label="Email"/><Input placeholder="Morada" aria-label="Morada"/><div className="grid grid-cols-2 gap-3"><Input placeholder="Código postal" aria-label="Código postal"/><Input placeholder="Localidade" aria-label="Localidade"/></div></div><fieldset className="mt-8"><legend className="mb-3 text-sm font-semibold">Método de pagamento</legend><div className="grid grid-cols-3 gap-2">{paymentMethods.map(([id,label]) => <label key={id} className={`cursor-pointer border p-3 text-center text-xs font-semibold transition-colors ${method === id ? "border-primary bg-secondary" : "border-border"}`}><input type="radio" name="payment" value={id} checked={method === id} onChange={() => setMethod(id)} className="sr-only"/>{label}</label>)}</div></fieldset>{method === "mbway" && <Input className="mt-4" type="tel" placeholder="Número de telemóvel" aria-label="Número MB WAY"/>}{method === "visa" && <div className="mt-4 grid gap-3"><Input inputMode="numeric" placeholder="Número do cartão" aria-label="Número do cartão"/><div className="grid grid-cols-2 gap-3"><Input placeholder="MM / AA" aria-label="Validade"/><Input placeholder="CVC" aria-label="CVC"/></div></div>}<div className="mt-auto pt-8"><div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4"/> Pagamento seguro e encriptado</div><Button className="h-12 w-full rounded-none" onClick={onSubmit}>Pagar {eur(total)}</Button><p className="mt-3 text-center text-[10px] text-muted-foreground">Modo de demonstração — não será efetuada qualquer cobrança.</p></div></div>;
}
