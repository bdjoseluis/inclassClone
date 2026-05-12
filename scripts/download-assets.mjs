import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { get } from 'https';
import { basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEST = join(__dirname, '../src/assets/images');

if (!existsSync(DEST)) mkdirSync(DEST, { recursive: true });

const IMAGES = [
  // Hero slides
  'https://inclass.es/wp-content/uploads/2026/04/SL_FLOE_2026.jpg',
  'https://inclass.es/wp-content/uploads/2026/04/SL_ONDES_01.jpg',
  'https://inclass.es/wp-content/uploads/2026/04/SL_BINAR55_02.jpg',
  'https://inclass.es/wp-content/uploads/2026/04/SL_OSWELL_2026.jpg',
  'https://inclass.es/wp-content/uploads/2026/04/SL_ONEM_01_.jpg',
  // News
  'https://inclass.es/wp-content/uploads/2026/04/Milan_26.jpg',
  'https://inclass.es/wp-content/uploads/2026/03/HN_IF_OSWELL.jpg',
  'https://inclass.es/wp-content/uploads/2026/02/HN_WorkSpace26.jpg',
  'https://inclass.es/wp-content/uploads/2025/02/HN_KERN.png',
  'https://inclass.es/wp-content/uploads/2025/02/HN_EXA.png',
  'https://inclass.es/wp-content/uploads/2025/02/HN_ORUS.png',
  // Home categories
  'https://inclass.es/wp-content/uploads/2023/09/CHAIRS.png',
  'https://inclass.es/wp-content/uploads/2023/09/ARMCHAIRS_2024.jpg',
  'https://inclass.es/wp-content/uploads/2023/09/TABLES.png',
  'https://inclass.es/wp-content/uploads/2023/09/EXECUTIVES_2024.jpg',
  // Featured product
  'https://inclass.es/wp-content/uploads/2023/10/ST_ESITT_02.jpg',
  // Catalogues
  'https://inclass.es/wp-content/uploads/2024/11/HO_QuickGuide.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_LAMINAR.jpg',
  'https://inclass.es/wp-content/uploads/2025/08/01-1.jpg',
  // Sustainability
  'https://inclass.es/wp-content/uploads/2024/01/Captura-de-pantalla-2023-01-27-a-las-13.54.22-Copy-6.jpg',
  'https://inclass.es/wp-content/uploads/2024/02/Sostenibilidad-certificada.png',
  'https://inclass.es/wp-content/uploads/2024/01/Group-76.png',
  'https://inclass.es/wp-content/uploads/2024/01/Group-83.png',
  'https://inclass.es/wp-content/uploads/2023/01/Group-49.png',
  'https://inclass.es/wp-content/uploads/2024/01/Group-15.png',
  'https://inclass.es/wp-content/uploads/2024/02/Captura-de-pantalla-2023-01-27-a-las-13.54.22-Copy-2.jpg',
  'https://inclass.es/wp-content/uploads/2024/02/Captura-de-pantalla-2023-01-27-a-las-13.54.22-Copy-3.jpg',
  'https://inclass.es/wp-content/uploads/2024/02/Captura-de-pantalla-2023-01-27-a-las-13.54.22-Copy-4.jpg',
  'https://inclass.es/wp-content/uploads/2024/02/Captura-de-pantalla-2023-01-27-a-las-13.54.22-Copy-5.jpg',
  'https://inclass.es/wp-content/uploads/2024/07/SS_Huella-de-carbono.jpg',
  // Designers
  'https://inclass.es/wp-content/uploads/2025/10/DP_Nacar-Design.jpg',
  'https://inclass.es/wp-content/uploads/2024/11/DP_PearsonLloyd.jpg',
  'https://inclass.es/wp-content/uploads/2023/09/SIMON-PENGELLY.png',
  'https://inclass.es/wp-content/uploads/2023/09/JONATHAN-PRESWITCH.png',
  'https://inclass.es/wp-content/uploads/2023/07/MARIO-RUIZ.png',
  'https://inclass.es/wp-content/uploads/2023/09/Francesc-Rife.png',
  'https://inclass.es/wp-content/uploads/2023/09/CHRISTOPHE-PILLET.png',
  'https://inclass.es/wp-content/uploads/2023/09/FLORENT-COIRIER.png',
  'https://inclass.es/wp-content/uploads/2023/09/JORGE-PENSI.png',
  'https://inclass.es/wp-content/uploads/2023/09/PEREZOCHANDO.png',
  'https://inclass.es/wp-content/uploads/2023/01/Cristian_Gori.jpg',
  'https://inclass.es/wp-content/uploads/2023/09/CARLOS-TISCAR.png',
  'https://inclass.es/wp-content/uploads/2023/09/ALEGRE-DESIGN.png',
  'https://inclass.es/wp-content/uploads/2023/09/YONOH.png',
  'https://inclass.es/wp-content/uploads/2023/09/STUDIO-INCLASS-1.png',
  // About
  'https://inclass.es/wp-content/uploads/2023/01/Foto-fabrica.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/Distribucion.jpg',
  'https://inclass.es/wp-content/uploads/2023/09/INCLASS-2022-9-8743-copia.jpg',
  'https://inclass.es/wp-content/uploads/2023/09/INCLASS-3-2022-10-9432_INT.jpg',
  // Contact
  'https://inclass.es/wp-content/uploads/2023/09/INCLASS-4-2022-10-9939-1.jpg',
  // Collections thumbnails
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_LEA.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_OSWELL.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_TAIA.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_VARYA.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_BARLIS.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_ESSENS.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_ESSENSoccasional.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_FLOE.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_O_LAMINAR.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_OSWELL.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_FLOE.jpg',
  'https://inclass.es/wp-content/uploads/2025/09/TB_BARLIS.jpg',
  'https://inclass.es/wp-content/uploads/2024/11/TB_KERNmesas.jpg',
  'https://inclass.es/wp-content/uploads/2024/11/TB_KERN.jpg',
  'https://inclass.es/wp-content/uploads/2024/11/TB_EXA.jpg',
  'https://inclass.es/wp-content/uploads/2024/11/TB_ZENPRO.jpg',
  'https://inclass.es/wp-content/uploads/2024/11/TB_ORUS.jpg',
  'https://inclass.es/wp-content/uploads/2024/04/TB_WABAO.png',
  'https://inclass.es/wp-content/uploads/2023/10/TB_BINAR-60-1.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_BINARexecutive.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_KORI.jpg',
  'https://inclass.es/wp-content/uploads/2024/04/TB_ESSENSoccasional.png',
  'https://inclass.es/wp-content/uploads/2023/01/TB_REVER.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_LEA.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_DUNASlounge.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_DUNASxl.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_DUNASxs.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ARUM.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_WUDI.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_ESSENS.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_ESCALAS.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_VARYA-WOOD.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_VARYA-TAPIZ.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_VARYAxl.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_VARYA.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_LEX.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_PLANIAtable.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_PLANIAbench.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_TAIA.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ARYNwood.png',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ARYN.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ARYNmax.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_ENTROPY.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_LINtapiz.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_LINwood.jpg',
  'https://inclass.es/wp-content/uploads/2023/11/TB_LAPSE.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_MARCUS.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_TETRIS-2.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_PAU.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_XAIL.png',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ARC_.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ALTEA.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_ITEKpro.jpg',
  'https://inclass.es/wp-content/uploads/2023/01/TB_ESSIT.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_UNNIA.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_UNNIA-TAPIZ.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_NUME.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_STIKS.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_NIM.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_SUI.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_LAN.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_ANN.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_ELIX.jpg',
  'https://inclass.es/wp-content/uploads/2023/10/TB_TAO.jpg',
  'https://inclass.es/wp-content/uploads/2023/12/TB_FLAT.jpg',
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fileName = basename(new URL(url).pathname);
    const filePath = join(dest, fileName);
    const file = createWriteStream(filePath);
    get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://inclass.es/',
      }
    }, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(fileName); });
    }).on('error', err => { file.close(); reject(err); });
  });
}

let ok = 0, fail = 0;
const queue = [...IMAGES];

async function run() {
  for (const url of queue) {
    try {
      const name = await download(url, DEST);
      console.log(`✓ ${name}`);
      ok++;
    } catch (e) {
      console.error(`✗ ${basename(new URL(url).pathname)} — ${e.message}`);
      fail++;
    }
  }
  console.log(`\nDone: ${ok} ok, ${fail} failed`);
  console.log(`Images saved to: ${DEST}`);
}

run();
