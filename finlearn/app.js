// ===== 知识数据 - 完整覆盖10大模块 =====
const MODULES = [
  {
    id: 1,
    num: "01",
    name: "宏观经济基础",
    icon: "🏦",
    stage: 1,
    desc: "理解经济周期、主要经济指标与美联储货币政策，掌握宏观经济分析的底层逻辑，是一切金融分析的起点。",
    color: "#3b82f6",
    sections: [
      {
        title: "经济周期基础",
        items: [
          { title: "经济周期基础", subtitle: "经济周期基础知识 | NBER定义 | 总需求与总供给驱动", tag: "core" },
          { title: "经济周期的四个阶段", subtitle: "四个阶段：扩张/峰值/收缩/低谷 | 各阶段特征与指标", tag: "core" },
          { title: "美国经济周期的关键驱动因素", subtitle: "消费者支出/企业投资/货币政策/净出口", tag: "core" },
          { title: "美国常见经济指标总览", subtitle: "领先/同步/滞后指标总览 | 分类依据与具体指标", tag: "core" }
        ]
      },
      {
        title: "主要经济指标",
        items: [
          { title: "国内生产总值 (GDP)", subtitle: "同步指标 | BEA季度数据 | 最广泛的经济活动衡量", tag: "core" },
          { title: "非农就业人数 (NFP)", subtitle: "同步指标 | BLS月度数据 | 最具影响力的就业指标", tag: "core" },
          { title: "失业率", subtitle: "滞后指标 | 自然失业率4-4.5% | 衰退信号", tag: "core" },
          { title: "消费者价格指数 (CPI)", subtitle: "滞后指标 | 核心CPI(剔除食品/能源) | 市场关注通胀指标", tag: "core" },
          { title: "个人消费支出价格指数 (PCE)", subtitle: "滞后指标 | 美联储首选通胀指标 | 2%目标", tag: "core" },
          { title: "ISM制造业PMI", subtitle: "领先指标 | >50扩张/<50收缩 | 新订单预测GDP", tag: "core" },
          { title: "零售销售", subtitle: "同步指标 | 占GDP 68-70% | 消费者健康晴雨表", tag: "core" },
          { title: "耐用品订单", subtitle: "领先指标 | 核心订单(剔除运输) | 商业投资风向标", tag: "expanded" },
          { title: "消费者信心指数 (CCI)", subtitle: "领先指标 | 0-100分制 | 消费意愿前瞻", tag: "expanded" },
          { title: "10年期国债收益率及收益率曲线", subtitle: "领先指标 | 收益率曲线倒挂预测衰退 | 1950年以来100%准确", tag: "core" }
        ]
      },
      {
        title: "货币政策",
        items: [
          { title: "美联储货币政策概述", subtitle: "联邦基金利率 | 双重使命(充分就业+物价稳定) | FOMC", tag: "core" }
        ]
      }
    ]
  },
  {
    id: 2,
    num: "02",
    name: "金融市场与产品",
    icon: "📊",
    stage: 1,
    desc: "深入理解股票、债券、基金、ETF、货币市场工具等基础金融产品的结构、定价逻辑与市场机制。",
    color: "#10b981",
    sections: [
      {
        title: "金融市场基础",
        items: [
          { title: "金融市场的定义与功能", subtitle: "资金融通 | 风险定价 | 资源配置 | 信息发现", tag: "core" },
          { title: "金融市场的分类", subtitle: "一级市场vs二级市场 | 场内vs场外 | 现货vs衍生品", tag: "core" },
          { title: "主要金融中介", subtitle: "商业银行 | 投资银行 | 券商 | 保险公司 | 公募基金", tag: "core" },
          { title: "资产价格的决定因素", subtitle: "预期现金流 | 折现率 | 时间价值 | 风险溢价", tag: "core" }
        ]
      },
      {
        title: "股票基础",
        items: [
          { title: "股票的定义与类型", subtitle: "普通股vs优先股 | A股/B股/H股 | 记名股票vs无记名股票", tag: "core" },
          { title: "股票发行制度", subtitle: "注册制vs核准制 | IPO定价机制 | 承销商角色", tag: "core" },
          { title: "股票交易机制", subtitle: "竞价交易 | 做市商制度 | T+1结算 | 涨跌停板", tag: "core" },
          { title: "股票估值方法", subtitle: "市盈率(PE) | 市净率(PB) | DCF | 股利贴现模型", tag: "core" },
          { title: "股票风险收益特征", subtitle: "系统性风险vs非系统性风险 | 夏普比率 | Beta系数", tag: "expanded" },
          { title: "股票交易术语", subtitle: "开/收盘价 | 最高/最低价 | 量比 | 换手率 | 振幅", tag: "expanded" }
        ]
      },
      {
        title: "债券基础",
        items: [
          { title: "债券的定义与构成要素", subtitle: "面值/票面利率/到期期限/信用评级 | 发行价格", tag: "core" },
          { title: "债券的分类", subtitle: "利率债vs信用债 | 固息vs浮息 | 零息债 | 可转债", tag: "core" },
          { title: "债券的定价", subtitle: "久期(Duration) | 修正久期 | 凸性(Convexity) | 收益率曲线", tag: "expanded" },
          { title: "债券收益率曲线", subtitle: "正常/平坦/倒挂 | 利率期限结构理论 | 经济预测信号", tag: "expanded" },
          { title: "信用评级与违约风险", subtitle: "评级符号(AAA~D) | 内评vs外评 | 评级迁移", tag: "expanded" }
        ]
      },
      {
        title: "基金与ETF",
        items: [
          { title: "基金的定义与运作原理", subtitle: "集合投资 | 专业管理 | 分散风险 | 流动性", tag: "core" },
          { title: "基金的分类", subtitle: "股票型/债券型/混合型/货币型 | 公募vs私募 | 开放式vs封闭式", tag: "core" },
          { title: "ETF详解", subtitle: "交易型开放式指数基金 | 实时净值(IOPV) | 一级市场申购赎回 | 套利机制", tag: "core" },
          { title: "基金费用结构", subtitle: "管理费/托管费/申购费/赎回费 | 前端vs后端收费 | 分级基金", tag: "expanded" },
          { title: "基金业绩评价", subtitle: "Alpha/Beta | 信息比率 | 最大回撤 | 滚动收益率", tag: "expanded" }
        ]
      },
      {
        title: "常见股票指数",
        items: [
          { title: "A股主要指数", subtitle: "上证指数/深证成指/创业板指/科创50 | 加权方式(价格/市值/股息)", tag: "core" },
          { title: "港股主要指数", subtitle: "恒生指数/恒生科技指数/恒生国企指数", tag: "expanded" },
          { title: "美股主要指数", subtitle: "道琼斯/纳斯达克综合/标普500 | 罗素3000", tag: "expanded" },
          { title: "Smart Beta指数", subtitle: "因子投资 | 价值/动量/质量/低波动因子", tag: "trend" }
        ]
      },
      {
        title: "货币市场工具",
        items: [
          { title: "货币市场概述", subtitle: "短期资金市场 | 高流动性/低风险特征", tag: "expanded" },
          { title: "短期国债(T-bill)", subtitle: "贴现发行 | 折价收益率 | 无信用风险基准", tag: "expanded" },
          { title: "央行票据", subtitle: "公开市场操作工具 | 基础货币回笼 | 发行利率", tag: "expanded" },
          { title: "同业存单(NCD)", subtitle: "银行间大额存款凭证 | 利率市场化标杆 | 备案制发行", tag: "trend" }
        ]
      }
    ]
  },
  {
    id: 3,
    num: "03",
    name: "衍生品与期权期货",
    icon: "📉",
    stage: 2,
    desc: "掌握期货、期权、互换等衍生工具的核心原理，理解其风险对冲与投机功能，以及期权定价的数学基础。",
    color: "#f59e0b",
    sections: [
      {
        title: "衍生品基础概念",
        items: [
          { title: "衍生品的定义与分类", subtitle: "远期/期货/期权/互换 | 线性vs非线性收益", tag: "core" },
          { title: "衍生品的功能", subtitle: "风险对冲 | 价格发现 | 投机获利 | 降低交易成本", tag: "core" },
          { title: "衍生品市场结构", subtitle: "场内vs场外 | 清算机构(Clearing House) | 保证金制度", tag: "core" },
          { title: "保证金与杠杆", subtitle: "初始保证金/维持保证金 | 杠杆效应 | 强制平仓机制", tag: "core" }
        ]
      },
      {
        title: "期货基础",
        items: [
          { title: "期货合约的机制", subtitle: "标准化合约 | 每日盯市(Mark-to-Market) | 结算价", tag: "core" },
          { title: "期货的定价原理", subtitle: "持有成本理论 | 便利收益率 | 基差(Basis)", tag: "core" },
          { title: "期货的套期保值", subtitle: "买入套保vs卖出套保 | 交叉套保 | 基差风险", tag: "core" },
          { title: "期货投机与套利", subtitle: "趋势交易 | 跨期套利 | 跨品种套利 | 跨市场套利", tag: "expanded" },
          { title: "商品期货", subtitle: "原油/黄金/农产品 | 期货合约规格 | 实物vs金融交割", tag: "expanded" },
          { title: "金融期货", subtitle: "股指期货/利率期货/外汇期货 | 合约乘数 | 现金交割", tag: "expanded" }
        ]
      },
      {
        title: "期权基础",
        items: [
          { title: "期权的基本概念", subtitle: "Call/Put | 欧式vs美式 | 标的资产 | 行权价", tag: "core" },
          { title: "期权的收益结构", subtitle: "到期收益图 | 内在价值vs时间价值 | 实值/虚值/平值", tag: "core" },
          { title: "期权价格构成", subtitle: "内在价值+时间价值 | 影响期权价的希腊字母(Greeks)", tag: "core" },
          { title: "期权希腊字母(Greeks)", subtitle: "Delta/Gamma/Vega/Theta/Rho | 风险管理的语言", tag: "expanded" },
          { title: "期权的基本策略", subtitle: "备兑看涨/保护性看跌/牛市价差/熊市价差/跨式套利", tag: "core" },
          { title: "期权交易入门", subtitle: "T字报价 | 隐含波动率(IV) | 未平仓量(Open Interest)", tag: "expanded" }
        ]
      },
      {
        title: "期权进阶与实战",
        items: [
          { title: "Black-Scholes定价模型", subtitle: "BSM公式推导 | 假设条件 | 连续复利 | 模型局限性", tag: "expanded" },
          { title: "波动率交易", subtitle: "历史波动率vs隐含波动率 | 波动率微笑/偏斜 | VIX指数", tag: "expanded" },
          { title: "期权在财富管理中的应用", subtitle: "收益增强策略 | 保护性看跌 | 组合保险", tag: "practice" },
          { title: "泡沫的产生与期权的反脆弱性", subtitle: "泡沫形成的反馈机制 | 期权的非线性收益 | 反脆弱策略设计", tag: "practice" }
        ]
      },
      {
        title: "互换(Swap)",
        items: [
          { title: "利率互换", subtitle: "固定利率换浮动利率 | 场外市场 | LIBOR/SHIBOR基准", tag: "expanded" },
          { title: "货币互换", subtitle: "本金+利息交换 | 跨境融资工具 | 信用风险", tag: "expanded" }
        ]
      }
    ]
  },
  {
    id: 4,
    num: "04",
    name: "财报与公司分析",
    icon: "📋",
    stage: 2,
    desc: "学会阅读和分析上市公司财报，从财务数据中识别公司价值，理解估值方法，建立自己的投资研究框架。",
    color: "#8b5cf6",
    sections: [
      {
        title: "财报基础框架",
        items: [
          { title: "财务报表体系", subtitle: "资产负债表/利润表/现金流量表 | 三张报表的逻辑关系", tag: "core" },
          { title: "资产负债表解读", subtitle: "资产=负债+所有者权益 | 流动/非流动分类 | 科目详解", tag: "core" },
          { title: "利润表解读", subtitle: "收入-成本=利润 | 毛利率/净利率 | 非经常性损益", tag: "core" },
          { title: "现金流量表解读", subtitle: "经营/投资/筹资活动现金流 | 现金流才是王", tag: "core" },
          { title: "财务报表附注", subtitle: "会计政策 | 或有事项 | 关联交易 | 关键审计事项", tag: "expanded" }
        ]
      },
      {
        title: "财报核心指标分析",
        items: [
          { title: "盈利能力分析", subtitle: "ROE/ROA/ROIC | 杜邦分析 | 净利润含金量", tag: "core" },
          { title: "偿债能力分析", subtitle: "资产负债率/流动比率/速动比率 | 利息保障倍数", tag: "core" },
          { title: "运营能力分析", subtitle: "存货周转天数/应收账款周转天数/总资产周转率", tag: "core" },
          { title: "成长能力分析", subtitle: "营收增速/净利润增速 | 内生增长vs外延增长", tag: "core" },
          { title: "现金流分析", subtitle: "FCFF/FCFE | 自由现金流 | 现金流肖像(四种类型)", tag: "expanded" }
        ]
      },
      {
        title: "公司估值方法",
        items: [
          { title: "相对估值法", subtitle: "PE/PB/PS/PCF | 可比公司法 | 行业估值中枢", tag: "core" },
          { title: "绝对估值法(DCF)", subtitle: "现金流预测 | 永续增长率 | 折现率(WACC) | 敏感性分析", tag: "core" },
          { title: "估值案例：以泡泡玛特为例", subtitle: "从零开始的估值实战 | 市场空间测算 | 竞争壁垒分析", tag: "practice" },
          { title: "估值陷阱识别", subtitle: "高商誉 | 关联交易虚增 | 现金流与利润背离", tag: "expanded" }
        ]
      },
      {
        title: "行业与竞争分析",
        items: [
          { title: "波特五力模型", subtitle: "现有竞争者/潜在进入者/替代品/供应商/客户议价能力", tag: "core" },
          { title: "公司核心竞争力", subtitle: "护城河类型 | 商业模式画布 | 竞争壁垒来源", tag: "core" },
          { title: "公司营收分析", subtitle: "收入结构 | 客户集中度 | 季节性波动 | 收入确认原则", tag: "expanded" }
        ]
      },
      {
        title: "财报分析避雷指南",
        items: [
          { title: "财务造假常见手法", subtitle: "虚增收入 | 提前确认收入 | 推迟费用 | 资产虚增", tag: "practice" },
          { title: "关联交易排查", subtitle: "关联方识别 | 定价公允性 | 利益输送迹象", tag: "practice" },
          { title: "现金流与利润匹配分析", subtitle: "经营活动现金流/净利润 > 1 | 警惕美化", tag: "practice" },
          { title: "审计意见解读", subtitle: "标准无保留/带强调事项段/非标意见 | 审计变更信号", tag: "practice" }
        ]
      }
    ]
  },
  {
    id: 5,
    num: "05",
    name: "投资策略与量化",
    icon: "🎯",
    stage: 2,
    desc: "构建系统化的投资方法论，从价值投资理念到量化投资体系，建立适合自己的投资框架与风险管理机制。",
    color: "#ec4899",
    sections: [
      {
        title: "价值投资体系",
        items: [
          { title: "价值投资核心理念", subtitle: "买股票就是买公司 | 市场先生 | 安全边际 | 能力圈", tag: "core" },
          { title: "企业分析方法论", subtitle: "好行业+好公司+好价格 |竞争优势分析 | 管理层评估", tag: "core" },
          { title: "估值在价值投资中的应用", subtitle: "如何寻找低估标的 | 逆向投资思维", tag: "core" },
          { title: "长期投资与复利", subtitle: "复利的力量 | 频繁交易的危害 | 持有周期决策", tag: "expanded" },
          { title: "价值投资的挑战与局限", subtitle: "价值陷阱 | 何时卖出 | 集体非理性", tag: "expanded" }
        ]
      },
      {
        title: "量化投资基础",
        items: [
          { title: "量化投资概述", subtitle: "数据驱动投资 | 消除情绪干扰 | 可复制性", tag: "core" },
          { title: "因子投资", subtitle: "Alpha因子 | 风险因子 | 多因子模型 | Fama-French三因子", tag: "expanded" },
          { title: "如何建立自己的量化体系", subtitle: "数据源 | 因子挖掘 | 回测框架 | 模拟盘验证 | 实盘部署", tag: "practice" },
          { title: "量化策略类型", subtitle: "趋势跟踪/均值回归/统计套利/事件驱动/高频交易", tag: "expanded" },
          { title: "回测与过拟合", subtitle: "前向测试 | 样本外验证 | 训练集/测试集划分", tag: "expanded" }
        ]
      },
      {
        title: "金融风险管理实战",
        items: [
          { title: "风险管理的框架", subtitle: "风险识别/测量/监控/报告 | VaR/CVaR | 压力测试", tag: "core" },
          { title: "投资组合理论", subtitle: "马科维茨组合理论 | 有效前沿 | 最优配置", tag: "core" },
          { title: "风险管理工具", subtitle: "止损策略 | 仓位管理 | 分散化投资 | 相关性管理", tag: "core" },
          { title: "尾部风险与黑天鹅", subtitle: "肥尾分布 | 压力情景 | 极端事件应对策略", tag: "expanded" },
          { title: "风险管理的组织架构", subtitle: "三道防线模型 | 风控部门职责 | 监管要求", tag: "expanded" }
        ]
      },
      {
        title: "资产配置与组合管理",
        items: [
          { title: "资产配置理念", subtitle: "战略性vs战术性资产配置 | 再平衡机制", tag: "expanded" },
          { title: "大类资产特征", subtitle: "股票/债券/商品/REITs/现金 | 相关性与轮动规律", tag: "expanded" },
          { title: "生命周期投资法", subtitle: "年龄法则 | 风险承受能力随年龄变化 | 动态调整", tag: "expanded" }
        ]
      }
    ]
  },
  {
    id: 6,
    num: "06",
    name: "IPO与资本市场",
    icon: "🚀",
    stage: 2,
    desc: "理解企业IPO全流程、上市规则、资本市场运作机制，以及美股/港股/A股市场的特点与差异。",
    color: "#ef4444",
    sections: [
      {
        title: "IPO基础",
        items: [
          { title: "IPO的定义与意义", subtitle: "首次公开募股 | 融资功能 | 流动性 | 品牌效应", tag: "core" },
          { title: "IPO全流程", subtitle: "改制辅导→尽调→申请→审核→路演→定价→上市 | 各阶段要点", tag: "core" },
          { title: "注册制与核准制", subtitle: "审核理念差异 | 信息披露为核心 | 市场化定价", tag: "core" },
          { title: "IPO定价机制", subtitle: "询价制 | 固定价格 | 拍卖机制 | 抑价现象", tag: "expanded" }
        ]
      },
      {
        title: "A股/港股/美股市场",
        items: [
          { title: "A股市场特点", subtitle: "核准制→注册制 | 审核周期 | 板块定位(主板/科创/创业板)", tag: "core" },
          { title: "港股市场特点", subtitle: "注册制 | 红筹架构 | 仙股问题 | 流动性折价", tag: "expanded" },
          { title: "美股市场特点", subtitle: "注册制最彻底 | 萨班斯-奥克斯利法案 | 集体诉讼制度", tag: "expanded" },
          { title: "境外上市新规", subtitle: "《境外上市新规》| 备案制 | 行业监管要求 | 安全审查", tag: "practice" },
          { title: "香港IPO实操要点", subtitle: "港交所上市条件 | H股全流通 | 聆讯流程 | 国际配售", tag: "practice" }
        ]
      },
      {
        title: "上市后的资本市场运作",
        items: [
          { title: "再融资方式", subtitle: "增发/配股/可转债/可交换债 | 发行条件与流程", tag: "expanded" },
          { title: "并购重组", subtitle: "重大资产重组 | 借壳上市 | 产业并购vs金融并购", tag: "expanded" },
          { title: "股份回购与分红", subtitle: "回购条件 | 分红政策 | 股东回报 | 市场信号意义", tag: "expanded" }
        ]
      },
      {
        title: "退市制度",
        items: [
          { title: "退市的类型与原因", subtitle: "主动退市vs被动退市 | 财务退市/交易退市/规范退市", tag: "expanded" },
          { title: "美股退市怎么办", subtitle: "私有化退市流程 | ADR存托凭证 | 退市后的股东权益", tag: "practice" },
          { title: "A股退市制度演变", subtitle: "注册制下退市常态化 | 退市新规 | 退市整理期", tag: "expanded" }
        ]
      }
    ]
  },
  {
    id: 7,
    num: "07",
    name: "税务与股权",
    icon: "⚖️",
    stage: 2,
    desc: "深入理解资本市场税务体系、股权转让税务筹划、员工股权激励方案设计与股份支付会计处理。",
    color: "#14b8a6",
    sections: [
      {
        title: "个人税务基础",
        items: [
          { title: "个人所得税体系", subtitle: "综合所得/经营所得/资本所得/财产所得/偶然所得", tag: "core" },
          { title: "股息红利所得", subtitle: "持股期限与税率 | 差别化征收 | 税收协定优惠", tag: "core" },
          { title: "证券交易印花税", subtitle: "A股印花税税率历史 | 单边征收 | 市场调节功能", tag: "expanded" }
        ]
      },
      {
        title: "股权转让税务",
        items: [
          { title: "个人转让股权税务", subtitle: "财产转让所得20% | 股权转让收入明显偏低 | 净资产/类比法核定", tag: "core" },
          { title: "企业转让股权税务", subtitle: "股权转让所得 | 居民企业免税收入 | 非居民企业预提税", tag: "expanded" },
          { title: "股权转让定价", subtitle: "平价/溢价/折价转让 | 阴阳合同风险 | 税务合规", tag: "expanded" },
          { title: "股权转让税务问题", subtitle: "7种常见税务风险点 | IP0前税务合规 | 历史遗留问题处理", tag: "practice" }
        ]
      },
      {
        title: "员工股权激励",
        items: [
          { title: "股权激励的常见类型", subtitle: "股票期权/限制性股票/RSU/股票增值权 | 各类型特点", tag: "core" },
          { title: "员工激励方案预设计", subtitle: "激励对象选择 | 授予数量 | 行权价格 | 归属期(Vesting)设计", tag: "practice" },
          { title: "股权激励税务处理", subtitle: "授予/行权/出售各阶段税务 | 递延纳税优惠 | 备案要求", tag: "expanded" },
          { title: "科创型企业的股权激励", subtitle: "技术入股 | 股权激励计划备案 | 特殊税务处理", tag: "expanded" }
        ]
      },
      {
        title: "股份支付",
        items: [
          { title: "股份支付的会计处理", subtitle: "以权益结算vs以现金结算 | 授予日/等待期/行权日会计分录", tag: "expanded" },
          { title: "股份支付成本计算", subtitle: "等待期 | 公允价值确定 | 期权定价模型(B-S/二叉树) | 成本分摊", tag: "expanded" },
          { title: "股份支付对财务报表的影响", subtitle: "管理费用计入 | 对EPS的影响 | 对稀释EPS的影响", tag: "expanded" }
        ]
      },
      {
        title: "特殊税务议题",
        items: [
          { title: "CRS与海外账户税务", subtitle: "共同申报准则 | 金融账户信息交换 | 境外所得申报", tag: "expanded" },
          { title: "VIE架构税务问题", subtitle: "股息预提税 | 转让定价 | 受控外国企业规则", tag: "expanded" }
        ]
      }
    ]
  },
  {
    id: 8,
    num: "08",
    name: "信托与财富管理",
    icon: "🏛️",
    stage: 3,
    desc: "理解信托制度的法律架构与财富传承功能，熟悉家族信托、资产隔离、税务规划在财富管理中的实际应用。",
    color: "#f97316",
    sections: [
      {
        title: "信托基础知识",
        items: [
          { title: "信托的法律架构", subtitle: "委托人/受托人/受益人 | 信托财产独立性 | 信义义务", tag: "core" },
          { title: "信托的分类", subtitle: "民事信托vs营业信托 | 财产信托vs资金信托 | 他益信托vs自益信托", tag: "core" },
          { title: "信托的功能", subtitle: "资产隔离 | 财富传承 | 税务筹划 | 公益慈善", tag: "core" },
          { title: "信托的设立与生效", subtitle: "信托目的合法性 | 信托财产确定性 | 受益人确定性", tag: "expanded" }
        ]
      },
      {
        title: "家族信托",
        items: [
          { title: "家族信托的概述", subtitle: "境外家族信托 | 离岸信托 | 目的与功能", tag: "core" },
          { title: "家族信托的设计要素", subtitle: "受益人结构 | 分配规则 | 保护人机制 | 终止条款", tag: "expanded" },
          { title: "家族信托的税务考量", subtitle: "赠与税/遗产税 | 所得税 | 信托收入穿透原则", tag: "expanded" },
          { title: "境内家族信托的发展", subtitle: "国内家族信托实践 | 监管框架 | 信托公司角色", tag: "expanded" }
        ]
      },
      {
        title: "员工持股信托",
        items: [
          { title: "员工持股平台", subtitle: "有限责任公司型 | 有限合伙型 | 信托持股计划", tag: "expanded" },
          { title: "股份集中代营", subtitle: "员工股份代持 | 代持还原 | 税务处理", tag: "expanded" },
          { title: "受托人转换", subtitle: "信托变更程序 | 受托人责任移转 | 受益人权益保护", tag: "expanded" }
        ]
      },
      {
        title: "财富管理业务",
        items: [
          { title: "财富管理业务模式", subtitle: "产品销售型vs顾问型 | AUM收费vs业绩提成 | 客户分层", tag: "expanded" },
          { title: "全球市场行情权限", subtitle: "港股/美股/A股实时行情 | Level2数据 | 权限体系设计", tag: "expanded" },
          { title: "财富管理的合规框架", subtitle: "投资者适当性 | KYC/AML | 产品尽调 | 风险揭示", tag: "expanded" }
        ]
      }
    ]
  },
  {
    id: 9,
    num: "09",
    name: "区块链与加密货币",
    icon: "₿",
    stage: 3,
    desc: "从比特币的诞生到以太坊的智能合约，理解Web3经济、DeFi、NFT与美股代币化等前沿领域的核心原理与发展趋势。",
    color: "#eab308",
    sections: [
      {
        title: "区块链基础原理",
        items: [
          { title: "区块链的工作原理", subtitle: "分布式账本 | 区块结构 | 链式存储 | 默克尔树", tag: "core" },
          { title: "共识机制", subtitle: "PoW(工作量证明) | PoS(权益证明) | DPoS | BFT | 各机制优劣", tag: "core" },
          { title: "密码学基础", subtitle: "哈希函数 | 数字签名 | 非对称加密 | 零知识证明", tag: "core" },
          { title: "去中心化与不可能三角", subtitle: "去中心化/安全性/可扩展性三角 | 分片/Layer2解决方案", tag: "expanded" }
        ]
      },
      {
        title: "比特币详解",
        items: [
          { title: "比特币的诞生与设计理念", subtitle: "中本聪白皮书 | 无需许可的货币 | 通缩属性", tag: "core" },
          { title: "比特币的挖矿机制", subtitle: "矿工角色 | 区块奖励 | 减半周期(4年) | 算力", tag: "core" },
          { title: "比特币网络的安全模型", subtitle: "51%攻击 | 算力集中化问题 | 激励相容", tag: "expanded" },
          { title: "比特币ETF与机构入场", subtitle: "比特币现货ETF | 期货ETF | 托管方案 | MicroStrategy模式", tag: "trend" }
        ]
      },
      {
        title: "以太坊与智能合约",
        items: [
          { title: "以太坊概述", subtitle: "世界计算机 | 图灵完备 | EVM虚拟机", tag: "core" },
          { title: "智能合约详解", subtitle: "Solidity语言 | 部署与执行 | Gas费用机制 | 合约调用", tag: "core" },
          { title: "以太坊的演进", subtitle: "ETH 2.0/权益证明 | Merge合并 | Danksharding | EIP-1559", tag: "expanded" },
          { title: "ERC标准与应用", subtitle: "ERC-20(代币标准) | ERC-721(NFT) | ERC-4626(代币化金库)", tag: "expanded" }
        ]
      },
      {
        title: "Web3与DeFi",
        items: [
          { title: "Web3通识", subtitle: "Web1(read)/Web2(read-write)/Web3(read-write-own) | 去中心化身份(DID)", tag: "core" },
          { title: "DeFi生态", subtitle: "DEX(去中心化交易所) |借贷协议(Aave/MakerDAO) | 流动性挖矿", tag: "expanded" },
          { title: "NFT与数字资产", subtitle: "非同质化代币 | 数字艺术品 | 版权确权 | 应用场景", tag: "expanded" },
          { title: "Web3的风险与反思", subtitle: "智能合约漏洞 | rug pull | 监管不确定性 | 能源消耗争议", tag: "trend" }
        ]
      },
      {
        title: "美股代币化",
        items: [
          { title: "代币化证券的概念", subtitle: "实物资产数字化 | 链上股票/债券 | 碎片化所有权", tag: "trend" },
          { title: "美股代币化的实现路径", subtitle: "主经纪商模式 | 法规框架(Securities Act) | 链上结算", tag: "trend" },
          { title: "代币化股票的优势与风险", subtitle: "7x24交易 | 跨境准入 | 监管合规 | 资产安全性", tag: "trend" }
        ]
      }
    ]
  },
  {
    id: 10,
    num: "10",
    name: "券商业务体系",
    icon: "💎",
    stage: 3,
    desc: "深入理解券商清结算系统、柜台业务、风控体系与资金基建，掌握持牌券商的核心业务流程与合规要点。",
    color: "#06b6d4",
    sections: [
      {
        title: "清结算系统",
        items: [
          { title: "清结算基本概念", subtitle: "清算( Clearing ) vs 结算( Settlement ) | T+2交割周期 | DVP/PVP", tag: "core" },
          { title: "多市场结算流程", subtitle: "港股结算(SH/SE) | 美股结算(DTCC/NSCC) | A股结算(CCTV/CSSD)", tag: "core" },
          { title: "券商清结算架构", subtitle: "前台交易→中台清算→后台交收 | 内部账务处理 | 客户资金隔离", tag: "expanded" },
          { title: "股份与资金核对", subtitle: "日终对账 | 头寸管理 | 差错处理 | 应急机制", tag: "expanded" }
        ]
      },
      {
        title: "柜台业务系统",
        items: [
          { title: "柜台系统的核心功能", subtitle: "账户管理 | 资金管理 | 交易路由 | 持仓管理", tag: "core" },
          { title: "综合账户体系架构", subtitle: "综合账户vs子账户 | 资金账户vs证券账户 | 账户层级设计", tag: "expanded" },
          { title: "柜台系统的技术架构", subtitle: "高性能交易系统 | 内存数据库 | 异步处理 | 高可用设计", tag: "expanded" },
          { title: "柜台系统与交易所对接", subtitle: "交易通道 | 报盘接口 | 交易所协议 | 延迟优化", tag: "expanded" }
        ]
      },
      {
        title: "风控体系",
        items: [
          { title: "风控的基本框架", subtitle: "市场风险管理 | 信用风险管理 | 操作风险 | 流动性风险", tag: "core" },
          { title: "保证金与强平机制", subtitle: "初始保证金/维持保证金 | 追保通知(Margin Call) | 自动强平", tag: "core" },
          { title: "实时交易风控系统", subtitle: "实时风控指标 | 持仓集中度 | 单一标的敞口 | 杠杆率控制", tag: "expanded" },
          { title: "反洗钱(AML)与KYC", subtitle: "客户身份识别 | 可疑交易监控 | 制裁名单筛查 | 报告机制", tag: "expanded" }
        ]
      },
      {
        title: "资金基建与支付",
        items: [
          { title: "支付模块架构", subtitle: "存款/取款/转账 | 支付通道 | 资金到账时效", tag: "core" },
          { title: "支付模块与资金基建", subtitle: "支付中台建设 | 统一资金池 | 流动性管理系统", tag: "expanded" },
          { title: "跨境资金流动", subtitle: "结售汇制度 | 跨境汇款 | 资金出入境合规", tag: "expanded" },
          { title: "客户资金保护", subtitle: "客户资金隔离 | 信托账户 | FSCS/SIPC保护", tag: "expanded" }
        ]
      },
      {
        title: "券商利润构成",
        items: [
          { title: "券商主要收入来源", subtitle: "佣金收入 | 利息收入(融资融券) | IPO认购费 | 行情数据费", tag: "expanded" },
          { title: "券商的业务模式", subtitle: "港美股经纪+ESOP管理+投顾+IPO分销 | 多元化收入结构", tag: "expanded" },
          { title: "券商交易流程全景", subtitle: "下单→路由→成交→清算→交收→资金股份更新 | 全链路追踪", tag: "expanded" }
        ]
      }
    ]
  }
];

// ===== 知识详情内容 =====
const KNOWLEDGE_CONTENT = {
  // 模块1
  "1-货币的本质与职能": { content: `<h4>📌 货币的本质</h4><p>货币是一种被普遍接受的交换媒介，解决了物物交换中「双重巧合」的问题。</p><h4>📌 货币的三大职能</h4><ul><li><b>交换媒介</b>：商品交换的中间环节，接受度越高的货币流通范围越广</li><li><b>价值储藏</b>：购买力的暂时保存，但需注意通货膨胀的侵蚀</li><li><b>记账单位</b>：用统一计量尺度衡量商品和服务的价值</li></ul><h4>📌 货币层次(M0/M1/M2)</h4><table><tr><th>指标</th><th>范围</th><th>流动性</th></tr><tr><td>M0(流通中现金)</td><td>流通中纸币+硬币</td><td>最高</td></tr><tr><td>M1</td><td>M0+企业活期+机关团体活期存款</td><td>高</td></tr><tr><td>M2</td><td>M1+居民储蓄存款+企业定期存款</td><td>中等</td></tr></table><div class="highlight-text"><b>央行观察M2判断货币政策松紧</b>，M2增速过高可能预示通胀风险。</div>` },
  "1-银行的起源与运作": { content: `<h4>📌 银行的起源</h4><p>最早的银行可追溯至意大利文艺复兴时期的「金铺」(Bank of Venice, 1587)，商人将金币存放在金铺，金铺出具存据，后来存据本身开始流通，演变为银行券。</p><h4>📌 部分准备金制度</h4><p>现代银行的核心运作机制：银行将存款的一部分(法定存款准备金率)上缴央行，其余贷款出去获取利息收入。<br><b>货币乘数 = 1 / 法定存款准备金率</b><br>例如准备金率10%，初始100元存款最终可创造1000元广义货币。</p><h4>📌 银行资产负债表</h4><ul><li><b>资产端</b>：贷款(生息资产) | 投资 | 存放央行款项 | 同业资产</li><li><b>负债端</b>：存款(核心负债) | 同业负债 | 发行债券 | 向央行借款</li></ul>` },
  "1-货币政策目标": { content: `<h4>📌 中国货币政策目标</h4><p>《中国人民银行法》规定货币政策目标是「保持货币币值的稳定，并以此促进经济增长」。</p><h4>📌 美联储双重使命</h4><p>充分就业 + 物价稳定(2%通胀目标)</p><h4>📌 四大目标之间的矛盾</h4><ul><li>刺激经济(低利率) → 通胀上升</li><li>抑制通胀(高利率) → 失业率上升</li><li>汇率稳定与独立货币政策难以同时实现(不可能三角)</li></ul><div class="highlight-text"><b>核心原则</b>：央行需要在多重目标间权衡取舍相机抉择，政策传导存在时滞(通常6-18个月)</div>` },
  "2-股票的估值方法": { content: `<h4>📌 市盈率(PE)</h4><ul><li><b>静态PE</b> = 当前股价 / 上年度EPS</li><li><b>滚动PE(TTM)</b> = 当前股价 / 最近4季度EPS之和</li><li><b>动态PE</b> = 当前股价 / 预测当年EPS</li></ul><p>PE越低估值越便宜，但需注意行业差异和成长性。</p><h4>📌 PEG估值法</h4><p>PEG = PE / (年化净利润增速×100)</p><ul><li>PEG < 1：相对低估</li><li>PEG = 1：合理</li><li>PEG > 1：相对高估</li></ul><h4>📌 DCF(现金流折现)</h4><p>企业价值 = Σ [ FCFt / (1+WACC)^t ] + TV / (1+WACC)^n</p><p>其中TV为终值，WACC为加权平均资本成本。此方法对假设敏感度较高。</p>` },
  "3-Black-Scholes定价模型": { content: `<h4>📌 BSM公式</h4><p>期权价格 = S × N(d₁) - K × e^(-rT) × N(d₂)</p><p>其中：<br>d₁ = [ln(S/K) + (r + σ²/2)T] / (σ√T)<br>d₂ = d₁ - σ√T</p><h4>📌 核心假设</h4><ul><li>标的资产价格服从对数正态分布</li><li>无风险利率已知且固定</li><li>波动率恒定</li><li>无交易成本，可连续交易</li></ul><h4>📌 实际应用的局限性</h4><ul><li>波动率微笑/偏斜：BSM假设与实际不符</li><li>股价跳跃风险：极端行情下巴舍利耶模型更优</li><li>流动性限制：大宗期权难以对冲</li></ul>` },
  "4-杜邦分析": { content: `<h4>📌 杜邦恒等式</h4><p><b>ROE = 净利润/股东权益 = (净利润/销售收入) × (销售收入/总资产) × (总资产/股东权益)</b></p><p>即 ROE = 净利率 × 资产周转率 × 权益乘数</p><h4>📌 分解分析</h4><ul><li><b>净利率</b>：反映产品竞争力和费用管控能力</li><li><b>资产周转率</b>：反映资产使用效率</li><li><b>权益乘数</b>：反映财务杠杆水平</li></ul><h4>📌 ROE提升路径</h4><table><tr><th>方式</th><th>说明</th><th>风险</th></tr><tr><td>提高净利率</td><td>产品升级、规模效应</td><td>竞争加剧</td></tr><tr><td>提高周转率</td><td>加强运营管理</td><td>经营波动</td></tr><tr><td>提高杠杆</td><td>有息负债增加</td><td>偿债风险↑</td></tr></table>` },
  "5-安全边际": { content: `<h4>📌 安全边际(Margin of Safety)的定义</h4><p>安全边际 = (内在价值 - 当前价格) / 内在价值 × 100%</p><p>由本杰明·格雷厄姆提出，价值投资的三大基石理念之一。</p><h4>📌 安全边际的逻辑</h4><ul><li>投资的核心是<strong>大概率正确</strong>而非精确计算</li><li>即使判断错误，安全边际也能提供保护</li><li>「用四毛钱买价值一块钱的东西」</li></ul><h4>📌 如何寻找安全边际</h4><ul><li>低PE/PB：在历史估值底部区域买入</li><li>困境反转：市场过度悲观时买入</li><li>保守预测：现金流折现时使用保守假设</li><li>分散投资：单一个股不超过组合10-15%</li></ul><div class="highlight-text"><b>芒格：</b>「长期来看，股票收益率与企业ROE高度相关。好的买入价格是成功的最重要因素之一。」</div>` },
  "9-比特币的挖矿机制": { content: `<h4>📌 挖矿的本质</h4><p>比特币挖矿是工作量证明(Proof of Work)共识机制的核心。矿工通过计算哈希难题竞争记账权，获得新发行的比特币和交易手续费作为奖励。</p><h4>📌 区块奖励与减半机制</h4><ul><li>2009年创世区块：50 BTC</li><li>2012年第一次减半：25 BTC</li><li>2016年第二次减半：12.5 BTC</li><li>2020年第三次减半：6.25 BTC</li><li>2024年第四次减半：3.125 BTC</li></ul><p>每21万个区块(约4年)减半，总量上限2100万枚。</p><h4>📌 算力与难度调整</h4><p>比特币网络每2016个区块(约2周)自动调整挖矿难度，保持平均10分钟出一个区块。算力越高，难度越高。</p><div class="highlight-text"><b>中本聪设计</b>：通过算力竞争和奖励递减机制，确保了比特币的安全性和稀缺性。减半事件往往伴随价格大幅波动。</div>` },
  "10-清结算基本概念": { content: `<h4>📌 清算是成交后、结算前的账务处理过程</h4><p>清算确定双方的债权债务关系：交易双方应收应付的证券和资金数量。</p><h4>📌 结算(Settlement)</h4><p>根据清算结果，实际完成证券和资金的交割。分为：</p><ul><li><b>DVP(券款对付)</b>：证券交割与资金支付同时完成(最安全)</li><li><b>FOP(纯券过户)</b>：仅证券过户，资金另行处理</li></ul><h4>📌 结算周期</h4><table><tr><th>市场</th><th>结算周期</th><th>备注</th></tr><tr><td>A股</td><td>T+1</td><td>当日买入，次一交易日可卖出</td></tr><tr><td>港股</td><td>T+2</td><td>港交所与内港股通规则差异</td></tr><tr><td>美股</td><td>T+2</td><td>2024年拟推进T+1</td></tr></table><h4>📌 中央对手方(CCP)</h4><p>港交所旗下联交所期权结算所(SEOCH)、美国存管信托公司(DTCC)等CCP介入交易双方，成为每个卖方的买方和每个买方的卖方，降低信用风险。</div>` },

  // Module 1 bilingual content (EN left / CN right)
  "1-经济周期基础": {
    bilingual: true,
    title: "Fundamentals of the Business Cycle",
    title_cn: "经济周期基础知识",
    en: "The business cycle refers to the recurring, irregular fluctuations in aggregate economic activity around the economy's long-term potential growth trend. It is officially determined by the U.S. National Bureau of Economic Research (NBER), which defines a 'recession' as a significant decline in economic activity spread across the economy, lasting more than a few months — encompassing production, employment, and income. The business cycle's duration varies (typically 2-10 years) and is driven by shifts in aggregate demand and aggregate supply.",
    cn: "商业周期是指总体经济活动围绕经济长期潜在增长趋势反复出现的、不规则的波动。它由美国国家经济研究局（NBER）正式确定，该局将“衰退”定义为广泛蔓延于整个经济的经济活动显著下降，持续数月以上——包括生产、就业和收入。商业周期的持续时间各不相同（通常为2至10年），由总需求和总供给的变化驱动。"
  },
  "1-经济周期的四个阶段": {
    bilingual: true,
    title: "Four Phases of Business Cycle",
    title_cn: "经济周期的四个阶段",
    en: "The business cycle consists of four distinct phases:\n\n**Expansion**: Economic activity rises above potential output; real GDP grows steadily (2-3% U.S. long-term trend); employment expands; business investment increases; consumer confidence strengthens. Unemployment rate below natural rate (4-4.5%); core inflation 1-2% (near Fed target).\n\n**Peak**: Economic growth slows to a halt; output reaches maximum level; inflationary pressures peak as capacity constraints emerge. Real GDP growth <1%; unemployment rate at trough (often <4%); core inflation >2.5% (above target).\n\n**Contraction (Recession)**: Economic activity falls below potential output; real GDP declines; businesses cut investment; layoffs increase; consumer spending weakens. Real GDP growth negative for ≥2 quarters; unemployment rate rises ≥1 percentage point; core inflation decelerates.\n\n**Trough**: Economic decline stops; output hits bottom; pessimism fades; businesses and consumers begin to rebuild confidence. Real GDP growth stabilizes near 0%; unemployment rate peaks; core inflation may reach a floor.",
    cn: "经济周期包含四个不同阶段：\n\n**扩张期**：经济活动高于潜在产出；实际GDP稳步增长（美国长期趋势增长率为2-3%）；就业扩大；企业投资增加；消费者信心增强。失业率低于自然失业率（4-4.5%）；核心通胀率1-2%（接近美联储目标）。\n\n**峰值期**：经济增长停滞；产出达到最高水平；随着产能限制的出现，通胀压力达到顶峰。实际GDP增长率<1%；失业率处于低谷（通常<4%）；核心通胀率>2.5%（高于目标）。\n\n**收缩期（衰退）**：经济活动低于潜在产出；实际GDP下降；企业削减投资；裁员增加；消费者支出减弱。实际GDP增长连续≥2个季度为负；失业率上升≥1个百分点；核心通胀放缓。\n\n**低谷期**：经济衰退停止；产出触底；悲观情绪消退；企业和消费者开始重建信心。实际GDP增长稳定在0%左右；失业率达到峰值；核心通胀率可能触底。"
  },
  "1-美国经济周期的关键驱动因素": {
    bilingual: true,
    title: "Key Drivers of the U.S. Business Cycle",
    title_cn: "经济周期的关键驱动因素",
    en: "Factors directly influencing U.S. business cycle fluctuations:\n\n- **Consumer Spending**: Consumer spending accounts for approximately 68-70% of U.S. GDP, making it the primary driver of aggregate demand. Changes in consumer confidence (tied to employment security and wage growth) directly impact retail sales, housing demand, and discretionary spending (e.g., autos, electronics) — critical for U.S. equity sectors like consumer staples and discretionary.\n\n- **Business Investment**: Includes spending on machinery, equipment, and commercial real estate. U.S. business investment is sensitive to interest rates (Fed policy), corporate profit margins, and technological innovation (e.g., AI-related investment boom in 2023-2024).\n\n- **Monetary Policy (Federal Reserve)**: Fed's adjustments to the federal funds rate and balance sheet (quantitative easing/QE, quantitative tightening/QT) directly influence borrowing costs for businesses and consumers, asset prices (stocks, bonds), and inflation.\n\n- **Net Exports**: Tied to the U.S. dollar exchange rate and global demand. A stronger USD reduces U.S. export competitiveness, while weak global demand weighs on U.S. export growth.",
    cn: "直接影响美国商业周期波动的因素：\n\n- **消费者支出**：消费者支出约占美国GDP的68-70%，是总需求的主要驱动力。消费者信心的变化（与就业保障和工资增长相关）直接影响零售销售、住房需求和可自由支配支出（例如，汽车、电子产品）——对美国消费必需品和可自由支配等股票部门至关重要。\n\n- **企业投资**：包括对机械、设备和商业地产的支出。美国商业投资对利率（美联储政策）、企业利润率和技术创新（例如，2023-2024年与AI相关的投资热潮）敏感。\n\n- **货币政策（美联储）**：美联储对联邦基金利率和资产负债表（量化宽松/QE、量化紧缩/QT）的调整直接影响企业和消费者的借贷成本、资产价格（股票、债券）以及通货膨胀。\n\n- **净出口**：与美元汇率和全球需求相关。美元走强会削弱美国出口竞争力，而全球需求疲软则会拖累美国出口增长。"
  },
  "1-美国常见经济指标总览": {
    bilingual: true,
    title: "Summary of Common U.S. Economic Indicators",
    title_cn: "美国常见经济指标总览",
    en: "These indicators are closely monitored by U.S. financial markets to gauge business cycle stages, inflation, and policy trends.\n\n| Indicator Category | Specific Indicators | Basis for Classification |\n|---|---|---|\n| **Leading Indicators** (Predict future cycle turning points) | ISM Manufacturing PMI, Core Durable Goods Orders, Consumer Confidence Index (CCI), 10-Year Treasury Yield & 10Y-2Y Spread | Change ahead of economic cycle; reflect future spending/investment plans (e.g., yield curve inversion precedes recessions) |\n| **Coincident Indicators** | Gross Domestic Product (GDP), Nonfarm Payrolls (NFP), Retail Sales | Directly reflect current economic activity; move in tandem with aggregate output and employment trends |\n| **Lagging Indicators** | Unemployment Rate, CPI, PCE Price Index | Adjust after economic activity changes to confirm cycle trends (e.g., unemployment peaks post-recession) |",
    cn: "美国金融市场密切关注这些指标，以评估商业周期阶段、通货膨胀和政策趋势。\n\n| 指标类别 | 具体指标 | 分类依据 |\n|---|---|---|\n| **领先指标**（预测未来周期转折点） | ISM制造业PMI、核心耐用品订单、消费者信心指数（CCI）、10年期国债收益率及10年期-2年期利差 | 先于经济周期变化；反映未来支出/投资计划预测关系（例如，收益率曲线倒挂先于衰退） |\n| **同步指标** | 国内生产总值（GDP）、非农就业人数（NFP）、零售销售 | 直接反映当前经济活动；与总产出和就业趋势同步变动 |\n| **滞后指标** | 失业率、CPI、PCE物价指数 | 在经济活动变化后进行调整以确认周期趋势（例如，衰退后失业率达到峰值） |"
  },
  "1-国内生产总值 (GDP)": {
    bilingual: true,
    title: "Gross Domestic Product (GDP)",
    title_cn: "国内生产总值 (GDP)",
    type: "Coincident Indicator",
    type_cn: "同步指标",
    en: "**Definition**: The total market value of all final goods and services produced within a country's borders in a given period. The BEA releases quarterly data with three revisions; real GDP (adjusted for inflation) is the key metric for cycle analysis.\n\n**Explanation**: The broadest measure of economic activity. Real GDP growth above 2% (U.S. potential growth rate) indicates expansion; growth below 1% signals slowing activity; negative growth for ≥2 quarters is a common recession proxy (supplementary to NBER's definition). Market reactions: strong GDP may raise Fed hike expectations (pressuring bonds); weak growth may signal easing (bonds outperform).",
    cn: "**定义**：在给定时期内，一个国家境内生产的所有最终商品和服务的总市场价值。美国经济分析局（BEA）每季度发布数据，并有三次修订；实际GDP（经通胀调整）是周期分析的关键指标。\n\n**解释**：经济活动最广泛的衡量指标。实际GDP增长高于2%（美国潜在增长率）表明经济扩张；增长低于1%则预示经济活动放缓；连续两个或更多季度的负增长是常见的衰退指标。市场反应：强劲的GDP可能提高美联储加息预期（给债券带来压力）；经济疲软可能预示政策宽松（债券表现优于其他资产）。"
  },
  "1-非农就业人数 (NFP)": {
    bilingual: true,
    title: "Nonfarm Payrolls (NFP)",
    title_cn: "非农就业人数 (NFP)",
    type: "Coincident Indicator",
    type_cn: "同步指标",
    en: "**Definition**: Monthly BLS data measuring the change in employment across all sectors except agriculture, private households, and non-profits — considered the most reliable gauge of U.S. labor market trends.\n\n**Explanation**: NFP is the most impactful monthly indicator. Average monthly gains of 150k-200k signal stable employment; gains >300k indicate tight labor markets; gains <100k suggest slowing growth. Changes in NFP directly link to consumer spending (68-70% of GDP) and Fed policy.",
    cn: "**定义**：每月BLS数据，衡量除农业、私人家庭和非营利组织之外所有行业的就业变化，被认为是衡量美国劳动力市场趋势最可靠的指标。\n\n**解释**：非农就业人数（NFP）是最具影响力的月度指标。月均新增15万至20万个就业岗位表明就业形势稳定；新增超过30万个就业岗位则表明劳动力市场紧张；涨幅<10万表明增长放缓。非农就业人数的变化直接关系到消费者支出（占GDP的68-70%）和美联储政策。"
  },
  "1-失业率": {
    bilingual: true,
    title: "Unemployment Rate",
    title_cn: "失业率",
    type: "Lagging Indicator",
    type_cn: "滞后指标",
    en: "**Definition**: BLS monthly data measuring the percentage of the labor force (employed + actively seeking work) that is unemployed; excludes discouraged workers (a key limitation).\n\n**Explanation**: The U.S. natural rate of unemployment (full employment) is 4-4.5%. Unemployment below this range creates wage inflation pressures; above 6% (e.g., 14.7% in 2020) signals recessionary conditions.",
    cn: "**定义**：BLS月度数据，用于衡量劳动力（就业者+积极求职人员）中失业人员的百分比；不包括灰心丧气的劳动者（这是一个关键局限性）。\n\n**解释**：美国自然失业率（充分就业）为4-4.5%，低于这一范围的失业率会产生工资通胀压力；高于6%（例如2020年为14.7%）表明经济处于衰退状态。"
  },
  "1-消费者价格指数 (CPI)": {
    bilingual: true,
    title: "Consumer Price Index (CPI)",
    title_cn: "消费者价格指数 (CPI)",
    type: "Lagging Indicator",
    type_cn: "滞后指标",
    en: "**Definition**: Monthly BLS data measuring the change in prices of a fixed basket of goods/services (food, energy, housing, healthcare) purchased by urban consumers. Core CPI (excludes food/energy) is preferred for trend analysis due to volatility.\n\n**Explanation**: The primary market-watched inflation gauge. Core CPI growth above 3% triggers Fed hawkishness; below 1% raises deflation risks. Critical for bonds (inflation erodes fixed returns) and stocks (high inflation compresses margins).",
    cn: "**定义**：每月BLS数据，用于衡量城市消费者购买的一篮子固定商品/服务（食品、能源、住房、医疗保健）价格的变化。由于波动性，核心CPI（不包括食品/能源）更适合用于趋势分析。\n\n**解释**：主要受市场关注的通胀指标。核心CPI涨幅超过3%会引发美联储的鹰派立场；低于1%会增加通缩风险。这对债券（通胀会侵蚀固定回报）和股票（高通胀会压缩利润率）至关重要。"
  },
  "1-个人消费支出价格指数 (PCE)": {
    bilingual: true,
    title: "Personal Consumption Expenditures (PCE) Price Index",
    title_cn: "个人消费支出价格指数 (PCE)",
    type: "Lagging Indicator",
    type_cn: "滞后指标",
    en: "**Definition**: Monthly BEA data measuring prices of goods/services purchased by consumers, with a more flexible basket than CPI (e.g., includes employer-paid healthcare). Core PCE (excludes food/energy) is the Fed's preferred inflation gauge.\n\n**Explanation**: Directly guides Fed policy (2% target). Core PCE above 2% sustains hawkishness; below 2% supports dovishness. PCE is less volatile than CPI, leading to more muted but longer-lasting market reactions.",
    cn: "**定义**：美国经济分析局（BEA）的月度数据，用于衡量消费者购买商品和服务的价格，其商品篮子比CPI更灵活（例如，包括雇主支付的医疗保险费用）。核心PCE（不包括食品/能源）是美联储首选的通胀指标。\n\n**解释**：直接指导美联储政策（2%目标）。核心PCE高于2%会维持鹰派立场；低于2%的支持鸽派立场。PCE的波动性低于CPI，导致市场反应更为温和但持续时间更长。"
  },
  "1-ISM制造业PMI": {
    bilingual: true,
    title: "ISM Manufacturing PMI",
    title_cn: "ISM制造业PMI",
    type: "Leading Indicator",
    type_cn: "领先指标",
    en: "**Definition**: Monthly ISM survey of manufacturing firms, measuring new orders, production, employment, supplier deliveries, and inventories. A reading >50 indicates expansion; <50 indicates contraction.\n\n**Explanation**: A leading indicator (PMI >55 signals strong industrial growth; <45 suggests manufacturing recession). The new orders sub-index is a key predictor of future GDP growth.",
    cn: "**定义**：每月对制造业企业进行的ISM调查，衡量新订单、生产、就业、供应商交货和库存情况。读数>50表示扩张；<50表示收缩。\n\n**解释**：领先指标（PMI>55表明工业强劲增长；<45则暗示制造业衰退）。新订单分项指数是未来GDP增长的关键预测指标。"
  },
  "1-零售销售": {
    bilingual: true,
    title: "Retail Sales",
    title_cn: "零售销售",
    type: "Coincident Indicator",
    type_cn: "同步指标",
    en: "**Definition**: Monthly BLS data measuring total sales of retail establishments (including food services and autos). Core retail sales (excludes autos/gasoline) is a better proxy for consumer spending trends.\n\n**Explanation**: Reflects consumer health (68-70% of GDP). Monthly growth >0.5% indicates strong demand (supports consumer stocks); negative growth signals weak confidence. Critical for assessing expansion sustainability.",
    cn: "**定义**：每月BLS数据，衡量零售企业（包括餐饮服务和汽车）的总销售额。核心零售销售（不包括汽车/汽油）是衡量消费者支出趋势的更好指标。\n\n**解释**：反映消费者健康状况（占GDP的68-70%）。月度增长率>0.5%表明需求强劲（支撑消费股）；负增长则表明信心不足。对于评估扩张的可持续性至关重要。"
  },
  "1-耐用品订单": {
    bilingual: true,
    title: "Durable Goods Orders",
    title_cn: "耐用品订单",
    type: "Leading Indicator",
    type_cn: "领先指标",
    en: "**Definition**: Monthly BEA data measuring new orders for goods with a useful life >3 years (autos, machinery, aircraft). Core orders (excludes transportation) are a proxy for business investment (reduces volatility).\n\n**Explanation**: A leading indicator of investment and industrial activity. Strong growth suggests business expansion (benefits industrials/tech); declining numbers signal weak confidence (recession risk).",
    cn: "**定义**：美国经济分析局（BEA）的月度数据，衡量使用寿命超过3年的商品（汽车、机械、飞机）的新订单。核心订单（不包括运输）是商业投资的一个替代指标（可降低波动性）。\n\n**解释**：投资和工业活动的领先指标。强劲增长表明企业正在扩张（对工业/科技行业有利）；数字下降表明信心不足（衰退风险）。"
  },
  "1-消费者信心指数 (CCI)": {
    bilingual: true,
    title: "Consumer Confidence Index (CCI)",
    title_cn: "消费者信心指数 (CCI)",
    type: "Leading Indicator",
    type_cn: "领先指标",
    en: "**Definition**: Monthly Conference Board survey measuring consumers' assessment of current conditions and future expectations (0-100 scale).\n\n**Explanation**: High CCI (>100, e.g., 102.6 in 2023) signals strong spending intent (supports retail stocks); low CCI (<80, e.g., current reading of 54) indicates caution. The expectations sub-index is a leading indicator.",
    cn: "**定义**：每月由世界大型企业联合会进行的调查，用于衡量消费者对当前状况和未来预期的评估（0-100分制）。\n\n**解释**：高CCI（>100，例如2023年的102.6）表明强劲的消费意愿（支持零售股）；低CCI（<80，例如当前读数为54）表明需谨慎。预期子指数是一个领先指标。"
  },
  "1-10年期国债收益率及收益率曲线": {
    bilingual: true,
    title: "10-Year Treasury Yield & Yield Curve (10Y-2Y Spread)",
    title_cn: "10年期国债收益率及收益率曲线 (10Y-2Y利差)",
    type: "Leading Indicator",
    type_cn: "领先指标",
    en: "**Definition**: The 10-year Treasury yield is the benchmark for long-term borrowing costs; the 10Y-2Y spread is the difference between 10-year and 2-year yields — used to predict cycle turning points.\n\n**Explanation**: An inverted spread (10Y < 2Y) has preceded every U.S. recession since 1950 (6-18-month lag). A steepening spread signals expansion expectation. The 10-year yield benchmarks mortgages and corporate bonds.",
    cn: "**定义**：10年期国债收益率是长期借款成本的基准；10年期与2年期国债收益率利差是10年期和2年期国债收益率之间的差值，用于预测周期转折点。\n\n**解释**：自1950年以来，每次美国经济衰退之前都会出现收益率曲线倒挂（10年期国债收益率低于2年期国债收益率）（滞后6至18个月）。收益率曲线变陡预示着经济扩张预期。10年期国债收益率是抵押贷款和公司债券的基准。"
  },
  "1-美联储货币政策概述": {
    bilingual: true,
    title: "Federal Reserve Monetary Policy Overview",
    title_cn: "美联储货币政策概述",
    en: "The Federal Reserve, through the Federal Open Market Committee (FOMC), sets the target range for the federal funds rate — the interest rate at which banks lend reserves to each other overnight. This rate influences broader borrowing costs across the economy, including mortgages, corporate loans, and consumer credit.\n\nThe Fed's dual mandate is to promote **maximum employment** and **stable prices** (targeting 2% inflation). Historical fed funds rate cycles since 1980 include multiple hikes and cuts, often in response to economic conditions.",
    cn: "美联储通过联邦公开市场委员会（FOMC）设定联邦基金利率的目标区间，即银行之间隔夜拆借准备金的利率。这一利率影响着整个经济中更广泛的借贷成本，包括抵押贷款、企业贷款和消费信贷。\n\n美联储的双重使命是促进**充分就业**和**稳定物价**（目标通胀率为2%）。自1980年以来，联邦基金利率经历了多轮加息和降息周期，通常是对经济形势的回应。"
  }
};

// ===== App State =====
let state = {
  currentView: 'home',
  currentModule: null,
  currentSection: null,
  modalItems: [],
  modalIndex: 0,
  completedItems: new Set(JSON.parse(localStorage.getItem('completedItems') || '[]')),
  theme: localStorage.getItem('theme') || 'dark'
};

// ===== Initialize =====
function init() {
  // Set theme
  document.documentElement.setAttribute('data-theme', state.theme);
  document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '🌙' : '☀️';

  // Render sidebar
  renderSidebar();
  
  // Render home
  renderHome();
  
  // Render modules grid
  renderModulesGrid();

  // Render OCR progress
  renderOCRGlobalProgress();

  // Update progress
  updateTotalProgress();
  
  // Bind events
  bindEvents();
}

// ===== Render Sidebar =====
function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  const stages = [
    { num: 1, name: '基础认知', modules: [1, 2] },
    { num: 2, name: '专业进阶', modules: [3, 4, 5, 6, 7] },
    { num: 3, name: '财富实践', modules: [8, 9, 10] }
  ];

  nav.innerHTML = stages.map(s => `
    <div class="nav-section">
      <div class="nav-section-title">阶段${s.num} · ${s.name}</div>
      ${s.modules.map(id => {
        const m = MODULES.find(x => x.id === id);
        const completed = getModuleCompletedCount(id);
        const total = getModuleTotalCount(id);
        return `<div class="nav-item ${state.currentModule === id ? 'active' : ''} ${completed === total && total > 0 ? 'completed' : ''}" data-module="${id}">
          <span class="nav-item-icon">${m.icon}</span>
          <span class="nav-item-name">${m.num}. ${m.name}</span>
          <span class="nav-item-check">${completed}/${total}</span>
        </div>`;
      }).join('')}
    </div>
  `).join('');
}

// ===== Render Home =====
function renderHome() {
  renderModulesGrid();
}

// ===== Render Modules Grid =====
function renderModulesGrid() {
  const grid = document.getElementById('modulesGrid');
  grid.innerHTML = MODULES.map(m => {
    const completed = getModuleCompletedCount(m.id);
    const total = getModuleTotalCount(m.id);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    const circumference = 2 * Math.PI * 14;
    const dashoffset = circumference - (pct / 100) * circumference;
    
    // Get first 3 tags
    const tags = m.sections.flatMap(s => s.items.slice(0, 3)).map(i => i.title.substring(0, 6));

    return `<div class="module-card" data-module="${m.id}">
      <svg class="module-progress-ring" viewBox="0 0 36 36">
        <circle class="bg" cx="18" cy="18" r="14"/>
        <circle class="fg" cx="18" cy="18" r="14" stroke-dasharray="${circumference}" stroke-dashoffset="${dashoffset}"/>
      </svg>
      <div class="module-card-header">
        <div class="module-card-icon">${m.icon}</div>
        <div class="module-card-info">
          <div class="module-card-num">模块 ${m.num}</div>
          <div class="module-card-title">${m.name}</div>
        </div>
      </div>
      <div class="module-card-desc">${m.desc}</div>
      <div class="module-card-footer">
        <div class="module-card-topics">
          ${m.sections.slice(0, 3).map(s => `<span class="topic-tag">${s.title.substring(0, 8)}</span>`).join('')}
        </div>
        ${(() => {
          const ocr = getModuleOCRCoverage(m.id);
          if (ocr.pct >= 80) return `<span class="ocr-badge ocr-badge-card ocr-badge-complete">✓ OCR ${ocr.covered}条</span>`;
          if (ocr.pct > 0) return `<span class="ocr-badge ocr-badge-card ocr-badge-partial">◐ OCR ${ocr.covered}/${ocr.total}</span>`;
          return `<span class="ocr-badge ocr-badge-card ocr-badge-pending">○ 待OCR</span>`;
        })()}
        <span class="module-card-arrow">→</span>
      </div>
    </div>`;
  }).join('');
}

function renderOCRGlobalProgress() {
  const ocr = getTotalOCRCoverage();
  const el = document.getElementById('ocrGlobalProgress');
  if (!el) return;
  el.innerHTML = `
    <div class="ocr-global-header">
      <span class="ocr-global-icon">📄</span>
      <span class="ocr-global-title">OCR 双语内容进度</span>
      <span class="ocr-global-count">${ocr.covered} / ${ocr.total} 条已完成</span>
      <span class="ocr-global-pct">${ocr.pct}%</span>
    </div>
    <div class="ocr-global-bar">
      <div class="ocr-global-fill" style="width:${ocr.pct}%"></div>
    </div>
    <div class="ocr-global-legend">
      <span class="ocr-legend-dot ocr-legend-done"></span>已完成 (模块1: 宏观经济基础)
      <span class="ocr-legend-dot ocr-legend-pending"></span>待处理 (模块2-10)
    </div>
  `;
}

// ===== Render Module Detail =====
function renderModuleDetail(moduleId) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) return;

  state.currentModule = moduleId;
  
  // Update header
  const header = document.getElementById('moduleHeader');
  const completed = getModuleCompletedCount(m.id);
  const total = getModuleTotalCount(m.id);
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  header.innerHTML = `
    <div class="module-breadcrumb" onclick="goHome()">← 返回首页</div>
    <div class="module-hero">
      <div class="module-hero-icon">${m.icon}</div>
      <div class="module-hero-info">
        <div class="module-hero-num">模块 ${m.num} · 阶段${m.stage}</div>
        <div class="module-hero-title">${m.name}</div>
        <div class="module-hero-desc">${m.desc}</div>
        <div class="module-hero-progress">
          <div class="module-hero-progress-bar">
            <div class="module-hero-progress-fill" style="width:${pct}%;background:${m.color}"></div>
          </div>
          <span class="module-hero-progress-text">${completed}/${total} 已掌握</span>
        </div>
      </div>
    </div>
  `;

  // OCR status banner
  const ocr = getModuleOCRCoverage(m.id);
  let ocrBanner = '';
  if (ocr.pct >= 80) {
    ocrBanner = `<div class="ocr-banner ocr-banner-complete"><span class="ocr-banner-icon">✅</span><span class="ocr-banner-text"><strong>OCR 已完成</strong> — 共 ${ocr.covered} 条中英双语内容，来源于原始学习材料截图提取</span></div>`;
  } else if (ocr.pct > 0) {
    ocrBanner = `<div class="ocr-banner ocr-banner-partial"><span class="ocr-banner-icon">🔶</span><span class="ocr-banner-text"><strong>OCR 进行中</strong> — ${ocr.covered}/${ocr.total} 条已完成双语提取</span></div>`;
  } else {
    ocrBanner = `<div class="ocr-banner ocr-banner-pending"><span class="ocr-banner-icon">⏳</span><span class="ocr-banner-text"><strong>OCR 待处理</strong> — 该模块的双语内容尚未从原始材料中提取，当前为占位知识点</span></div>`;
  }

  // Update content
  const content = document.getElementById('moduleContent');
  content.innerHTML = ocrBanner + m.sections.map((section, si) => {
    const items = section.items.map((item, ii) => {
      const key = `${m.id}-${item.title}`;
      const checked = state.completedItems.has(key);
      const kc = KNOWLEDGE_CONTENT[key];
      const hasBilingual = kc && kc.bilingual;
      return `<div class="knowledge-item ${checked ? 'checked' : ''}" data-key="${key}" data-item='${JSON.stringify({title: item.title, moduleId: m.id, section: section.title, item}).replace(/'/g, "&#39;")}'>
        <div class="knowledge-item-check">${checked ? '✓' : ''}</div>
        <div class="knowledge-item-content">
          <div class="knowledge-item-title">${item.title}${hasBilingual ? '<span class="bilingual-dot" title="中英双语OCR内容"></span>' : ''}</div>
          <div class="knowledge-item-subtitle">${item.subtitle}</div>
        </div>
        <span class="knowledge-item-tag tag-${item.tag}">${getTagName(item.tag)}</span>
      </div>`;
    }).join('');
    
    return `<div class="knowledge-section">
      <div class="section-header" onclick="toggleSection(${si})">
        <div class="section-header-left">
          <span class="section-number">${section.title}</span>
          <span class="section-count">${section.items.length}个知识点</span>
        </div>
        <div class="section-meta">
          <span class="section-toggle open" id="toggle${si}">▼</span>
        </div>
      </div>
      <div class="section-body open" id="section${si}">${items}</div>
    </div>`;
  }).join('');

  // Update sidebar
  renderSidebar();
  
  // Show module view
  switchView('module');
}

// ===== Helper Functions =====
function getTagName(tag) {
  const map = { core: '核心', expanded: '进阶', practice: '实战', trend: '前沿' };
  return map[tag] || tag;
}

function getModuleOCRCoverage(id) {
  const m = MODULES.find(x => x.id === id);
  let total = 0, covered = 0;
  m.sections.forEach(s => {
    s.items.forEach(item => {
      total++;
      const key = `${id}-${item.title}`;
      if (KNOWLEDGE_CONTENT[key] && KNOWLEDGE_CONTENT[key].bilingual) {
        covered++;
      }
    });
  });
  return { covered, total, pct: total > 0 ? Math.round((covered / total) * 100) : 0 };
}

function getTotalOCRCoverage() {
  let total = 0, covered = 0;
  MODULES.forEach(m => {
    const c = getModuleOCRCoverage(m.id);
    total += c.total;
    covered += c.covered;
  });
  return { covered, total, pct: total > 0 ? Math.round((covered / total) * 100) : 0 };
}

function getModuleTotalCount(id) {
  const m = MODULES.find(x => x.id === id);
  return m.sections.reduce((sum, s) => sum + s.items.length, 0);
}

function getModuleCompletedCount(id) {
  const m = MODULES.find(x => x.id === id);
  return m.sections.reduce((sum, s) => {
    return sum + s.items.filter(item => state.completedItems.has(`${id}-${item.title}`)).length;
  }, 0);
}

function updateTotalProgress() {
  const total = MODULES.reduce((sum, m) => sum + getModuleTotalCount(m.id), 0);
  const completed = Array.from(state.completedItems).filter(k => MODULES.some(m => k.startsWith(m.id + '-'))).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  document.getElementById('totalProgress').textContent = pct + '%';
  document.getElementById('totalProgressBar').style.width = pct + '%';
}

function toggleSection(idx) {
  const body = document.getElementById('section' + idx);
  const toggle = document.getElementById('toggle' + idx);
  body.classList.toggle('open');
  toggle.classList.toggle('open');
  if (toggle.classList.contains('open')) {
    toggle.textContent = '▼';
  } else {
    toggle.textContent = '▶';
  }
}

// ===== View Management =====
function switchView(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(view + 'View').classList.add('active');
  state.currentView = view;
}

function goHome() {
  state.currentModule = null;
  switchView('home');
  renderSidebar();
}

// ===== Search =====
function performSearch(query) {
  if (!query.trim()) return;
  
  const results = [];
  MODULES.forEach(m => {
    m.sections.forEach(s => {
      s.items.forEach(item => {
        if (item.title.includes(query) || item.subtitle.includes(query) || s.title.includes(query)) {
          results.push({ module: m, section: s, item });
        }
      });
    });
  });

  document.getElementById('searchQuery').textContent = query;
  document.getElementById('searchCount').textContent = `共找到 ${results.length} 个结果`;
  
  const container = document.getElementById('searchResults');
  if (results.length === 0) {
    container.innerHTML = `<div class="search-no-results"><div class="icon">🔍</div><p>未找到与"${query}"相关的知识点</p></div>`;
  } else {
    container.innerHTML = results.map(r => `
      <div class="search-result-item" onclick="openModalFromSearch(${r.module.id}, '${r.item.title}')">
        <div class="search-result-module">${r.module.icon} ${r.module.num}. ${r.module.name} · ${r.section.title}</div>
        <div class="search-result-title">${r.item.title}</div>
        <div class="search-result-desc">${r.item.subtitle}</div>
      </div>
    `).join('');
  }
  
  switchView('search');
}

function openModalFromSearch(moduleId, itemTitle) {
  const m = MODULES.find(x => x.id === moduleId);
  if (!m) return;
  
  let allItems = [];
  m.sections.forEach(s => {
    s.items.forEach(item => {
      allItems.push({ module: m, section: s, item });
    });
  });
  
  const idx = allItems.findIndex(x => x.item.title === itemTitle);
  state.modalItems = allItems;
  state.modalIndex = Math.max(0, idx);
  openModal();
}

// ===== Modal =====
function openModal() {
  updateModalContent();
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}

function renderBilingualMarkdown(md) {
  // Simple markdown-to-HTML renderer for bilingual content
  let html = md
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Tables
  html = html.replace(/\|(.+)\|\n\|[- |:]+\|\n((?:\|.+\|\n?)+)/gm, function(_, header, body) {
    var hs = header.split('|').filter(function(h){return h.trim()}).map(function(h){return '<th>'+h.trim()+'</th>'}).join('');
    var rows = body.trim().split('\n').map(function(row){
      var cells = row.split('|').filter(function(c){return c.trim()}).map(function(c){return '<td>'+c.trim()+'</td>'}).join('');
      return '<tr>'+cells+'</tr>';
    }).join('');
    return '<table><thead><tr>'+hs+'</tr></thead><tbody>'+rows+'</tbody></table>';
  });

  html = html.replace(/^---$/gm, '<hr>');
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>');
  html = html.replace(/\n\n/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>(\s*<br>\s*)+<\/p>/g, '');
  return html;
}

function updateModalContent() {
  const current = state.modalItems[state.modalIndex];
  if (!current) return;

  const { module, section, item } = current;
  const key = `${module.id}-${item.title}`;
  const content = KNOWLEDGE_CONTENT[key];

  document.getElementById('modalTitle').textContent = `${module.icon} ${item.title}`;

  let bodyHtml = `<p style="color:var(--text-secondary);margin-bottom:12px">📚 ${module.num}. ${module.name} · ${section.title}</p>`;

  if (content && content.bilingual) {
    if (content.type) {
      bodyHtml += `<div class="bilingual-header"><span class="indicator-type">${content.type} / ${content.type_cn}</span></div>`;
    }
    bodyHtml += `<div class="bilingual-columns">`;
    bodyHtml += `<div class="bilingual-col bilingual-en"><div class="bilingual-col-label">🇺🇸 English</div>${renderBilingualMarkdown(content.en)}</div>`;
    bodyHtml += `<div class="bilingual-col bilingual-cn"><div class="bilingual-col-label">🇨🇳 中文</div>${renderBilingualMarkdown(content.cn)}</div>`;
    bodyHtml += `</div>`;
  } else if (content) {
    bodyHtml += content.content;
  } else {
    bodyHtml += `<div class="highlight-text"><b>${item.title}</b><br>${item.subtitle}</div>`;
    bodyHtml += `<h4>📌 核心要点</h4><p>待补充完善：</p><ul>`;
    item.subtitle.split(' | ').forEach(point => {
      bodyHtml += `<li><b>${point}</b></li>`;
    });
    bodyHtml += `</ul>`;
    bodyHtml += `<h4>📌 提示</h4><p style="color:var(--text-muted);font-style:italic">该知识点内容正在完善中，敬请期待。To be continued...</p>`;
  }

  bodyHtml += `<h4>📌 知识标签</h4><p><span class="knowledge-item-tag tag-${item.tag}">${getTagName(item.tag)}</span></p>`;

  document.getElementById('modalBody').innerHTML = bodyHtml;
  document.getElementById('modalIndicator').textContent = `${state.modalIndex + 1} / ${state.modalItems.length}`;

  const checkEl = document.querySelector(`[data-key="${key}"] .knowledge-item-check`);
  if (checkEl) {
    const isChecked = state.completedItems.has(key);
    checkEl.textContent = isChecked ? '✓' : '';
    checkEl.parentElement.classList.toggle('checked', isChecked);
  }
}function nextModal() {
  if (state.modalIndex < state.modalItems.length - 1) {
    state.modalIndex++;
    updateModalContent();
  }
}

function prevModal() {
  if (state.modalIndex > 0) {
    state.modalIndex--;
    updateModalContent();
  }
}

function toggleCheck(key) {
  if (state.completedItems.has(key)) {
    state.completedItems.delete(key);
  } else {
    state.completedItems.add(key);
  }
  localStorage.setItem('completedItems', JSON.stringify(Array.from(state.completedItems)));
  updateTotalProgress();
  renderSidebar();
  
  // Re-render module if visible
  if (state.currentModule) {
    const checkEl = document.querySelector(`[data-key="${key}"] .knowledge-item-check`);
    if (checkEl) {
      const isChecked = state.completedItems.has(key);
      checkEl.textContent = isChecked ? '✓' : '';
      checkEl.parentElement.classList.toggle('checked', isChecked);
    }
    
    // Update module progress bar
    const m = MODULES.find(x => x.id === state.currentModule);
    if (m) {
      const completed = getModuleCompletedCount(m.id);
      const total = getModuleTotalCount(m.id);
      const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
      const progressText = document.querySelector('.module-hero-progress-text');
      if (progressText) progressText.textContent = `${completed}/${total} 已掌握`;
    }
  }
}

// ===== Event Bindings =====
function bindEvents() {
  // Module cards click
  document.getElementById('modulesGrid').addEventListener('click', e => {
    const card = e.target.closest('.module-card');
    if (card) {
      renderModuleDetail(parseInt(card.dataset.module));
    }
  });

  // Sidebar nav click
  document.getElementById('sidebarNav').addEventListener('click', e => {
    const item = e.target.closest('.nav-item');
    if (item) {
      renderModuleDetail(parseInt(item.dataset.module));
    }
  });

  // Search
  let searchTimeout;
  document.getElementById('searchInput').addEventListener('input', e => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => performSearch(e.target.value), 300);
  });

  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Modal events
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target.id === 'modalOverlay') closeModal();
  });
  document.getElementById('modalPrev').addEventListener('click', prevModal);
  document.getElementById('modalNext').addEventListener('click', nextModal);

  // Theme toggle
  document.getElementById('themeToggle').addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', state.theme);
    document.getElementById('themeToggle').textContent = state.theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', state.theme);
  });

  // Sidebar toggle (mobile)
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Knowledge item click & check
  document.getElementById('moduleContent').addEventListener('click', e => {
    const item = e.target.closest('.knowledge-item');
    const check = e.target.closest('.knowledge-item-check');
    
    if (item) {
      const data = JSON.parse(item.dataset.item.replace(/&#39;/g, "'"));
      const allItems = [];
      const m = MODULES.find(x => x.id === data.moduleId);
      m.sections.forEach(s => s.items.forEach(i => allItems.push({ module: m, section: s, item: i })));
      state.modalItems = allItems;
      state.modalIndex = allItems.findIndex(x => x.item.title === data.item.title);
      
      // Find key for checking
      const key = `${data.moduleId}-${data.item.title}`;
      
      if (check) {
        // Toggle check only
        toggleCheck(key);
      } else {
        // Open modal
        state.modalItems = allItems;
        state.modalIndex = allItems.findIndex(x => x.item.title === data.item.title);
        openModal();
      }
    }
  });
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
