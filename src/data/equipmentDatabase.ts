/**
 * Base de datos de equipos HVAC para el formulario de diagnóstico
 * Incluye calderas, aires acondicionados y sistemas de aerotermia
 * con las marcas y modelos más comunes en el mercado español
 */

export type EquipmentType = 'caldera' | 'aire_acondicionado' | 'aerotermia';

export interface EquipmentModel {
  id: string;
  name: string;
  series?: string;
}

export interface EquipmentBrand {
  id: string;
  name: string;
  logo?: string;
  models: EquipmentModel[];
}

export interface EquipmentCategory {
  type: EquipmentType;
  label: string;
  icon: string;
  brands: EquipmentBrand[];
}

// ============================================
// CALDERAS
// ============================================
const calderasBrands: EquipmentBrand[] = [
  {
    id: 'junkers',
    name: 'Junkers / Bosch',
    models: [
      { id: 'cerapur-zwbc-24-2c', name: 'Cerapur ZWBC 24-2C' },
      { id: 'cerapur-zwbc-28-2c', name: 'Cerapur ZWBC 28-2C' },
      { id: 'cerapur-excellence-zwb-30-4c', name: 'Cerapur Excellence ZWB 30-4C' },
      { id: 'cerapur-comfort-zwbe-25-3c', name: 'Cerapur Comfort ZWBE 25-3C' },
      { id: 'cerapur-smart-zwr-24-5ke', name: 'Cerapur Smart ZWR 24-5KE' },
      { id: 'ceraclass-zw-24-2ke', name: 'Ceraclass ZW 24-2KE' },
      { id: 'euroline-zw-23ke', name: 'Euroline ZW 23KE' },
      { id: 'euromaxx-zwc-24-1mfa', name: 'Euromaxx ZWC 24-1MFA' },
      { id: 'condens-7000-w', name: 'Condens 7000 W' },
      { id: 'condens-9000i-w', name: 'Condens 9000i W' },
    ]
  },
  {
    id: 'vaillant',
    name: 'Vaillant',
    models: [
      { id: 'ecotec-plus-vmw-236', name: 'ecoTEC plus VMW 236/5-5' },
      { id: 'ecotec-plus-vmw-306', name: 'ecoTEC plus VMW 306/5-5' },
      { id: 'ecotec-plus-vmw-346', name: 'ecoTEC plus VMW 346/5-5' },
      { id: 'ecotec-pro-vmw-236', name: 'ecoTEC pro VMW 236/5-3' },
      { id: 'ecotec-exclusive-vmw-256', name: 'ecoTEC exclusive VMW 256/5-7' },
      { id: 'ecotec-pure-vmw-236', name: 'ecoTEC pure VMW 236/7-2' },
      { id: 'turbotec-plus-vmw-242', name: 'turboTEC plus VMW 242/5-5' },
      { id: 'turbotec-pro-vmw-242', name: 'turboTEC pro VMW 242/5-3' },
      { id: 'atmotec-plus-vmw-240', name: 'atmoTEC plus VMW 240/5-5' },
      { id: 'ecotec-intro-vmw-186', name: 'ecoTEC intro VMW 186/6-1' },
    ]
  },
  {
    id: 'saunier-duval',
    name: 'Saunier Duval',
    models: [
      { id: 'themafast-condens-f25', name: 'Themafast Condens F25' },
      { id: 'themafast-condens-f30', name: 'Themafast Condens F30' },
      { id: 'thelia-condens-f25', name: 'Thelia Condens F25' },
      { id: 'thelia-condens-f30', name: 'Thelia Condens F30' },
      { id: 'isofast-condens-f35', name: 'Isofast Condens F35' },
      { id: 'isomax-condens-f35', name: 'Isomax Condens F35' },
      { id: 'themaplus-condens-f25', name: 'Themaplus Condens F25' },
      { id: 'themaplus-condens-f30', name: 'Themaplus Condens F30' },
      { id: 'semiafast-f24e', name: 'Semiafast F24E' },
      { id: 'opalia-f14e', name: 'Opalia F14E' },
    ]
  },
  {
    id: 'baxi',
    name: 'Baxi',
    models: [
      { id: 'platinum-compact-24-24f', name: 'Platinum Compact 24/24F' },
      { id: 'platinum-compact-28-28f', name: 'Platinum Compact 28/28F' },
      { id: 'platinum-compact-32-32f', name: 'Platinum Compact 32/32F' },
      { id: 'platinum-max-plus-24-24f', name: 'Platinum Max Plus 24/24F' },
      { id: 'platinum-max-plus-28-28f', name: 'Platinum Max Plus 28/28F' },
      { id: 'platinum-alux-24-24f', name: 'Platinum Alux 24/24F' },
      { id: 'neodens-plus-eco-24-24f', name: 'Neodens Plus Eco 24/24F' },
      { id: 'victoria-condens-24-24f', name: 'Victoria Condens 24/24F' },
      { id: 'roca-novanox-24-24f', name: 'Roca Novanox 24/24F' },
      { id: 'duo-tec-compact-e-24', name: 'Duo-tec Compact E 24' },
    ]
  },
  {
    id: 'viessmann',
    name: 'Viessmann',
    models: [
      { id: 'vitodens-100-w-b1hc', name: 'Vitodens 100-W B1HC' },
      { id: 'vitodens-100-w-b1kc', name: 'Vitodens 100-W B1KC' },
      { id: 'vitodens-111-w-b1ld', name: 'Vitodens 111-W B1LD' },
      { id: 'vitodens-200-w-b2hb', name: 'Vitodens 200-W B2HB' },
      { id: 'vitodens-222-f-b2tb', name: 'Vitodens 222-F B2TB' },
      { id: 'vitodens-300-w-b3hb', name: 'Vitodens 300-W B3HB' },
      { id: 'vitopend-100-w-wh1d', name: 'Vitopend 100-W WH1D' },
      { id: 'vitogas-100-f-gs1d', name: 'Vitogas 100-F GS1D' },
      { id: 'vitocrossal-300-cu3a', name: 'Vitocrossal 300 CU3A' },
      { id: 'vitoladens-300-c', name: 'Vitoladens 300-C' },
    ]
  },
  {
    id: 'ferroli',
    name: 'Ferroli',
    models: [
      { id: 'bluehelix-tech-25c', name: 'Bluehelix Tech 25C' },
      { id: 'bluehelix-tech-35c', name: 'Bluehelix Tech 35C' },
      { id: 'bluehelix-pro-25c', name: 'Bluehelix Pro 25C' },
      { id: 'bluehelix-pro-32c', name: 'Bluehelix Pro 32C' },
      { id: 'divacondens-f24', name: 'Divacondens F24' },
      { id: 'divacondens-f28', name: 'Divacondens F28' },
      { id: 'domicompact-f24', name: 'Domicompact F24' },
      { id: 'domiproject-f24', name: 'Domiproject F24' },
      { id: 'econcept-25c', name: 'Econcept 25C' },
      { id: 'energy-top-w-80', name: 'Energy Top W 80' },
    ]
  },
  {
    id: 'ariston',
    name: 'Ariston',
    models: [
      { id: 'clas-one-24-ff', name: 'Clas One 24 FF' },
      { id: 'clas-one-30-ff', name: 'Clas One 30 FF' },
      { id: 'clas-premium-evo-24-ff', name: 'Clas Premium Evo 24 FF' },
      { id: 'clas-premium-evo-30-ff', name: 'Clas Premium Evo 30 FF' },
      { id: 'genus-one-24-ff', name: 'Genus One 24 FF' },
      { id: 'genus-one-30-ff', name: 'Genus One 30 FF' },
      { id: 'genus-premium-evo-24-ff', name: 'Genus Premium Evo 24 FF' },
      { id: 'alteas-one-net-24-ff', name: 'Alteas One Net 24 FF' },
      { id: 'alteas-one-net-30-ff', name: 'Alteas One Net 30 FF' },
      { id: 'egis-plus-24-ff', name: 'Egis Plus 24 FF' },
    ]
  },
  {
    id: 'beretta',
    name: 'Beretta',
    models: [
      { id: 'mynute-green-25-csi', name: 'Mynute Green 25 CSI' },
      { id: 'mynute-green-30-csi', name: 'Mynute Green 30 CSI' },
      { id: 'exclusive-green-25-csi', name: 'Exclusive Green 25 CSI' },
      { id: 'exclusive-green-30-csi', name: 'Exclusive Green 30 CSI' },
      { id: 'meteo-green-e-25-csi', name: 'Meteo Green E 25 CSI' },
      { id: 'quadra-green-25-csi', name: 'Quadra Green 25 CSI' },
      { id: 'ciao-green-25-csi', name: 'Ciao Green 25 CSI' },
      { id: 'boiler-green-he-25', name: 'Boiler Green HE 25' },
      { id: 'power-plus-50m', name: 'Power Plus 50M' },
      { id: 'super-exclusive-28-rsi', name: 'Super Exclusive 28 RSI' },
    ]
  },
  {
    id: 'cointra',
    name: 'Cointra',
    models: [
      { id: 'superlative-plus-24c', name: 'Superlative Plus 24C' },
      { id: 'superlative-plus-28c', name: 'Superlative Plus 28C' },
      { id: 'superlative-plus-32c', name: 'Superlative Plus 32C' },
      { id: 'supreme-24c', name: 'Supreme 24C' },
      { id: 'supreme-28c', name: 'Supreme 28C' },
      { id: 'essential-24c', name: 'Essential 24C' },
      { id: 'essential-28c', name: 'Essential 28C' },
      { id: 'premium-cpe-24t', name: 'Premium CPE 24T' },
      { id: 'godesia-24c', name: 'Godesia 24C' },
      { id: 'optima-cob-10p', name: 'Optima COB 10P' },
    ]
  },
  {
    id: 'hermann',
    name: 'Hermann',
    models: [
      { id: 'micraplus-condens-25', name: 'Micraplus Condens 25' },
      { id: 'micraplus-condens-30', name: 'Micraplus Condens 30' },
      { id: 'supermaster-24-se', name: 'Supermaster 24 SE' },
      { id: 'supermaster-28-se', name: 'Supermaster 28 SE' },
      { id: 'habitat-2-24', name: 'Habitat 2 24' },
      { id: 'habitat-2-28', name: 'Habitat 2 28' },
      { id: 'micra-5-24-se', name: 'Micra 5 24 SE' },
      { id: 'eura-24-se', name: 'Eura 24 SE' },
      { id: 'thesi-condens-25', name: 'Thesi Condens 25' },
      { id: 'master-inox-24-se', name: 'Master Inox 24 SE' },
    ]
  },
  {
    id: 'wolf',
    name: 'Wolf',
    models: [
      { id: 'cgb-2-24', name: 'CGB-2 24' },
      { id: 'cgb-2-38', name: 'CGB-2 38' },
      { id: 'cgb-2k-24', name: 'CGB-2K 24' },
      { id: 'cgs-2-20', name: 'CGS-2 20' },
      { id: 'fgb-k-28', name: 'FGB-K 28' },
      { id: 'fgb-k-35', name: 'FGB-K 35' },
      { id: 'tob-24', name: 'TOB 24' },
      { id: 'bwl-1s-10', name: 'BWL-1S 10' },
      { id: 'cgw-2-24', name: 'CGW-2 24' },
      { id: 'mgk-2-170', name: 'MGK-2 170' },
    ]
  },
  {
    id: 'chaffoteaux',
    name: 'Chaffoteaux',
    models: [
      { id: 'mira-c-green-25', name: 'Mira C Green 25' },
      { id: 'mira-c-green-30', name: 'Mira C Green 30' },
      { id: 'talia-green-system-25', name: 'Talia Green System 25' },
      { id: 'talia-green-system-30', name: 'Talia Green System 30' },
      { id: 'pigma-green-ext-25', name: 'Pigma Green Ext 25' },
      { id: 'pigma-green-ext-30', name: 'Pigma Green Ext 30' },
      { id: 'niagara-c-green-25', name: 'Niagara C Green 25' },
      { id: 'alixia-green-24', name: 'Alixia Green 24' },
      { id: 'inoa-green-24', name: 'Inoa Green 24' },
      { id: 'serelia-green-25', name: 'Serelia Green 25' },
    ]
  },
  {
    id: 'immergas',
    name: 'Immergas',
    models: [
      { id: 'victrix-tera-24-28', name: 'Victrix Tera 24/28' },
      { id: 'victrix-tera-32', name: 'Victrix Tera 32' },
      { id: 'victrix-pro-55-1i', name: 'Victrix Pro 55 1I' },
      { id: 'victrix-pro-80-1i', name: 'Victrix Pro 80 1I' },
      { id: 'victrix-exa-24-28', name: 'Victrix Exa 24/28' },
      { id: 'victrix-tt-24', name: 'Victrix TT 24' },
      { id: 'eolo-star-24-3e', name: 'Eolo Star 24 3E' },
      { id: 'nike-star-24-3e', name: 'Nike Star 24 3E' },
      { id: 'mini-eolo-24-3e', name: 'Mini Eolo 24 3E' },
      { id: 'maior-eolo-28-4e', name: 'Maior Eolo 28 4E' },
    ]
  },
  {
    id: 'roca',
    name: 'Roca',
    models: [
      { id: 'novanox-24-24f', name: 'Novanox 24/24F' },
      { id: 'victoria-20-20f', name: 'Victoria 20/20F' },
      { id: 'laura-20-20f', name: 'Laura 20/20F' },
      { id: 'gavina-gtf-24', name: 'Gavina GTF 24' },
      { id: 'gavina-gtf-28', name: 'Gavina GTF 28' },
      { id: 'rs-20-20f', name: 'RS 20/20F' },
      { id: 'neobit-plus-24-24f', name: 'Neobit Plus 24/24F' },
      { id: 'lidia-plus-gt-24', name: 'Lidia Plus GT 24' },
      { id: 'bios-plus-70f', name: 'Bios Plus 70F' },
      { id: 'bios-plus-120f', name: 'Bios Plus 120F' },
    ]
  },
  {
    id: 'de-dietrich',
    name: 'De Dietrich',
    models: [
      { id: 'naneo-emc-m-24-28', name: 'Naneo EMC M 24/28' },
      { id: 'naneo-emc-m-34', name: 'Naneo EMC M 34' },
      { id: 'twineo-egc-25', name: 'Twineo EGC 25' },
      { id: 'twineo-egc-30', name: 'Twineo EGC 30' },
      { id: 'evodens-amx-25', name: 'Evodens AMX 25' },
      { id: 'evodens-amx-35', name: 'Evodens AMX 35' },
      { id: 'innovens-mca-25', name: 'Innovens MCA 25' },
      { id: 'innovens-mca-35', name: 'Innovens MCA 35' },
      { id: 'modulens-agc-25', name: 'Modulens AGC 25' },
      { id: 'c-230-eco', name: 'C 230 Eco' },
    ]
  },
  {
    id: 'buderus',
    name: 'Buderus',
    models: [
      { id: 'logamax-plus-gb172-24', name: 'Logamax plus GB172-24' },
      { id: 'logamax-plus-gb172-30', name: 'Logamax plus GB172-30' },
      { id: 'logamax-plus-gb192i-25', name: 'Logamax plus GB192i-25' },
      { id: 'logamax-plus-gb192i-35', name: 'Logamax plus GB192i-35' },
      { id: 'logamax-u154-24', name: 'Logamax U154-24' },
      { id: 'logamax-u154-28', name: 'Logamax U154-28' },
      { id: 'logano-plus-gb212-22', name: 'Logano plus GB212-22' },
      { id: 'logano-plus-gb212-30', name: 'Logano plus GB212-30' },
      { id: 'logamax-plus-gb062-24', name: 'Logamax plus GB062-24' },
      { id: 'logamax-plus-gb062-30', name: 'Logamax plus GB062-30' },
    ]
  },
  {
    id: 'otro-caldera',
    name: 'Otra marca',
    models: [
      { id: 'otro-modelo', name: 'Otro modelo (especificar)' },
    ]
  },
];

// ============================================
// AIRES ACONDICIONADOS
// ============================================
const aireAcondicionadoBrands: EquipmentBrand[] = [
  {
    id: 'mitsubishi-electric',
    name: 'Mitsubishi Electric',
    models: [
      { id: 'msz-hr25vf', name: 'MSZ-HR25VF' },
      { id: 'msz-hr35vf', name: 'MSZ-HR35VF' },
      { id: 'msz-hr50vf', name: 'MSZ-HR50VF' },
      { id: 'msz-ap25vgk', name: 'MSZ-AP25VGK' },
      { id: 'msz-ap35vgk', name: 'MSZ-AP35VGK' },
      { id: 'msz-ap50vgk', name: 'MSZ-AP50VGK' },
      { id: 'msz-ln25vgw', name: 'MSZ-LN25VGW' },
      { id: 'msz-ln35vgw', name: 'MSZ-LN35VGW' },
      { id: 'msz-ef25vgkw', name: 'MSZ-EF25VGKW' },
      { id: 'msz-ef35vgkw', name: 'MSZ-EF35VGKW' },
      { id: 'mxz-2f42vf', name: 'MXZ-2F42VF (Multisplit)' },
      { id: 'mxz-3f54vf', name: 'MXZ-3F54VF (Multisplit)' },
      { id: 'mxz-4f72vf', name: 'MXZ-4F72VF (Multisplit)' },
      { id: 'pla-m35ea', name: 'PLA-M35EA (Cassette)' },
      { id: 'pla-m50ea', name: 'PLA-M50EA (Cassette)' },
      { id: 'pead-m35ja', name: 'PEAD-M35JA (Conductos)' },
      { id: 'pead-m50ja', name: 'PEAD-M50JA (Conductos)' },
    ]
  },
  {
    id: 'daikin',
    name: 'Daikin',
    models: [
      { id: 'ftxf25e', name: 'FTXF25E (Sensira)' },
      { id: 'ftxf35e', name: 'FTXF35E (Sensira)' },
      { id: 'ftxf50e', name: 'FTXF50E (Sensira)' },
      { id: 'ftxm25r', name: 'FTXM25R (Perfera)' },
      { id: 'ftxm35r', name: 'FTXM35R (Perfera)' },
      { id: 'ftxm50r', name: 'FTXM50R (Perfera)' },
      { id: 'ftxa25bb', name: 'FTXA25BB (Stylish)' },
      { id: 'ftxa35bb', name: 'FTXA35BB (Stylish)' },
      { id: 'ftxa50bb', name: 'FTXA50BB (Stylish)' },
      { id: 'ftxz25n', name: 'FTXZ25N (Ururu Sarara)' },
      { id: 'ftxz35n', name: 'FTXZ35N (Ururu Sarara)' },
      { id: '2mxm40n', name: '2MXM40N (Multisplit)' },
      { id: '3mxm52n', name: '3MXM52N (Multisplit)' },
      { id: '4mxm68n', name: '4MXM68N (Multisplit)' },
      { id: 'fba35a', name: 'FBA35A (Conductos)' },
      { id: 'fba50a', name: 'FBA50A (Conductos)' },
      { id: 'fcag35b', name: 'FCAG35B (Cassette)' },
      { id: 'fcag50b', name: 'FCAG50B (Cassette)' },
    ]
  },
  {
    id: 'fujitsu',
    name: 'Fujitsu',
    models: [
      { id: 'asy25ui-km', name: 'ASY25UI-KM' },
      { id: 'asy35ui-km', name: 'ASY35UI-KM' },
      { id: 'asy50ui-km', name: 'ASY50UI-KM' },
      { id: 'asy25ui-kp', name: 'ASY25UI-KP' },
      { id: 'asy35ui-kp', name: 'ASY35UI-KP' },
      { id: 'asy25ui-kt', name: 'ASY25UI-KT' },
      { id: 'asy35ui-kt', name: 'ASY35UI-KT' },
      { id: 'aoy40ui-mi2', name: 'AOY40UI-MI2 (Multisplit)' },
      { id: 'aoy50ui-mi3', name: 'AOY50UI-MI3 (Multisplit)' },
      { id: 'acy35ui-lm', name: 'ACY35UI-LM (Conductos)' },
      { id: 'acy50ui-lm', name: 'ACY50UI-LM (Conductos)' },
      { id: 'auy35ui-mi', name: 'AUY35UI-MI (Cassette)' },
      { id: 'auy50ui-mi', name: 'AUY50UI-MI (Cassette)' },
    ]
  },
  {
    id: 'lg',
    name: 'LG',
    models: [
      { id: 's09eq-nsj', name: 'S09EQ.NSJ (Standard Plus)' },
      { id: 's12eq-nsj', name: 'S12EQ.NSJ (Standard Plus)' },
      { id: 's18eq-nsj', name: 'S18EQ.NSJ (Standard Plus)' },
      { id: 'pc09sq-nsj', name: 'PC09SQ.NSJ (Dual Cool)' },
      { id: 'pc12sq-nsj', name: 'PC12SQ.NSJ (Dual Cool)' },
      { id: 'pc18sq-nsj', name: 'PC18SQ.NSJ (Dual Cool)' },
      { id: 'ap09rt-nsj', name: 'AP09RT.NSJ (Art Cool Gallery)' },
      { id: 'ap12rt-nsj', name: 'AP12RT.NSJ (Art Cool Gallery)' },
      { id: 'mu2r15-ul0', name: 'MU2R15.UL0 (Multisplit)' },
      { id: 'mu3r19-ul0', name: 'MU3R19.UL0 (Multisplit)' },
      { id: 'cb09l-n12', name: 'CB09L.N12 (Conductos)' },
      { id: 'cb12l-n12', name: 'CB12L.N12 (Conductos)' },
      { id: 'ct09f-nro', name: 'CT09F.NRO (Cassette)' },
      { id: 'ct12f-nro', name: 'CT12F.NRO (Cassette)' },
    ]
  },
  {
    id: 'samsung',
    name: 'Samsung',
    models: [
      { id: 'ar09txhqasineu', name: 'AR09TXHQASINEU (Wind-Free)' },
      { id: 'ar12txhqasineu', name: 'AR12TXHQASINEU (Wind-Free)' },
      { id: 'ar18txhqasineu', name: 'AR18TXHQASINEU (Wind-Free)' },
      { id: 'ar09txcaawkneu', name: 'AR09TXCAAWKNEU (Cebu)' },
      { id: 'ar12txcaawkneu', name: 'AR12TXCAAWKNEU (Cebu)' },
      { id: 'ar09txfyawkneu', name: 'AR09TXFYAWKNEU (Luzon)' },
      { id: 'ar12txfyawkneu', name: 'AR12TXFYAWKNEU (Luzon)' },
      { id: 'aj040txj2kg', name: 'AJ040TXJ2KG (Multisplit)' },
      { id: 'aj052txj3kg', name: 'AJ052TXJ3KG (Multisplit)' },
      { id: 'aj068txj4kg', name: 'AJ068TXJ4KG (Multisplit)' },
      { id: 'ac026rnndkg', name: 'AC026RNNDKG (Conductos)' },
      { id: 'ac035rnndkg', name: 'AC035RNNDKG (Conductos)' },
      { id: 'ac026jxadeh', name: 'AC026JXADEH (Cassette)' },
      { id: 'ac035jxadeh', name: 'AC035JXADEH (Cassette)' },
    ]
  },
  {
    id: 'panasonic',
    name: 'Panasonic',
    models: [
      { id: 'cs-tz25wkew', name: 'CS-TZ25WKEW (TZ)' },
      { id: 'cs-tz35wkew', name: 'CS-TZ35WKEW (TZ)' },
      { id: 'cs-tz50wkew', name: 'CS-TZ50WKEW (TZ)' },
      { id: 'cs-z25xkew', name: 'CS-Z25XKEW (Etherea)' },
      { id: 'cs-z35xkew', name: 'CS-Z35XKEW (Etherea)' },
      { id: 'cs-z50xkew', name: 'CS-Z50XKEW (Etherea)' },
      { id: 'cu-2z41tbe', name: 'CU-2Z41TBE (Multisplit)' },
      { id: 'cu-3z52tbe', name: 'CU-3Z52TBE (Multisplit)' },
      { id: 'cu-4z68tbe', name: 'CU-4Z68TBE (Multisplit)' },
      { id: 's-36py3e', name: 'S-36PY3E (Conductos)' },
      { id: 's-50py3e', name: 'S-50PY3E (Conductos)' },
      { id: 's-36pu3e', name: 'S-36PU3E (Cassette)' },
      { id: 's-50pu3e', name: 'S-50PU3E (Cassette)' },
    ]
  },
  {
    id: 'hisense',
    name: 'Hisense',
    models: [
      { id: 'as-09ur4syddb1g', name: 'AS-09UR4SYDDB1G (Energy)' },
      { id: 'as-12ur4syddb1g', name: 'AS-12UR4SYDDB1G (Energy)' },
      { id: 'as-18ur4syddb1g', name: 'AS-18UR4SYDDB1G (Energy)' },
      { id: 'as-09ur4svedb1g', name: 'AS-09UR4SVEDB1G (Silentium Pro)' },
      { id: 'as-12ur4svedb1g', name: 'AS-12UR4SVEDB1G (Silentium Pro)' },
      { id: 'as-09ur4rvedj1g', name: 'AS-09UR4RVEDJ1G (Expert)' },
      { id: 'as-12ur4rvedj1g', name: 'AS-12UR4RVEDJ1G (Expert)' },
      { id: '2amw42u4rra', name: '2AMW42U4RRA (Multisplit)' },
      { id: '3amw52u4rja', name: '3AMW52U4RJA (Multisplit)' },
      { id: 'aud-36ux4shl1', name: 'AUD-36UX4SHL1 (Conductos)' },
      { id: 'aud-50ux4shl1', name: 'AUD-50UX4SHL1 (Conductos)' },
    ]
  },
  {
    id: 'toshiba',
    name: 'Toshiba',
    models: [
      { id: 'ras-b10j2kvsg-e', name: 'RAS-B10J2KVSG-E (Seiya)' },
      { id: 'ras-b13j2kvsg-e', name: 'RAS-B13J2KVSG-E (Seiya)' },
      { id: 'ras-b16j2kvsg-e', name: 'RAS-B16J2KVSG-E (Seiya)' },
      { id: 'ras-b10n4kvrg-e', name: 'RAS-B10N4KVRG-E (Shorai Edge)' },
      { id: 'ras-b13n4kvrg-e', name: 'RAS-B13N4KVRG-E (Shorai Edge)' },
      { id: 'ras-b16n4kvrg-e', name: 'RAS-B16N4KVRG-E (Shorai Edge)' },
      { id: 'ras-2m14u2avg-e', name: 'RAS-2M14U2AVG-E (Multisplit)' },
      { id: 'ras-3m18u2avg-e', name: 'RAS-3M18U2AVG-E (Multisplit)' },
      { id: 'ras-m10u2dvg-e', name: 'RAS-M10U2DVG-E (Conductos)' },
      { id: 'ras-m13u2dvg-e', name: 'RAS-M13U2DVG-E (Conductos)' },
    ]
  },
  {
    id: 'haier',
    name: 'Haier',
    models: [
      { id: 'as25tadhra-thc', name: 'AS25TADHRA-THC (Tundra Plus)' },
      { id: 'as35tadhra-thc', name: 'AS35TADHRA-THC (Tundra Plus)' },
      { id: 'as50tadhra-thc', name: 'AS50TADHRA-THC (Tundra Plus)' },
      { id: 'as25s2sf2fa-3', name: 'AS25S2SF2FA-3 (Flexis Plus)' },
      { id: 'as35s2sf2fa-3', name: 'AS35S2SF2FA-3 (Flexis Plus)' },
      { id: 'as25s2sf1fa-wh', name: 'AS25S2SF1FA-WH (Flexis)' },
      { id: 'as35s2sf1fa-wh', name: 'AS35S2SF1FA-WH (Flexis)' },
      { id: '2u40s2sm1fa', name: '2U40S2SM1FA (Multisplit)' },
      { id: '3u55s2sr3fa', name: '3U55S2SR3FA (Multisplit)' },
      { id: 'ad35s2ss1fa', name: 'AD35S2SS1FA (Conductos)' },
      { id: 'ad50s2ss1fa', name: 'AD50S2SS1FA (Conductos)' },
    ]
  },
  {
    id: 'carrier',
    name: 'Carrier',
    models: [
      { id: '42qhf009ds', name: '42QHF009DS' },
      { id: '42qhf012ds', name: '42QHF012DS' },
      { id: '42qhf018ds', name: '42QHF018DS' },
      { id: '42qhf024ds', name: '42QHF024DS' },
      { id: '38qhf009ds', name: '38QHF009DS (Unidad exterior)' },
      { id: '38qhf012ds', name: '38QHF012DS (Unidad exterior)' },
      { id: '42qhb009d8s', name: '42QHB009D8S (Cassette)' },
      { id: '42qhb012d8s', name: '42QHB012D8S (Cassette)' },
      { id: '42qhd009ds', name: '42QHD009DS (Conductos)' },
      { id: '42qhd012ds', name: '42QHD012DS (Conductos)' },
    ]
  },
  {
    id: 'johnson',
    name: 'Johnson',
    models: [
      { id: 'dbs09-h11', name: 'DBS09-H11' },
      { id: 'dbs12-h11', name: 'DBS12-H11' },
      { id: 'dbs18-h11', name: 'DBS18-H11' },
      { id: 'dbs24-h11', name: 'DBS24-H11' },
      { id: 'exs09-h11', name: 'EXS09-H11' },
      { id: 'exs12-h11', name: 'EXS12-H11' },
      { id: 'split-2x1-jt2-18', name: 'Split 2x1 JT2-18' },
      { id: 'split-3x1-jt3-24', name: 'Split 3x1 JT3-24' },
      { id: 'conductos-jdc-24', name: 'Conductos JDC-24' },
      { id: 'conductos-jdc-36', name: 'Conductos JDC-36' },
    ]
  },
  {
    id: 'mundoclima',
    name: 'Mundoclima',
    models: [
      { id: 'mupr-09-h11', name: 'MUPR-09-H11' },
      { id: 'mupr-12-h11', name: 'MUPR-12-H11' },
      { id: 'mupr-18-h11', name: 'MUPR-18-H11' },
      { id: 'mupr-24-h11', name: 'MUPR-24-H11' },
      { id: 'mup2-18-h11', name: 'MUP2-18-H11 (2x1)' },
      { id: 'mup3-24-h11', name: 'MUP3-24-H11 (3x1)' },
      { id: 'mucd-24-h11', name: 'MUCD-24-H11 (Conductos)' },
      { id: 'mucd-36-h11', name: 'MUCD-36-H11 (Conductos)' },
      { id: 'muca-24-h11', name: 'MUCA-24-H11 (Cassette)' },
      { id: 'muca-36-h11', name: 'MUCA-36-H11 (Cassette)' },
    ]
  },
  {
    id: 'otro-aire',
    name: 'Otra marca',
    models: [
      { id: 'otro-modelo', name: 'Otro modelo (especificar)' },
    ]
  },
];

// ============================================
// AEROTERMIA
// ============================================
const aerotermiaBrands: EquipmentBrand[] = [
  {
    id: 'daikin-aerotermia',
    name: 'Daikin',
    models: [
      { id: 'altherma-3-r-ect', name: 'Altherma 3 R ECT' },
      { id: 'altherma-3-r-w', name: 'Altherma 3 R W' },
      { id: 'altherma-3-h-ht', name: 'Altherma 3 H HT' },
      { id: 'altherma-3-m', name: 'Altherma 3 M' },
      { id: 'altherma-3-geo', name: 'Altherma 3 GEO' },
      { id: 'altherma-lt-ca', name: 'Altherma LT CA' },
      { id: 'altherma-ht-ca', name: 'Altherma HT CA' },
      { id: 'erga04dv', name: 'ERGA04DV' },
      { id: 'erga06dv', name: 'ERGA06DV' },
      { id: 'erga08dv', name: 'ERGA08DV' },
      { id: 'erlq004cv3', name: 'ERLQ004CV3' },
      { id: 'erlq006cv3', name: 'ERLQ006CV3' },
      { id: 'erlq008cv3', name: 'ERLQ008CV3' },
    ]
  },
  {
    id: 'mitsubishi-ecodan',
    name: 'Mitsubishi Electric (Ecodan)',
    models: [
      { id: 'ecodan-puhz-sw50vka', name: 'Ecodan PUHZ-SW50VKA' },
      { id: 'ecodan-puhz-sw75vha', name: 'Ecodan PUHZ-SW75VHA' },
      { id: 'ecodan-puhz-sw100yha', name: 'Ecodan PUHZ-SW100YHA' },
      { id: 'ecodan-puhz-sw120yha', name: 'Ecodan PUHZ-SW120YHA' },
      { id: 'ecodan-puhz-shw80yaa', name: 'Ecodan PUHZ-SHW80YAA' },
      { id: 'ecodan-puhz-shw112yha', name: 'Ecodan PUHZ-SHW112YHA' },
      { id: 'ecodan-puhz-shw140yha', name: 'Ecodan PUHZ-SHW140YHA' },
      { id: 'ecodan-ehst20d-vm2c', name: 'Ecodan EHST20D-VM2C (Hydrobox)' },
      { id: 'ecodan-ehst20d-ym9c', name: 'Ecodan EHST20D-YM9C (Hydrobox)' },
      { id: 'ecodan-ehsc-vm2c', name: 'Ecodan EHSC-VM2C (Cylinder Unit)' },
      { id: 'ecodan-ehsc-ym9c', name: 'Ecodan EHSC-YM9C (Cylinder Unit)' },
    ]
  },
  {
    id: 'vaillant-aerotermia',
    name: 'Vaillant',
    models: [
      { id: 'arotherm-plus-vwl-55-6-a', name: 'aroTHERM plus VWL 55/6 A' },
      { id: 'arotherm-plus-vwl-75-6-a', name: 'aroTHERM plus VWL 75/6 A' },
      { id: 'arotherm-plus-vwl-105-6-a', name: 'aroTHERM plus VWL 105/6 A' },
      { id: 'arotherm-plus-vwl-125-6-a', name: 'aroTHERM plus VWL 125/6 A' },
      { id: 'arotherm-split-vwl-35-5-as', name: 'aroTHERM Split VWL 35/5 AS' },
      { id: 'arotherm-split-vwl-55-5-as', name: 'aroTHERM Split VWL 55/5 AS' },
      { id: 'arotherm-split-vwl-75-5-as', name: 'aroTHERM Split VWL 75/5 AS' },
      { id: 'unistor-vih-rw-300', name: 'uniSTOR VIH RW 300' },
      { id: 'unistor-vih-rw-400', name: 'uniSTOR VIH RW 400' },
      { id: 'flexotherm-vwf-57-4', name: 'flexoTHERM VWF 57/4' },
      { id: 'flexotherm-vwf-87-4', name: 'flexoTHERM VWF 87/4' },
    ]
  },
  {
    id: 'viessmann-aerotermia',
    name: 'Viessmann',
    models: [
      { id: 'vitocal-200-s-awb-e-ac-201-a04', name: 'Vitocal 200-S AWB-E-AC 201.A04' },
      { id: 'vitocal-200-s-awb-e-ac-201-a06', name: 'Vitocal 200-S AWB-E-AC 201.A06' },
      { id: 'vitocal-200-s-awb-e-ac-201-a08', name: 'Vitocal 200-S AWB-E-AC 201.A08' },
      { id: 'vitocal-200-s-awb-e-ac-201-a10', name: 'Vitocal 200-S AWB-E-AC 201.A10' },
      { id: 'vitocal-222-s-awbt-e-ac-221-a04', name: 'Vitocal 222-S AWBT-E-AC 221.A04' },
      { id: 'vitocal-222-s-awbt-e-ac-221-a06', name: 'Vitocal 222-S AWBT-E-AC 221.A06' },
      { id: 'vitocal-250-s-awb-e-ac-252-a06', name: 'Vitocal 250-S AWB-E-AC 252.A06' },
      { id: 'vitocal-250-s-awb-e-ac-252-a08', name: 'Vitocal 250-S AWB-E-AC 252.A08' },
      { id: 'vitocal-300-a-awc-o-ac-301-a07', name: 'Vitocal 300-A AWC-O-AC 301.A07' },
      { id: 'vitocal-300-a-awc-o-ac-301-a10', name: 'Vitocal 300-A AWC-O-AC 301.A10' },
    ]
  },
  {
    id: 'saunier-duval-aerotermia',
    name: 'Saunier Duval',
    models: [
      { id: 'genia-air-5', name: 'Genia Air 5' },
      { id: 'genia-air-8', name: 'Genia Air 8' },
      { id: 'genia-air-11', name: 'Genia Air 11' },
      { id: 'genia-air-15', name: 'Genia Air 15' },
      { id: 'genia-air-split-4', name: 'Genia Air Split 4' },
      { id: 'genia-air-split-6', name: 'Genia Air Split 6' },
      { id: 'genia-air-split-8', name: 'Genia Air Split 8' },
      { id: 'genia-set-5', name: 'Genia Set 5' },
      { id: 'genia-set-8', name: 'Genia Set 8' },
      { id: 'magna-aqua-150', name: 'Magna Aqua 150' },
      { id: 'magna-aqua-200', name: 'Magna Aqua 200' },
      { id: 'magna-aqua-270', name: 'Magna Aqua 270' },
    ]
  },
  {
    id: 'panasonic-aerotermia',
    name: 'Panasonic (Aquarea)',
    models: [
      { id: 'aquarea-wh-mdc05j3e5', name: 'Aquarea WH-MDC05J3E5' },
      { id: 'aquarea-wh-mdc07j3e5', name: 'Aquarea WH-MDC07J3E5' },
      { id: 'aquarea-wh-mdc09j3e5', name: 'Aquarea WH-MDC09J3E5' },
      { id: 'aquarea-wh-mxc09j3e5', name: 'Aquarea WH-MXC09J3E5' },
      { id: 'aquarea-wh-mxc12j6e5', name: 'Aquarea WH-MXC12J6E5' },
      { id: 'aquarea-wh-mxc16j9e8', name: 'Aquarea WH-MXC16J9E8' },
      { id: 'aquarea-wh-sdc0305j3e5', name: 'Aquarea WH-SDC0305J3E5 (All in One)' },
      { id: 'aquarea-wh-sdc0309j3e5', name: 'Aquarea WH-SDC0309J3E5 (All in One)' },
      { id: 'aquarea-wh-adc0309j3e5', name: 'Aquarea WH-ADC0309J3E5 (T-CAP)' },
      { id: 'aquarea-wh-adc0916j9e8', name: 'Aquarea WH-ADC0916J9E8 (T-CAP)' },
    ]
  },
  {
    id: 'lg-aerotermia',
    name: 'LG (Therma V)',
    models: [
      { id: 'therma-v-hn091mr-u44', name: 'Therma V HN091MR.U44' },
      { id: 'therma-v-hn121mr-u44', name: 'Therma V HN121MR.U44' },
      { id: 'therma-v-hn161mr-u44', name: 'Therma V HN161MR.U44' },
      { id: 'therma-v-hu051mr-u44', name: 'Therma V HU051MR.U44' },
      { id: 'therma-v-hu071mr-u44', name: 'Therma V HU071MR.U44' },
      { id: 'therma-v-hu091mr-u44', name: 'Therma V HU091MR.U44' },
      { id: 'therma-v-r32-monobloc-s-hn1616m-nk1', name: 'Therma V R32 Monobloc S HN1616M.NK1' },
      { id: 'therma-v-r32-split-hu051mr-u44', name: 'Therma V R32 Split HU051MR.U44' },
      { id: 'therma-v-r32-split-hu071mr-u44', name: 'Therma V R32 Split HU071MR.U44' },
    ]
  },
  {
    id: 'bosch-aerotermia',
    name: 'Bosch',
    models: [
      { id: 'compress-3000-aws-4', name: 'Compress 3000 AWS 4' },
      { id: 'compress-3000-aws-6', name: 'Compress 3000 AWS 6' },
      { id: 'compress-3000-aws-8', name: 'Compress 3000 AWS 8' },
      { id: 'compress-5000-aw-5', name: 'Compress 5000 AW 5' },
      { id: 'compress-5000-aw-7', name: 'Compress 5000 AW 7' },
      { id: 'compress-5000-aw-9', name: 'Compress 5000 AW 9' },
      { id: 'compress-6000-aw-5', name: 'Compress 6000 AW 5' },
      { id: 'compress-6000-aw-7', name: 'Compress 6000 AW 7' },
      { id: 'compress-6000-aw-9', name: 'Compress 6000 AW 9' },
      { id: 'compress-7000i-aw-5', name: 'Compress 7000i AW 5' },
      { id: 'compress-7000i-aw-7', name: 'Compress 7000i AW 7' },
      { id: 'compress-7000i-aw-9', name: 'Compress 7000i AW 9' },
    ]
  },
  {
    id: 'baxi-aerotermia',
    name: 'Baxi',
    models: [
      { id: 'platinum-bc-mono-5mr', name: 'Platinum BC Mono 5MR' },
      { id: 'platinum-bc-mono-8mr', name: 'Platinum BC Mono 8MR' },
      { id: 'platinum-bc-mono-11mr', name: 'Platinum BC Mono 11MR' },
      { id: 'platinum-bc-mono-14mr', name: 'Platinum BC Mono 14MR' },
      { id: 'platinum-bc-plus-v200-5mr', name: 'Platinum BC Plus V200 5MR' },
      { id: 'platinum-bc-plus-v200-8mr', name: 'Platinum BC Plus V200 8MR' },
      { id: 'platinum-bc-plus-v200-11mr', name: 'Platinum BC Plus V200 11MR' },
      { id: 'auriga-5m', name: 'Auriga 5M' },
      { id: 'auriga-8m', name: 'Auriga 8M' },
      { id: 'auriga-12m', name: 'Auriga 12M' },
    ]
  },
  {
    id: 'ariston-aerotermia',
    name: 'Ariston',
    models: [
      { id: 'nimbus-compact-40-s-net', name: 'Nimbus Compact 40 S Net' },
      { id: 'nimbus-compact-50-s-net', name: 'Nimbus Compact 50 S Net' },
      { id: 'nimbus-compact-70-s-net', name: 'Nimbus Compact 70 S Net' },
      { id: 'nimbus-plus-40-s-net', name: 'Nimbus Plus 40 S Net' },
      { id: 'nimbus-plus-50-s-net', name: 'Nimbus Plus 50 S Net' },
      { id: 'nimbus-plus-70-s-net', name: 'Nimbus Plus 70 S Net' },
      { id: 'nimbus-plus-90-s-net', name: 'Nimbus Plus 90 S Net' },
      { id: 'nimbus-m-net-40', name: 'Nimbus M Net 40' },
      { id: 'nimbus-m-net-50', name: 'Nimbus M Net 50' },
      { id: 'nuos-plus-200', name: 'Nuos Plus 200' },
      { id: 'nuos-plus-250', name: 'Nuos Plus 250' },
    ]
  },
  {
    id: 'toshiba-aerotermia',
    name: 'Toshiba (Estía)',
    models: [
      { id: 'estia-hwt-401xwht6w-e', name: 'Estía HWT-401XWHT6W-E' },
      { id: 'estia-hwt-501xwht6w-e', name: 'Estía HWT-501XWHT6W-E' },
      { id: 'estia-hwt-801xwht6w-e', name: 'Estía HWT-801XWHT6W-E' },
      { id: 'estia-hwt-1101xwht6w-e', name: 'Estía HWT-1101XWHT6W-E' },
      { id: 'estia-hwt-1401xwht6w-e', name: 'Estía HWT-1401XWHT6W-E' },
      { id: 'estia-hwt-1601xwht6w-e', name: 'Estía HWT-1601XWHT6W-E' },
      { id: 'estia-hws-455xwht6w-e', name: 'Estía HWS-455XWHT6W-E (All in One)' },
      { id: 'estia-hws-805xwht6w-e', name: 'Estía HWS-805XWHT6W-E (All in One)' },
    ]
  },
  {
    id: 'samsung-aerotermia',
    name: 'Samsung (EHS)',
    models: [
      { id: 'ehs-mono-ae050rxydeg', name: 'EHS Mono AE050RXYDEG' },
      { id: 'ehs-mono-ae080rxydeg', name: 'EHS Mono AE080RXYDEG' },
      { id: 'ehs-mono-ae120rxydeg', name: 'EHS Mono AE120RXYDEG' },
      { id: 'ehs-mono-ae160rxydeg', name: 'EHS Mono AE160RXYDEG' },
      { id: 'ehs-split-ae040rxedeg', name: 'EHS Split AE040RXEDEG' },
      { id: 'ehs-split-ae060rxedeg', name: 'EHS Split AE060RXEDEG' },
      { id: 'ehs-split-ae090rxedeg', name: 'EHS Split AE090RXEDEG' },
      { id: 'ehs-climahub-ae200rnwseg', name: 'EHS ClimahHub AE200RNWSEG' },
      { id: 'ehs-climahub-ae260rnwseg', name: 'EHS ClimahHub AE260RNWSEG' },
    ]
  },
  {
    id: 'otro-aerotermia',
    name: 'Otra marca',
    models: [
      { id: 'otro-modelo', name: 'Otro modelo (especificar)' },
    ]
  },
];

// ============================================
// EXPORTACIÓN PRINCIPAL
// ============================================
export const equipmentDatabase: EquipmentCategory[] = [
  {
    type: 'caldera',
    label: 'Caldera',
    icon: 'Flame',
    brands: calderasBrands,
  },
  {
    type: 'aire_acondicionado',
    label: 'Aire Acondicionado',
    icon: 'Wind',
    brands: aireAcondicionadoBrands,
  },
  {
    type: 'aerotermia',
    label: 'Aerotermia',
    icon: 'Zap',
    brands: aerotermiaBrands,
  },
];

// Función helper para obtener marcas por tipo de equipo
export function getBrandsByType(type: EquipmentType): EquipmentBrand[] {
  const category = equipmentDatabase.find(cat => cat.type === type);
  return category?.brands || [];
}

// Función helper para obtener modelos por marca
export function getModelsByBrand(type: EquipmentType, brandId: string): EquipmentModel[] {
  const brands = getBrandsByType(type);
  const brand = brands.find(b => b.id === brandId);
  return brand?.models || [];
}

// Función helper para buscar marcas
export function searchBrands(type: EquipmentType, query: string): EquipmentBrand[] {
  const brands = getBrandsByType(type);
  const normalizedQuery = query.toLowerCase().trim();
  return brands.filter(brand => 
    brand.name.toLowerCase().includes(normalizedQuery)
  );
}

// Función helper para buscar modelos
export function searchModels(type: EquipmentType, brandId: string, query: string): EquipmentModel[] {
  const models = getModelsByBrand(type, brandId);
  const normalizedQuery = query.toLowerCase().trim();
  return models.filter(model => 
    model.name.toLowerCase().includes(normalizedQuery)
  );
}

// Lista de síntomas comunes
export const commonSymptoms = [
  { id: 'no-enciende', label: 'No enciende', icon: 'Power' },
  { id: 'codigo-error', label: 'Muestra un código de error', icon: 'AlertTriangle' },
  { id: 'ruidos', label: 'Hace ruidos extraños', icon: 'Volume2' },
  { id: 'no-calienta', label: 'No calienta / No enfría', icon: 'Thermometer' },
  { id: 'se-apaga', label: 'Se apaga solo', icon: 'PowerOff' },
  { id: 'gotea', label: 'Gotea o pierde agua', icon: 'Droplet' },
  { id: 'olor', label: 'Emite mal olor', icon: 'Wind' },
  { id: 'display-apagado', label: 'Display apagado o parpadea', icon: 'Monitor' },
  { id: 'no-responde', label: 'No responde al mando', icon: 'Wifi' },
  { id: 'otro', label: 'Otro problema', icon: 'HelpCircle' },
];

// Códigos de error más comunes por marca (para sugerencias)
export const commonErrorCodes: Record<string, string[]> = {
  'junkers': ['EA', 'E9', 'C6', 'C7', 'CE', 'F0', 'F7', 'A7', 'A8', 'F1'],
  'vaillant': ['F22', 'F28', 'F29', 'F75', 'F20', 'F61', 'F62', 'F63', 'F64', 'F65'],
  'saunier-duval': ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F10', 'F13', 'F14', 'F28'],
  'baxi': ['E01', 'E02', 'E03', 'E04', 'E05', 'E10', 'E25', 'E35', 'E40', 'E50'],
  'viessmann': ['F1', 'F2', 'F3', 'F4', 'F5', 'F30', 'F38', 'F50', 'F51', 'F52'],
  'ferroli': ['A01', 'A02', 'A03', 'A04', 'A05', 'A06', 'F04', 'F05', 'F10', 'F11'],
  'ariston': ['501', '502', '503', '504', '505', '601', '602', '607', '608', '610'],
  'default': ['E1', 'E2', 'E3', 'E4', 'E5', 'F1', 'F2', 'F3', 'F4', 'F5'],
};
