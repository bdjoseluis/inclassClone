import { Injectable } from '@angular/core';
import type { CollectionDetail, ProductVariant } from '../models/catalog.model';

// Stable pseudo-random stock seeded by reference string
function seededStock(ref: string): number {
  let h = 0;
  for (let i = 0; i < ref.length; i++) h = ((h << 5) - h + ref.charCodeAt(i)) | 0;
  return Math.abs(h % 24) + 1; // 1-24 units
}

const COLLECTIONS: CollectionDetail[] = [
  {
    slug: 'floe',
    name: 'Floe',
    designer: 'Pearson Lloyd',
    designerImage: 'assets/images/DP_PearsonLloyd.jpg',
    year: '2024',
    description: 'Versátil, atemporal y elegante. FLOE es una familia de mesas auxiliares con bases de silueta esencial y fluida fabricadas en aluminio íntegro. Su amplio rango de acabados permite integrarlas en entornos contract, corporativos o residenciales.',
    heroImages: [
      'assets/images/SL_FLOE_2026.jpg',
      'assets/images/SL_FLOE_01.jpg',
      'assets/images/ST_FLOE_01.jpg',
      'assets/images/ST_FLOE_02.jpg',
      'assets/images/ST_FLOE_03.jpg',
      'assets/images/ST_FLOE_04.jpg',
    ],
    thumbnail: 'assets/images/TB_FLOE.jpg',
    tipo: 'mesas-auxiliares',
    tags: ['nueva colección', 'mesas auxiliares', 'aluminio', 'contract'],
    materials: ['Aluminio fundido', 'Tablero DM lacado', 'Cristal templado', 'Chapa de madera'],
    finishes: ['Blanco mate', 'Negro mate', 'Arena', 'Terracota', 'Salvia', 'Roble natural', 'Nogal'],
    spaces: ['Residencial', 'Oficina', 'Horeca', 'Zonas de espera'],
    products: [
      { slug: 'flo0101', reference: 'FLO0101', name: 'Mesa auxiliar 40×40cm h.40', dimensions: '40×40×40 cm', weight: '4.2 kg', image: 'assets/images/PL_FLOE_06.png', stock: seededStock('FLO0101') },
      { slug: 'flo0102', reference: 'FLO0102', name: 'Mesa auxiliar 40×40cm h.50', dimensions: '40×40×50 cm', weight: '4.5 kg', image: 'assets/images/PL_FLOE_06.png', stock: seededStock('FLO0102') },
      { slug: 'flo0103', reference: 'FLO0103', name: 'Mesa auxiliar 50×50cm h.40', dimensions: '50×50×40 cm', weight: '5.1 kg', image: 'assets/images/PL_FLOE_06.png', stock: seededStock('FLO0103') },
      { slug: 'flo0120', reference: 'FLO0120', name: 'Mesa auxiliar 50×50cm h.50', dimensions: '50×50×50 cm', weight: '5.3 kg', image: 'assets/images/PL_FLOE_06.png', stock: seededStock('FLO0120') },
      { slug: 'flo0105', reference: 'FLO0105', name: 'Mesa auxiliar 51×38cm h.40', dimensions: '51×38×40 cm', weight: '4.8 kg', image: 'assets/images/PL_FLOE_06.png', stock: seededStock('FLO0105') },
      { slug: 'flo0106', reference: 'FLO0106', name: 'Mesa auxiliar 58×36cm h.66', dimensions: '58×36×66 cm', weight: '6.2 kg', image: 'assets/images/PL_FLOE_06.png', stock: seededStock('FLO0106') },
      { slug: 'flo0107', reference: 'FLO0107', name: 'Mesa con base 48×48cm h.38', dimensions: '48×48×38 cm', weight: '7.0 kg', image: 'assets/images/TB_FLOE.jpg', stock: seededStock('FLO0107') },
      { slug: 'flo0108', reference: 'FLO0108', name: 'Mesa con base 48×48cm h.73', dimensions: '48×48×73 cm', weight: '8.5 kg', image: 'assets/images/TB_FLOE.jpg', stock: seededStock('FLO0108') },
    ],
    relatedSlugs: ['esitt', 'kern', 'barlis'],
  },
  {
    slug: 'oswell',
    name: 'Oswell',
    designer: 'Nacar Design',
    designerImage: 'assets/images/DP_Nacar-Design.jpg',
    year: '2024',
    description: 'Oswell es una silla de diseño distinguido que combina estructura robusta con tapizado de alta calidad. Ganadora del iF Design Award 2026, su silueta equilibrada la hace adecuada tanto para espacios de trabajo como para entornos de reunión y hospitalidad.',
    heroImages: [
      'assets/images/SL_OSWELL_2026.jpg',
      'assets/images/ST_OSWELL_04.jpg',
      'assets/images/TB_OSWELL.jpg',
    ],
    thumbnail: 'assets/images/TB_OSWELL.jpg',
    tipo: 'sillas-y-sillones',
    tags: ['iF Design Award 2026', 'sillas', 'tapizado', 'contract'],
    materials: ['Armazón de acero', 'Tapizado en tela', 'Tapizado en cuero', 'Patas de aluminio'],
    finishes: ['Negro', 'Cromo', 'Blanco', 'Grafito', 'Bronce'],
    spaces: ['Oficina', 'Reunión', 'Hospitality', 'Auditorio'],
    products: [
      { slug: 'osw0101', reference: 'OSW0101', name: 'Silla 4 patas madera', dimensions: '58×58×81 cm', weight: '6.8 kg', image: 'assets/images/TB_OSWELL.jpg', stock: seededStock('OSW0101') },
      { slug: 'osw0102', reference: 'OSW0102', name: 'Silla 4 patas cromadas', dimensions: '58×58×81 cm', weight: '7.2 kg', image: 'assets/images/TB_OSWELL.jpg', stock: seededStock('OSW0102') },
      { slug: 'osw0103', reference: 'OSW0103', name: 'Silla con reposabrazos', dimensions: '63×58×81 cm', weight: '7.9 kg', image: 'assets/images/ST_OSWELL_04.jpg', stock: seededStock('OSW0103') },
      { slug: 'osw0104', reference: 'OSW0104', name: 'Sillón lounge bajo', dimensions: '72×72×75 cm', weight: '9.1 kg', image: 'assets/images/ST_OSWELL_04.jpg', stock: seededStock('OSW0104') },
    ],
    relatedSlugs: ['floe', 'barlis', 'kern'],
  },
  {
    slug: 'kern',
    name: 'Kern',
    designer: 'Studio INCLASS',
    designerImage: 'assets/images/STUDIO-INCLASS-1.png',
    year: '2024',
    description: 'Kern es una silla de trabajo ergonómica diseñada para espacios profesionales exigentes. Su estructura modular permite múltiples configuraciones y su mecanismo sincronizado garantiza el máximo confort durante largas jornadas.',
    heroImages: [
      'assets/images/TB_KERN.jpg',
      'assets/images/ST_KERN_03.jpg',
    ],
    thumbnail: 'assets/images/TB_KERN.jpg',
    tipo: 'sillas-de-trabajo',
    tags: ['nueva colección', 'ergonomía', 'silla trabajo'],
    materials: ['Malla técnica', 'Espuma HR', 'Armazón de aluminio', 'Piel sintética'],
    finishes: ['Negro total', 'Gris antracita', 'Blanco óptico'],
    spaces: ['Oficina', 'Espacios de trabajo', 'Reunión'],
    products: [
      { slug: 'ker0101', reference: 'KER0101', name: 'Silla operativa malla', dimensions: '65×65×118 cm', weight: '14.5 kg', image: 'assets/images/TB_KERN.jpg', stock: seededStock('KER0101') },
      { slug: 'ker0102', reference: 'KER0102', name: 'Silla operativa tapizada', dimensions: '65×65×118 cm', weight: '15.2 kg', image: 'assets/images/ST_KERN_03.jpg', stock: seededStock('KER0102') },
      { slug: 'ker0103', reference: 'KER0103', name: 'Silla alta malla taburete', dimensions: '65×65×135 cm', weight: '15.8 kg', image: 'assets/images/TB_KERN.jpg', stock: seededStock('KER0103') },
    ],
    relatedSlugs: ['exa', 'zenpro', 'orus'],
  },
  {
    slug: 'barlis',
    name: 'Barlis',
    designer: 'Simon Pengelly',
    designerImage: 'assets/images/SIMON-PENGELLY.png',
    year: '2023',
    description: 'Barlis es una silla de diseño contemporáneo con estructura metálica y asiento tapizado. Su equilibrio entre forma y función la convierte en una solución versátil para múltiples contextos, desde el comedor hasta la sala de espera.',
    heroImages: [
      'assets/images/TB_BARLIS.jpg',
      'assets/images/ST_BARLIS_01.jpg',
    ],
    thumbnail: 'assets/images/TB_BARLIS.jpg',
    tipo: 'sillas-y-sillones',
    tags: ['sillas', 'metal', 'tapizado'],
    materials: ['Estructura metálica', 'Tapizado en tela', 'Tapizado en piel', 'Madera de roble'],
    finishes: ['Negro', 'Blanco', 'Cobre', 'Arena'],
    spaces: ['Residencial', 'Hospitality', 'Zonas de espera'],
    products: [
      { slug: 'bar0101', reference: 'BAR0101', name: 'Silla estructura metal', dimensions: '55×55×80 cm', weight: '5.9 kg', image: 'assets/images/TB_BARLIS.jpg', stock: seededStock('BAR0101') },
      { slug: 'bar0102', reference: 'BAR0102', name: 'Silla con reposabrazos', dimensions: '60×55×80 cm', weight: '6.5 kg', image: 'assets/images/ST_BARLIS_01.jpg', stock: seededStock('BAR0102') },
      { slug: 'bar0103', reference: 'BAR0103', name: 'Butaca lounge', dimensions: '75×70×78 cm', weight: '8.3 kg', image: 'assets/images/TB_BARLIS.jpg', stock: seededStock('BAR0103') },
    ],
    relatedSlugs: ['oswell', 'floe', 'lea'],
  },
  {
    slug: 'esitt',
    name: 'Esitt',
    designer: 'Nacar Design',
    designerImage: 'assets/images/DP_Nacar-Design.jpg',
    year: '2023',
    description: 'ESITT combina el confort profesional de las sillas de trabajo con un diseño refinado y ergonómico. Ganadora del iF Design Award 2024, su integración visual la hace apta para cualquier entorno profesional de alto nivel.',
    heroImages: [
      'assets/images/TB_ESSIT.jpg',
      'assets/images/ST_ESITT_02.jpg',
    ],
    thumbnail: 'assets/images/TB_ESSIT.jpg',
    tipo: 'sillas-de-trabajo',
    tags: ['iF Design Award 2024', 'ergonomía', 'silla trabajo'],
    materials: ['Malla de alta resistencia', 'Espuma viscoelástica', 'Aluminio pulido'],
    finishes: ['Negro', 'Gris', 'Blanco'],
    spaces: ['Oficina ejecutiva', 'Reunión', 'Home office'],
    products: [
      { slug: 'esi0101', reference: 'ESI0101', name: 'Silla operativa malla', dimensions: '66×66×120 cm', weight: '16.0 kg', image: 'assets/images/TB_ESSIT.jpg', stock: seededStock('ESI0101') },
      { slug: 'esi0102', reference: 'ESI0102', name: 'Silla operativa tapizada', dimensions: '66×66×120 cm', weight: '16.8 kg', image: 'assets/images/ST_ESITT_02.jpg', stock: seededStock('ESI0102') },
      { slug: 'esi0103', reference: 'ESI0103', name: 'Silla conf. 4 patas', dimensions: '64×64×88 cm', weight: '12.5 kg', image: 'assets/images/ST_ESITT_02.jpg', stock: seededStock('ESI0103') },
    ],
    relatedSlugs: ['kern', 'exa', 'orus'],
  },
  {
    slug: 'lea',
    name: 'Lea',
    designer: 'Christophe Pillet',
    designerImage: 'assets/images/CHRISTOPHE-PILLET.png',
    year: '2023',
    description: 'Lea es una silla de estética depurada y producción sostenible. Disponible en versión con o sin reposabrazos, su carcasa de polipropileno reciclado la hace ligera, apilable y perfecta para uso interior y exterior.',
    heroImages: [
      'assets/images/TB_LEA.jpg',
      'assets/images/ST_LEA_12.jpg',
    ],
    thumbnail: 'assets/images/TB_LEA.jpg',
    tipo: 'sillas-y-sillones',
    tags: ['outdoor', 'apilable', 'polipropileno', 'sostenible'],
    materials: ['Polipropileno reciclado', 'Estructura de aluminio'],
    finishes: ['Blanco', 'Negro', 'Gris piedra', 'Terracota', 'Salvia', 'Azul'],
    spaces: ['Residencial', 'Hospitality', 'Outdoor', 'Colectividades'],
    products: [
      { slug: 'lea0101', reference: 'LEA0101', name: 'Silla 4 patas apilable', dimensions: '52×54×80 cm', weight: '3.8 kg', image: 'assets/images/TB_LEA.jpg', stock: seededStock('LEA0101') },
      { slug: 'lea0102', reference: 'LEA0102', name: 'Silla con reposabrazos', dimensions: '58×54×80 cm', weight: '4.1 kg', image: 'assets/images/ST_LEA_12.jpg', stock: seededStock('LEA0102') },
      { slug: 'lea0103', reference: 'LEA0103', name: 'Silla base patín', dimensions: '52×56×80 cm', weight: '4.3 kg', image: 'assets/images/TB_LEA.jpg', stock: seededStock('LEA0103') },
    ],
    relatedSlugs: ['floe', 'barlis', 'taia'],
  },
];

@Injectable({ providedIn: 'root' })
export class CatalogService {
  getAll(): CollectionDetail[] { return COLLECTIONS; }

  getBySlug(slug: string): CollectionDetail | undefined {
    return COLLECTIONS.find(c => c.slug === slug);
  }

  getProduct(collectionSlug: string, productSlug: string): { collection: CollectionDetail; product: ProductVariant } | undefined {
    const col = this.getBySlug(collectionSlug);
    if (!col) return undefined;
    const product = col.products.find(p => p.slug === productSlug);
    if (!product) return undefined;
    return { collection: col, product };
  }

  getRelated(slugs: string[]): CollectionDetail[] {
    return slugs.map(s => this.getBySlug(s)).filter(Boolean) as CollectionDetail[];
  }
}
