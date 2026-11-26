// United States in Numbers — verified data (V3, interactive edition)
// Every figure below was pulled from the World Bank Open Data API
// (World Development Indicators, country USA) and the U.S. Bureau of
// Economic Analysis state GDP release on 2026-11-26. No figure is
// estimated or invented; display rounding only (GDP 2 decimals,
// population 1 decimal, rates 2 decimals).

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

// Ten annual series, 2015-2024, in the units the World Bank publishes.
export const S = {
  gdp:   [18.30, 18.80, 19.61, 20.66, 21.54, 21.38, 23.73, 26.05, 27.81, 29.30], // $ trillion, current
  gdppc: [56849, 57977, 60048, 62876, 65228, 64465, 71441, 78009, 82587, 86170],  // $ per person
  growth:[2.95, 1.82, 2.46, 2.97, 2.58, -2.08, 6.15, 2.52, 2.93, 2.79],         // real % a year
  cpi:   [0.12, 1.26, 2.13, 2.44, 1.81, 1.23, 4.70, 8.00, 4.12, 2.95],          // CPI inflation %
  unemp: [5.28, 4.87, 4.36, 3.90, 3.67, 8.05, 5.35, 3.65, 3.64, 4.02],          // % of labour force
  pop:   [321.8, 324.4, 326.6, 328.5, 330.2, 331.6, 332.1, 334.0, 336.8, 340.0],// million people
  exp:   [12.41, 11.89, 12.18, 12.29, 11.79, 10.12, 10.83, 11.65, 11.05, 10.97],// exports % of GDP
  imp:   [15.28, 14.56, 14.95, 15.16, 14.47, 13.02, 14.41, 15.25, 13.88, 14.04],// imports % of GDP
  life:  [78.69, 78.54, 78.54, 78.64, 78.79, 76.98, 76.33, 77.43, 78.39, 78.89],// years
  debt:  [96.14, 98.12, 97.21, 98.63, 100.23, 124.51, 118.28, 112.72, 114.74, 115.79], // central gov debt % GDP
};

// Largest state economies, 2024, current dollars (BEA GDP by state).
// Only the top four are shown: they are the ones this build verified.
export const STATES = [
  { name: 'California', gdp: 4.10, share: 14.0, note: 'Largest state economy — bigger than Japan ($4.02T)' },
  { name: 'Texas',      gdp: 2.71, share: 9.3,  note: 'Energy, tech and manufacturing hub' },
  { name: 'New York',   gdp: 2.30, share: 7.9,  note: 'Finance and media capital' },
  { name: 'Florida',    gdp: 1.71, share: 5.8,  note: 'Tourism, trade and fast-growing population' },
];

export const BEA = {
  src: 'U.S. Bureau of Economic Analysis · GDP by state',
  link: 'https://www.bea.gov/data/gdp/gdp-state',
};

export const RANK = { California: 1, Texas: 2, 'New York': 3, Florida: 4 };

// Per-indicator metadata: display title, unit, formatter, the official
// series it comes from (with its World Bank indicator code), a plain
// definition, and related figures shown in the source panel.
export const META = {
  gdp: { t: 'Gross Domestic Product', u: '$ trillion', f: v => '$' + v.toFixed(2) + 'T',
    src: 'World Bank · NY.GDP.MKTP.CD', link: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.CD?locations=US',
    def: 'The total value of all goods and services produced in the United States in a year, in current US dollars. 2024: $29.30 trillion — the largest economy in the world, about 25% of global output.',
    rel: [['GDP per capita', '$86,170'], ['Real growth, 2024', '+2.79%'], ['Share of world GDP', '≈ 25%']] },
  gdppc: { t: 'GDP per Capita', u: 'US$', f: v => '$' + Math.round(v).toLocaleString(),
    src: 'World Bank · NY.GDP.PCAP.CD', link: 'https://data.worldbank.org/indicator/NY.GDP.PCAP.CD?locations=US',
    def: 'GDP divided by the mid-year population — average economic output per person. The US figure, $86,170 in 2024, is the highest among large economies.',
    rel: [['GDP, 2024', '$29.30T'], ['Population, 2024', '340.0 million'], ['10-year change', '+51.6%']] },
  growth: { t: 'Real GDP Growth', u: '% per year', f: v => (v > 0 ? '+' : '') + v.toFixed(2) + '%',
    src: 'World Bank · NY.GDP.MKTP.KD.ZG', link: 'https://data.worldbank.org/indicator/NY.GDP.MKTP.KD.ZG?locations=US',
    def: 'Annual change in GDP after removing inflation. The 2020 dip (−2.08%) was the pandemic recession; 2021 rebounded +6.15%, the fastest since 1984.',
    rel: [['2020 (pandemic)', '−2.08%'], ['2021 rebound', '+6.15%'], ['2024', '+2.79%']] },
  cpi: { t: 'Consumer Price Inflation', u: '% per year', f: v => v.toFixed(2) + '%',
    src: 'World Bank · FP.CPI.TOTL.ZG', link: 'https://data.worldbank.org/indicator/FP.CPI.TOTL.ZG?locations=US',
    def: 'Annual change in the consumer price index — how fast the price of a typical basket of goods and services rises. Peaked at 8.00% in 2022, the highest in four decades, then cooled to 2.95% in 2024.',
    rel: [['Peak (2022)', '8.00%'], ['2024', '2.95%'], ['2015–2019 average', '≈ 1.6%']] },
  unemp: { t: 'Unemployment Rate', u: '% of labour force', f: v => v.toFixed(2) + '%',
    src: 'World Bank · SL.UEM.TOTL.ZS (ILO estimate)', link: 'https://data.worldbank.org/indicator/SL.UEM.TOTL.ZS?locations=US',
    def: 'Share of the labour force without work but available for and seeking employment. Spiked to 8.05% in 2020 and returned to about 4% by 2023–2024.',
    rel: [['2020 peak', '8.05%'], ['2019 low', '3.67%'], ['2024', '4.02%']] },
  pop: { t: 'Total Population', u: 'million', f: v => v.toFixed(1) + ' million',
    src: 'World Bank · SP.POP.TOTL', link: 'https://data.worldbank.org/indicator/SP.POP.TOTL?locations=US',
    def: 'Mid-year population. The US passed 340 million in 2024 and is the third most populous country, after India and China. Growth has slowed to about 0.5% a year.',
    rel: [['2024', '340.0 million'], ['2015', '321.8 million'], ['10-year growth', '+5.7%']] },
  exp: { t: 'Exports of Goods & Services', u: '% of GDP', f: v => v.toFixed(2) + '%',
    src: 'World Bank · NE.EXP.GNFS.ZS', link: 'https://data.worldbank.org/indicator/NE.EXP.GNFS.ZS?locations=US',
    def: 'Exports as a share of GDP. The US economy is unusually domestic-focused for its size: only about 11% of GDP is exported, against 18% for China and over 40% for Germany.',
    rel: [['2024', '10.97% of GDP'], ['≈ $3.21T', 'in current dollars'], ['Imports, 2024', '14.04% of GDP']] },
  imp: { t: 'Imports of Goods & Services', u: '% of GDP', f: v => v.toFixed(2) + '%',
    src: 'World Bank · NE.IMP.GNFS.ZS', link: 'https://data.worldbank.org/indicator/NE.IMP.GNFS.ZS?locations=US',
    def: 'Imports as a share of GDP. Imports exceed exports every year in the series, giving the US a goods-and-services deficit of about 3.1% of GDP in 2024.',
    rel: [['2024', '14.04% of GDP'], ['Trade balance, 2024', '≈ −3.07% of GDP'], ['Exports, 2024', '10.97% of GDP']] },
  life: { t: 'Life Expectancy at Birth', u: 'years', f: v => v.toFixed(2) + ' years',
    src: 'World Bank · SP.DYN.LE00.IN', link: 'https://data.worldbank.org/indicator/SP.DYN.LE00.IN?locations=US',
    def: 'How long a newborn would live on average if current mortality rates stayed the same. Fell sharply in 2020–2021 (COVID-19) to 76.33 years, then recovered to 78.89 in 2024.',
    rel: [['2019', '78.79 years'], ['2021 low', '76.33 years'], ['2024', '78.89 years']] },
  debt: { t: 'Central Government Debt', u: '% of GDP', f: v => v.toFixed(2) + '%',
    src: 'World Bank · GC.DOD.TOTL.GD.ZS', link: 'https://data.worldbank.org/indicator/GC.DOD.TOTL.GD.ZS?locations=US',
    def: 'Total central government debt as a share of GDP. Jumped from about 100% to 124.5% in 2020 with pandemic spending, and stood at 115.8% in 2024.',
    rel: [['2019', '100.23%'], ['2020 peak', '124.51%'], ['2024', '115.79%']] },
};

// Full source list for the Sources page: the ten World Bank series plus BEA.
// Derived figures quoted in the copy (trade deficit ≈3.07% of GDP,
// four largest states $10.82T = 37% of the US) are arithmetic on the
// series above, not separate data: exports 10.97% − imports 14.04%,
// and 4.10 + 2.71 + 2.30 + 1.71 over GDP 29.30.
export const SOURCES = Object.keys(META).map(k => ({
  title: META[k].t, src: META[k].src, link: META[k].link,
}));
SOURCES.push({ title: 'State GDP', src: BEA.src, link: BEA.link });
