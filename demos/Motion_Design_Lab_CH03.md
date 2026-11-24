# Motion Design Lab · CH03 — Data-Driven Motion
## 数据驱动动效

> 课程阶段：独立参考库；目前不修改 Motion Design Lab 02 网站。所有参数为项目建议起始值，并非行业强制标准。

### 核心定义

**Data-Driven Motion = 问题→证据→可视编码→时间揭示→结论。** 数据真实性高于视觉冲击；动画不可以改变原始关系、规模或结论。

主流程：明确研究问题 → 验证数据源与口径 → 选择图表类型 → 确定坐标系统 → 定义交互/叙事时间 → 验收。

### 真实项目参考（不将案例年份等同于2026新案例）

- **[Financial Times / Visual Vocabulary](https://github.com/Financial-Times/chart-doctor/tree/main/visual-vocabulary)**：先根据数据关系选择图表类型，避免为动画而误用图形。
- **[The Pudding / Scrollytelling without code](https://pudding.cool/process/no-code-charts/)**：让数据视觉在阅读进程中保持并分段变化。
- **[The Pudding / Data storytelling process](https://pudding.cool/process/how-to-make-dope-shit-part-3/)**：先确定叙事问题和数据证据，再编排视觉发现。
- **[Observable / Five ways to effectively use animation](https://old.observablehq.com/blog/effective-animation)**：过渡如何帮助理解状态、追踪变化与聚焦异常。
- **[D3 / Learn Animation](https://observablehq.com/@d3/learn-d3-animation)**：真实数据绑定下的路径动画与平滑状态迁移。
- **[PolicyViz / 10 Ways to Mislead with Data Visualization](https://policyviz.com/2023/02/07/10-ways-to-mislead-with-data-visualization/)**：图形比例、口径、颜色和标注如何误导。

### 12 种技法索引

| ID | Technique | 中文 | 运动机制 / 适用场景 | 起始时长 | 失败模式 |
|---|---|---|---|---|---|
| DM01 | Progressive Disclosure | 数据递进揭示 | 先坐标和口径，再系列，再比较结论；全部图表开场 | 800–1600ms | 数字先动、观众还不知道口径 |
| DM02 | Ranked Bars | 排序条形比较 | 固定零基线，条长映射数值，排名变动保留对象身份；市场份额、销量排行 | 800–1600ms | 缩短横轴、夸张差距或排序错位 |
| DM03 | Line Path Tracing | 时间序列追踪 | 时间轴不变，沿x方向逐步绘制真实数据路径；销量趋势、市场渗透 | 900–1800ms | 用动画把折线变为不对应的数据形态 |
| DM04 | Scatter / Dot Morph | 散点与比较图变换 | 相同对象在两种坐标编码之间移动，点ID保持不变；相关性、市场分布 | 700–1500ms | 无意义的随机点运动冒充数据变化 |
| DM05 | Small Multiples | 同尺度小倍图 | 多个品牌使用同一坐标和单位的小型图，按叙事逐项高亮；三大车企比较 | 700–1200ms | 各卡片私设坐标上限导致误读 |
| DM06 | Slopegraph Compare | 两时点斜率图 | 两个时间节点间直接连接各品牌，强调相对变化；进出市场前后 | 800–1400ms | 把不同定义的两期数据强行连接 |
| DM07 | Indexed Growth | 基期指数化比较 | 明确标注基期=100后比较增长路径；不同体量品牌增长速度 | 1000–1600ms | 误把指数当成销量绝对值 |
| DM08 | Timeline Event Annotation | 事件时间轴注释 | 事件节点以日期、区域、类别递进出现；建厂、上市、合作、法规 | 800–1600ms | 主观事件密度不按时间比例 |
| DM09 | Part-to-Whole Stack | 整体构成堆叠 | 从总量到分项占比，始终保留总额和百分比口径；地区构成、车型结构 | 800–1400ms | 分项求和与总值不一致 |
| DM10 | Flow / Sankey Reveal | 路径与流向揭示 | 源节点→连接路径→目标节点，宽度与实际量一致；供应链、出口路线 | 1200–2200ms | 任意线宽和动画速度暗示虚假规模 |
| DM11 | Geographic Evidence Motion | 地理证据动画 | 地图与数据保持空间配准，路径与坐标按证据绘制；车企出口地区布局 | 900–1800ms | 为了好看随意移动国家/节点位置 |
| DM12 | Uncertainty / Revision | 不确定性与修订 | 置信区间、估计/预测、发布版次始终保留；预测值、政策推演 | 800–1500ms | 把估算、预测和实绩画为同一确定事实 |

### 可执行 Motion Token 合同

```yaml
chapter: CH03
canvas: 1920x1080
fps: 30
safe_area: 6%
grid: 12 columns
style: TRA
primary_motion: one dominant rule
secondary_motion: at most one
easing: cubic-bezier(0.18, 0.82, 0.19, 1)
reading_hold: 1.5s
checkpoints: styleframe_01, transition_middle, styleframe_02
forbidden: unmotivated glow, bounce, wipes, fabricated facts
```

### 适合 Codex 的母提示词

```text
你是 Motion Art Director + Remotion/GSAP 技术导演。先输出静态设计帧和对象/数据映射表，静帧审核后实现动画。
画幅1920x1080 30fps；采用12列网格，安全边距6%。参考用户的 TRA/PRA 视觉语言，酸性绿/炭灰与电蓝/荧光黄是可选色板而非每场必须全用。
专题：Data-Driven Motion。请选择目录中的一个主技法，并标注技法ID、运动对象、起止位置、固定锚点、持续时间、错位、Easing、Hold以及下一场结构关系。
主运动只使用一个，辅助运动最多一个；固定基线/坐标轴不漂移。中文字体不可拉伸变形。
输出关键帧 PNG、可编辑 Remotion 组件、时间轴、最终 MP4 和 QC 自查列表。
不得将样例数字当作客观事实，不得伪造企业销量、增长率、市场份额等统计。
```

### 9 秒实操 / 海外战略对比（教学合成数据）

**提示：** 示例数据 A=36、B=61、C=82 为纯教学虚构，不得用于事实视频。正式 EP5 须替换为核实的同口径统计，或使用定性比较框架。

| Frame | Time | Action |
|---|---|---|
|0–20|0–0.7s|建立单位/来源/时期/坐标轴；禁止数字提前跳出|
|21–57|0.7–1.9s|DM02 三条横向比较图由零基线伸长；每条与同一个数据变量绑定|
|58–93|1.93–3.1s|强调核心差异，加入精确数值标签，其他条保留上下文|
|94–169|3.13–5.67s|完整停留供阅读；解说解释比较口径|
|170–215|5.67–7.17s|DM05 转为三份同尺度小倍图，数据值不变|
|216–269|7.2–9.0s|结论高亮，字幕同步，显示数据来源及截至日期|

**数据验收**：数据口径不齐时必须改用定性图示；bar-chart 零起点；增长率应有可验证分子/分母；Small Multiples 保持相同纵轴；预测/估值标识始终可见。

### Data Contract / 数据契约

```json
{
  "entity": "Brand A",
  "metric": "example_metric",
  "value": null,
  "unit": "TBD",
  "period": "TBD",
  "geography": "TBD",
  "denominator": null,
  "source_url": "TBD",
  "retrieved_at": "TBD",
  "is_estimate": false,
  "revision": "TBD"
}
```


### QC 评分 100分

| 维度 | 权重 |
|---|---:|
| 事实/来源/口径准确 | 35 |
| 图表编码/尺度严谨 | 25 |
| 时间叙事与阅读 | 20 |
| 动效连续性 | 10 |
| 设计与工程 | 10 |

建议≥85/100放行；CH03 数据造假或单位/时间口径不可核查则直接不通过。

### 后续网站集成字段

`ch03_catalog.json` 保存 pattern ID、title、motion rule、duration、failure、reference URL、style token 和验收标准。六章齐备后再统一整合。