"""
Clean OCR output:
1. Remove noise (iShot, personal info, FUTU references, watermarks)
2. Split into clean EN/CN sections
3. Structure as topics for KNOWLEDGE_CONTENT
"""
import re, json

with open('ocr_final_combined.md', 'r') as f:
    raw = f.read()

# === STEP 1: Remove noise blocks ===
noise_patterns = [
    # Header noise
    r'金融入门考试学习资料\s*',
    r'easonlv\s+Viktor\s+3月17日修改\s*',
    r'AI 速览\s*',
    r'"[^"]*iShot[^"]*"[^\n]*\n?',
    r'这将允许 iShot[^\n]*\n?',
    r'打开系统设置 允许\s*',
    # Exam structure
    r'内部考试体系-大纲\s*',
    r'Internal Examination System[^\n]*\n?',
    r'富途\s*\n?',
    r'Syllabus\s*\n?',
    r'考纲\s*\n?',
    r'1\. \* Represents[^\n]*\n?',
    r'2\. This exam focuses[^\n]*\n?',
    r'3\. Logic: From Macro[^\n]*\n?',
    r'4\. Asset Category Order[^\n]*\n?',
    # Exam notes about testing
    r'注：\s*\n',
    r'1\.入门考试[^\n]*\n?',
    r'2\.为防止资料外泄[^\n]*\n?',
    # Product-level FUTU references
    r'- 产品层面：掌握富途牛牛 App内[^\n]*\n?',
]

for p in noise_patterns:
    raw = re.sub(p, '', raw)

# Remove FUTU app screenshot blocks
raw = re.sub(r'\*\*富途牛牛 App[^*]*\*\*[\s\S]*?(?=\n\n- \*\*Explanation|\n\n#|$)', '', raw)
raw = re.sub(r'富途牛牛 App[^\n]*\n?', '', raw)
raw = re.sub(r'### 富途牛牛[^\n]*\n?[\s\S]*?(?=\n\n|\Z)', '', raw)

# Remove remaining FUTU app blocks (screenshot data)
raw = re.sub(r'(?:18:2[89]|16:51)[\s\S]*?(?=\n\n|\Z)', '', raw)
raw = re.sub(r'Premium数据试用[^\n]*\n?', '')
raw = re.sub(r'- 按钮：去升级\s*', '')
raw = re.sub(r'- 时间：18:24[^\n]*\n?', '')
raw = re.sub(r'- 状态栏[^\n]*\n?', '')

# Remove repeated "数据概览" table blocks that are just UI noise
raw = re.sub(r'\|\s*数据概览\s*\|[\s\S]*?(?=\n\n)', '\n', raw)
raw = re.sub(r'\|\s*图表资讯\s*\|[\s\S]*?(?=\n\n)', '\n', raw)
raw = re.sub(r'\|\s*历史趋势\s*\|[\s\S]*?(?=\n\n)', '\n', raw)
raw = re.sub(r'\|\s*历史数据\s*\|[\s\S]*?(?=\n\n)', '\n', raw)
raw = re.sub(r'\|\s*经济数据\s*\|[\s\S]*?(?=\n\n)', '\n', raw)
raw = re.sub(r'\|\s*时间轴\s*\|[\s\S]*?(?=\n\n)', '\n', raw)

# Remove duplicate/junk lines
raw = re.sub(r'\(与就业保障[^\n]*\n?', '', raw)
raw = re.sub(r'图表 资讯\s*\n?', '', raw)
raw = re.sub(r'自选 市场 开户 理财[^\n]*\n?', '', raw)
raw = re.sub(r'概览 美股 新加坡[^\n]*\n?', '', raw)
raw = re.sub(r'WLTH JPM BAC\s*\n?', '', raw)
raw = re.sub(r'SIFY BK WFC\s*\n?', '', raw)
raw = re.sub(r'精选宏观数据\s*\n?', '', raw)
raw = re.sub(r'1月28日利率[^\n]*\n?', '', raw)
raw = re.sub(r'业绩预期\s*\n?', '', raw)
raw = re.sub(r'1 美光科技[^\n]*\n?', '', raw)
raw = re.sub(r'FPS预期盈利\s*\n?', '', raw)
raw = re.sub(r'12 星期一 13 星期二[^\n]*\n?', '', raw)
raw = re.sub(r'市场\s*\n?', '', raw)

# Clean up excessive newlines
raw = re.sub(r'\n{4,}', '\n\n\n', raw)
raw = re.sub(r'---\s*\n\s*---', '---', raw)

# === STEP 2: Save cleaned bilingual version ===
cleaned_path = 'ocr_cleaned.md'
with open(cleaned_path, 'w') as f:
    f.write(raw.strip())

print(f'Cleaned OCR saved: {len(raw)} chars')

# === STEP 3: Split into EN and CN versions manually ===
# The structure is: English paragraph followed by Chinese paragraph
# We'll create a structured JSON with topics

topics = [
    {
        "id": "1.1.1",
        "title": "Fundamentals of the Business Cycle",
        "title_cn": "经济周期基础知识",
        "en": "The business cycle refers to the recurring, irregular fluctuations in aggregate economic activity around the economy's long-term potential growth trend. It is officially determined by the U.S. National Bureau of Economic Research (NBER), which defines a 'recession' as a significant decline in economic activity spread across the economy, lasting more than a few months — encompassing production, employment, and income. The business cycle's duration varies (typically 2-10 years) and is driven by shifts in aggregate demand and aggregate supply.",
        "cn": "商业周期是指总体经济活动围绕经济长期潜在增长趋势反复出现的、不规则的波动。它由美国国家经济研究局（NBER）正式确定，该局将"衰退"定义为广泛蔓延于整个经济的经济活动显著下降，持续数月以上——包括生产、就业和收入。商业周期的持续时间各不相同（通常为2至10年），由总需求和总供给的变化驱动。"
    },
    {
        "id": "1.1.2",
        "title": "Four Phases of Business Cycle",
        "title_cn": "经济周期的四个阶段",
        "en": """The business cycle consists of four distinct phases:

**Expansion**: Economic activity rises above potential output; real GDP grows steadily (2-3% U.S. long-term trend); employment expands; business investment increases; consumer confidence strengthens. Unemployment rate below natural rate (4-4.5%); core inflation 1-2% (near Fed target).

**Peak**: Economic growth slows to a halt; output reaches maximum level; inflationary pressures peak as capacity constraints emerge. Real GDP growth <1%; unemployment rate at trough (often <4%); core inflation >2.5% (above target).

**Contraction (Recession)**: Economic activity falls below potential output; real GDP declines; businesses cut investment; layoffs increase; consumer spending weakens. Real GDP growth negative for ≥2 quarters; unemployment rate rises ≥1 percentage point; core inflation decelerates.

**Trough**: Economic decline stops; output hits bottom; pessimism fades; businesses and consumers begin to rebuild confidence. Real GDP growth stabilizes near 0%; unemployment rate peaks; core inflation may reach a floor.""",
        "cn": """经济周期包含四个不同阶段：

**扩张期**：经济活动高于潜在产出；实际GDP稳步增长（美国长期趋势增长率为2-3%）；就业扩大；企业投资增加；消费者信心增强。失业率低于自然失业率（4-4.5%）；核心通胀率1-2%（接近美联储目标）。

**峰值期**：经济增长停滞；产出达到最高水平；随着产能限制的出现，通胀压力达到顶峰。实际GDP增长率<1%；失业率处于低谷（通常<4%）；核心通胀率>2.5%（高于目标）。

**收缩期（衰退）**：经济活动低于潜在产出；实际GDP下降；企业削减投资；裁员增加；消费者支出减弱。实际GDP增长连续≥2个季度为负；失业率上升≥1个百分点；核心通胀放缓。

**低谷期**：经济衰退停止；产出触底；悲观情绪消退；企业和消费者开始重建信心。实际GDP增长稳定在0%左右；失业率达到峰值；核心通胀率可能触底。"""
    },
    {
        "id": "1.1.3",
        "title": "Key Drivers of the U.S. Business Cycle",
        "title_cn": "经济周期的关键驱动因素",
        "en": """Factors directly influencing U.S. business cycle fluctuations:

- **Consumer Spending**: Consumer spending accounts for approximately 68-70% of U.S. GDP, making it the primary driver of aggregate demand. Changes in consumer confidence (tied to employment security and wage growth) directly impact retail sales, housing demand, and discretionary spending (e.g., autos, electronics) — critical for U.S. equity sectors like consumer staples and discretionary.

- **Business Investment**: Includes spending on machinery, equipment, and commercial real estate. U.S. business investment is sensitive to interest rates (Fed policy), corporate profit margins, and technological innovation (e.g., AI-related investment boom in 2023-2024).

- **Monetary Policy (Federal Reserve)**: Fed's adjustments to the federal funds rate and balance sheet (quantitative easing/QE, quantitative tightening/QT) directly influence borrowing costs for businesses and consumers, asset prices (stocks, bonds), and inflation.

- **Net Exports**: Tied to the U.S. dollar exchange rate and global demand. A stronger USD reduces U.S. export competitiveness, while weak global demand weighs on U.S. export growth.""",
        "cn": """直接影响美国商业周期波动的因素：

- **消费者支出**：消费者支出约占美国GDP的68-70%，是总需求的主要驱动力。消费者信心的变化（与就业保障和工资增长相关）直接影响零售销售、住房需求和可自由支配支出（例如，汽车、电子产品）——对美国消费必需品和可自由支配等股票部门至关重要。

- **企业投资**：包括对机械、设备和商业地产的支出。美国商业投资对利率（美联储政策）、企业利润率和技术创新（例如，2023-2024年与AI相关的投资热潮）敏感。

- **货币政策（美联储）**：美联储对联邦基金利率和资产负债表（量化宽松/QE、量化紧缩/QT）的调整直接影响企业和消费者的借贷成本、资产价格（股票、债券）以及通货膨胀。

- **净出口**：与美元汇率和全球需求相关。美元走强会削弱美国出口竞争力，而全球需求疲软则会拖累美国出口增长。"""
    },
    {
        "id": "1.1.4-intro",
        "title": "Summary of Common U.S. Economic Indicators",
        "title_cn": "美国常见经济指标总览",
        "en": """These indicators are closely monitored by U.S. financial markets to gauge business cycle stages, inflation, and policy trends.

| Indicator Category | Specific Indicators | Basis for Classification |
|---|---|---|
| **Leading Indicators** (Predict future cycle turning points) | ISM Manufacturing PMI, Core Durable Goods Orders, Consumer Confidence Index (CCI), 10-Year Treasury Yield & 10Y-2Y Spread | Change ahead of economic cycle; reflect future spending/investment plans (e.g., yield curve inversion precedes recessions) |
| **Coincident Indicators** | Gross Domestic Product (GDP), Nonfarm Payrolls (NFP), Retail Sales | Directly reflect current economic activity; move in tandem with aggregate output and employment trends |
| **Lagging Indicators** | Unemployment Rate, CPI, PCE Price Index | Adjust after economic activity changes to confirm cycle trends (e.g., unemployment peaks post-recession) |""",
        "cn": """美国金融市场密切关注这些指标，以评估商业周期阶段、通货膨胀和政策趋势。

| 指标类别 | 具体指标 | 分类依据 |
|---|---|---|
| **领先指标**（预测未来周期转折点） | ISM制造业PMI、核心耐用品订单、消费者信心指数（CCI）、10年期国债收益率及10年期-2年期利差 | 先于经济周期变化；反映未来支出/投资计划预测关系（例如，收益率曲线倒挂先于衰退） |
| **同步指标** | 国内生产总值（GDP）、非农就业人数（NFP）、零售销售 | 直接反映当前经济活动；与总产出和就业趋势同步变动 |
| **滞后指标** | 失业率、CPI、PCE物价指数 | 在经济活动变化后进行调整以确认周期趋势（例如，衰退后失业率达到峰值） |"""
    }
]

# Individual indicators
indicators = [
    {
        "id": "gdp",
        "title": "Gross Domestic Product (GDP)",
        "title_cn": "国内生产总值",
        "type": "Coincident Indicator",
        "type_cn": "同步指标",
        "en": """**Definition**: The total market value of all final goods and services produced within a country's borders in a given period. The BEA releases quarterly data with three revisions; real GDP (adjusted for inflation) is the key metric for cycle analysis.

**Explanation**: The broadest measure of economic activity. Real GDP growth above 2% (U.S. potential growth rate) indicates expansion; growth below 1% signals slowing activity; negative growth for ≥2 quarters is a common recession proxy (supplementary to NBER's definition). Market reactions: strong GDP may raise Fed hike expectations (pressuring bonds); weak growth may signal easing (bonds outperform).""",
        "cn": """**定义**：在给定时期内，一个国家境内生产的所有最终商品和服务的总市场价值。美国经济分析局（BEA）每季度发布数据，并有三次修订；实际GDP（经通胀调整）是周期分析的关键指标。

**解释**：经济活动最广泛的衡量指标。实际GDP增长高于2%（美国潜在增长率）表明经济扩张；增长低于1%则预示经济活动放缓；连续两个或更多季度的负增长是常见的衰退指标。市场反应：强劲的GDP可能提高美联储加息预期（给债券带来压力）；经济疲软可能预示政策宽松（债券表现优于其他资产）。"""
    },
    {
        "id": "nfp",
        "title": "Nonfarm Payrolls (NFP)",
        "title_cn": "非农就业人数",
        "type": "Coincident Indicator",
        "type_cn": "同步指标",
        "en": """**Definition**: Monthly BLS data measuring the change in employment across all sectors except agriculture, private households, and non-profits — considered the most reliable gauge of U.S. labor market trends.

**Explanation**: NFP is the most impactful monthly indicator. Average monthly gains of 150k-200k signal stable employment; gains >300k indicate tight labor markets; gains <100k suggest slowing growth. Changes in NFP directly link to consumer spending (68-70% of GDP) and Fed policy.""",
        "cn": """**定义**：每月BLS数据，衡量除农业、私人家庭和非营利组织之外所有行业的就业变化，被认为是衡量美国劳动力市场趋势最可靠的指标。

**解释**：非农就业人数（NFP）是最具影响力的月度指标。月均新增15万至20万个就业岗位表明就业形势稳定；新增超过30万个就业岗位则表明劳动力市场紧张；涨幅<10万表明增长放缓。非农就业人数的变化直接关系到消费者支出（占GDP的68-70%）和美联储政策。"""
    },
    {
        "id": "unemployment",
        "title": "Unemployment Rate",
        "title_cn": "失业率",
        "type": "Lagging Indicator",
        "type_cn": "滞后指标",
        "en": """**Definition**: BLS monthly data measuring the percentage of the labor force (employed + actively seeking work) that is unemployed; excludes discouraged workers (a key limitation).

**Explanation**: The U.S. natural rate of unemployment (full employment) is 4-4.5%. Unemployment below this range creates wage inflation pressures; above 6% (e.g., 14.7% in 2020) signals recessionary conditions.""",
        "cn": """**定义**：BLS月度数据，用于衡量劳动力（就业者+积极求职人员）中失业人员的百分比；不包括灰心丧气的劳动者（这是一个关键局限性）。

**解释**：美国自然失业率（充分就业）为4-4.5%，低于这一范围的失业率会产生工资通胀压力；高于6%（例如2020年为14.7%）表明经济处于衰退状态。"""
    },
    {
        "id": "cpi",
        "title": "Consumer Price Index (CPI)",
        "title_cn": "消费者价格指数",
        "type": "Lagging Indicator",
        "type_cn": "滞后指标",
        "en": """**Definition**: Monthly BLS data measuring the change in prices of a fixed basket of goods/services (food, energy, housing, healthcare) purchased by urban consumers. Core CPI (excludes food/energy) is preferred for trend analysis due to volatility.

**Explanation**: The primary market-watched inflation gauge. Core CPI growth above 3% triggers Fed hawkishness; below 1% raises deflation risks. Critical for bonds (inflation erodes fixed returns) and stocks (high inflation compresses margins).""",
        "cn": """**定义**：每月BLS数据，用于衡量城市消费者购买的一篮子固定商品/服务（食品、能源、住房、医疗保健）价格的变化。由于波动性，核心CPI（不包括食品/能源）更适合用于趋势分析。

**解释**：主要受市场关注的通胀指标。核心CPI涨幅超过3%会引发美联储的鹰派立场；低于1%会增加通缩风险。这对债券（通胀会侵蚀固定回报）和股票（高通胀会压缩利润率）至关重要。"""
    },
    {
        "id": "pce",
        "title": "Personal Consumption Expenditures (PCE) Price Index",
        "title_cn": "个人消费支出价格指数",
        "type": "Lagging Indicator",
        "type_cn": "滞后指标",
        "en": """**Definition**: Monthly BEA data measuring prices of goods/services purchased by consumers, with a more flexible basket than CPI (e.g., includes employer-paid healthcare). Core PCE (excludes food/energy) is the Fed's preferred inflation gauge.

**Explanation**: Directly guides Fed policy (2% target). Core PCE above 2% sustains hawkishness; below 2% supports dovishness. PCE is less volatile than CPI, leading to more muted but longer-lasting market reactions.""",
        "cn": """**定义**：美国经济分析局（BEA）的月度数据，用于衡量消费者购买商品和服务的价格，其商品篮子比CPI更灵活（例如，包括雇主支付的医疗保险费用）。核心PCE（不包括食品/能源）是美联储首选的通胀指标。

**解释**：直接指导美联储政策（2%目标）。核心PCE高于2%会维持鹰派立场；低于2%的支持鸽派立场。PCE的波动性低于CPI，导致市场反应更为温和但持续时间更长。"""
    },
    {
        "id": "ism-pmi",
        "title": "ISM Manufacturing PMI",
        "title_cn": "ISM制造业PMI",
        "type": "Leading Indicator",
        "type_cn": "领先指标",
        "en": """**Definition**: Monthly ISM survey of manufacturing firms, measuring new orders, production, employment, supplier deliveries, and inventories. A reading >50 indicates expansion; <50 indicates contraction.

**Explanation**: A leading indicator (PMI >55 signals strong industrial growth; <45 suggests manufacturing recession). The new orders sub-index is a key predictor of future GDP growth.""",
        "cn": """**定义**：每月对制造业企业进行的ISM调查，衡量新订单、生产、就业、供应商交货和库存情况。读数>50表示扩张；<50表示收缩。

**解释**：领先指标（PMI>55表明工业强劲增长；<45则暗示制造业衰退）。新订单分项指数是未来GDP增长的关键预测指标。"""
    },
    {
        "id": "retail-sales",
        "title": "Retail Sales",
        "title_cn": "零售销售",
        "type": "Coincident Indicator",
        "type_cn": "同步指标",
        "en": """**Definition**: Monthly BLS data measuring total sales of retail establishments (including food services and autos). Core retail sales (excludes autos/gasoline) is a better proxy for consumer spending trends.

**Explanation**: Reflects consumer health (68-70% of GDP). Monthly growth >0.5% indicates strong demand (supports consumer stocks); negative growth signals weak confidence. Critical for assessing expansion sustainability.""",
        "cn": """**定义**：每月BLS数据，衡量零售企业（包括餐饮服务和汽车）的总销售额。核心零售销售（不包括汽车/汽油）是衡量消费者支出趋势的更好指标。

**解释**：反映消费者健康状况（占GDP的68-70%）。月度增长率>0.5%表明需求强劲（支撑消费股）；负增长则表明信心不足。对于评估扩张的可持续性至关重要。"""
    },
    {
        "id": "durable-goods",
        "title": "Durable Goods Orders",
        "title_cn": "耐用品订单",
        "type": "Leading Indicator",
        "type_cn": "领先指标",
        "en": """**Definition**: Monthly BEA data measuring new orders for goods with a useful life >3 years (autos, machinery, aircraft). Core orders (excludes transportation) are a proxy for business investment (reduces volatility).

**Explanation**: A leading indicator of investment and industrial activity. Strong growth suggests business expansion (benefits industrials/tech); declining numbers signal weak confidence (recession risk).""",
        "cn": """**定义**：美国经济分析局（BEA）的月度数据，衡量使用寿命超过3年的商品（汽车、机械、飞机）的新订单。核心订单（不包括运输）是商业投资的一个替代指标（可降低波动性）。

**解释**：投资和工业活动的领先指标。强劲增长表明企业正在扩张（对工业/科技行业有利）；数字下降表明信心不足（衰退风险）。"""
    },
    {
        "id": "cci",
        "title": "Consumer Confidence Index (CCI)",
        "title_cn": "消费者信心指数",
        "type": "Leading Indicator",
        "type_cn": "领先指标",
        "en": """**Definition**: Monthly Conference Board survey measuring consumers' assessment of current conditions and future expectations (0-100 scale).

**Explanation**: High CCI (>100, e.g., 102.6 in 2023) signals strong spending intent (supports retail stocks); low CCI (<80, e.g., current reading of 54) indicates caution. The expectations sub-index is a leading indicator.""",
        "cn": """**定义**：每月由世界大型企业联合会进行的调查，用于衡量消费者对当前状况和未来预期的评估（0-100分制）。

**解释**：高CCI（>100，例如2023年的102.6）表明强劲的消费意愿（支持零售股）；低CCI（<80，例如当前读数为54）表明需谨慎。预期子指数是一个领先指标。"""
    },
    {
        "id": "treasury-yield",
        "title": "10-Year Treasury Yield & Yield Curve (10Y-2Y Spread)",
        "title_cn": "10年期国债收益率及收益率曲线",
        "type": "Leading Indicator",
        "type_cn": "领先指标",
        "en": """**Definition**: The 10-year Treasury yield is the benchmark for long-term borrowing costs; the 10Y-2Y spread is the difference between 10-year and 2-year yields — used to predict cycle turning points.

**Explanation**: An inverted spread (10Y < 2Y) has preceded every U.S. recession since 1950 (6-18-month lag). A steepening spread signals expansion expectation. The 10-year yield benchmarks mortgages and corporate bonds.""",
        "cn": """**定义**：10年期国债收益率是长期借款成本的基准；10年期与2年期国债收益率利差是10年期和2年期国债收益率之间的差值，用于预测周期转折点。

**解释**：自1950年以来，每次美国经济衰退之前都会出现收益率曲线倒挂（10年期国债收益率低于2年期国债收益率）（滞后6至18个月）。收益率曲线变陡预示着经济扩张预期。10年期国债收益率是抵押贷款和公司债券的基准。"""
    },
    {
        "id": "1.2.1",
        "title": "Federal Reserve Monetary Policy Overview",
        "title_cn": "美联储货币政策概述",
        "en": """The Federal Reserve, through the Federal Open Market Committee (FOMC), sets the target range for the federal funds rate — the interest rate at which banks lend reserves to each other overnight. This rate influences broader borrowing costs across the economy, including mortgages, corporate loans, and consumer credit.

The Fed's dual mandate is to promote **maximum employment** and **stable prices** (targeting 2% inflation). Historical fed funds rate cycles since 1980 include multiple hikes and cuts, often in response to economic conditions.""",
        "cn": """美联储通过联邦公开市场委员会（FOMC）设定联邦基金利率的目标区间，即银行之间隔夜拆借准备金的利率。这一利率影响着整个经济中更广泛的借贷成本，包括抵押贷款、企业贷款和消费信贷。

美联储的双重使命是促进**充分就业**和**稳定物价**（目标通胀率为2%）。自1980年以来，联邦基金利率经历了多轮加息和降息周期，通常是对经济形势的回应。"""
    }
]

# Save structured data as JSON for web integration
data = {
    "topics": topics,
    "indicators": indicators,
    "total_chars": sum(len(t['en']) + len(t['cn']) for t in topics + indicators)
}

with open('ocr_structured.json', 'w') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f'Structured data: {len(topics)} topics + {len(indicators)} indicators')
print(f'Total content: {data["total_chars"]} chars')
