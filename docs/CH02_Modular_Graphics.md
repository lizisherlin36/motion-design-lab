# Motion Design Lab · CH02 — Modular Graphic Motion
## 模块化图形动效

> 课程阶段：独立参考库；目前不修改 Motion Design Lab 02 网站。所有参数为项目建议起始值，并非行业强制标准。

### 核心定义

**Graphic Motion = 视觉状态关系 + 几何连续性 + 时间编排。** 动画之前先建立 A/B 两个可信的高质量静帧。重点是同一实体在不同版式中身份、空间和颜色的连续性。

主流程：构图母版 → 静态网格 → 对象身份表 → 前后空间匹配 → 时间轴 → 关键帧审查。

### 真实项目参考（不将案例年份等同于2026新案例）

- **[Studio Dumbar / Cities in Motion](https://studiodumbar.com/work/cities-in-motion)**：变化网格与字形适配，同一结构规则贯穿动态识别。
- **[Studio Dumbar / Cumulus Park](https://studiodumbar.com/work/cumulus-park)**：从点阵文字拓展为多状态品牌视觉，学习组成式动效。
- **[Studio Dumbar / DEMO 2025](https://studiodumbar.com/work/demo-2025)**：多城市、多载体的动态品牌系统与声音设计。
- **[Studio Dumbar / Instagram](https://studiodumbar.com/work/instagram)**：跨媒介营销与产品场景的广义动效系统。
- **[IBM Carbon / Motion Choreography](https://www.carbondesignsystem.com/building-blocks/foundations/motion/choreography)**：共享网格、层级排序、productive 与 expressive 动效语法。
- **[Google / Android Auto motion](https://developers.google.com/cars/design/android-auto/design-system/motion)**：Shared Axis 的空间连续性与基于标准 easing 的动画逻辑。

### 12 种技法索引

| ID | Technique | 中文 | 运动机制 / 适用场景 | 起始时长 | 失败模式 |
|---|---|---|---|---|---|
| GM01 | Modular Cascade | 栅格模块级联 | 模块沿统一网格分组出现，保留静态参考轴；信息卡、序列化内容 | 400–750ms | 同时给所有卡片完全不同的方向与曲线 |
| GM02 | Grid Reflow | 栅格重排 | 同一组模块从三列转成纵向比较布局；标签与颜色持续绑定；章节重组、策略对比 | 650–1000ms | 用闪白掩盖两场布局不连续 |
| GM03 | Shared Element Transition | 共享元素转场 | 前一场的真实图形对象延伸为下一场背景或容器；连续叙事、品牌对比 | 550–900ms | “看起来一样”的两张图生硬切换 |
| GM04 | Geometric Wipe | 几何擦除 | 从已有面板扩张色块遮罩，局部替换内容；分镜转场 | 350–600ms | 随机圆形扩散和满屏爆炸 |
| GM05 | Split-Panel Shift | 分栏重构 | 屏幕在2/3列之间重新分配宽度，增加或收拢比较信息；多品牌并置、正反论证 | 450–750ms | 栏宽重排导致文字瞬时挤压 |
| GM06 | Shape Mask Reveal | 形状遮罩揭示 | 通过矩形或自定义shape clip窗口显露照片/文字；图文混合、产品图 | 350–650ms | 把文字和遮罩一起平移 |
| GM07 | Line-to-Frame | 线形成容器 | 一条参考线折转成框，再显示图表与注释；工程信息、技术面板 | 600–900ms | 线条作为毫无语义的装饰疯狂生长 |
| GM08 | Geometric Morph | 几何形态变换 | 形体面积与质心保持相对连续，圆形→方形→模块；概念转折、品牌标识 | 500–900ms | 复杂路径插值引起自相交或跳帧 |
| GM09 | Modular Carousel | 水平模块长卷 | 同系列面板以同速横向滚动并保留阅读停留；系列数据卡、产品介绍 | 700–1200ms | 面板持续滚动导致可读性缺失 |
| GM10 | Positive/Negative Inversion | 正负形反相 | 局部颜色反转并让文字保持对比，突出判断；前后对比、判断结论 | 300–600ms | 频繁白闪、闪烁与超高频反相 |
| GM11 | Anchored Focus Shift | 定锚聚焦迁移 | 布局静止，仅焦点模块的边框/色块在空间迁移；策略分项、指标轮播 | 550–850ms | 所有模块一同动造成注意力竞争 |
| GM12 | System-Level Transition | 系统级章节转场 | 文字、编号、卡片与背景遵循同一转场语法；系列栏目识别 | 800–1400ms | 每个镜头采用不同转场，缺乏系列识别 |

### 可执行 Motion Token 合同

```yaml
chapter: CH02
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
专题：Modular Graphic Motion。请选择目录中的一个主技法，并标注技法ID、运动对象、起止位置、固定锚点、持续时间、错位、Easing、Hold以及下一场结构关系。
主运动只使用一个，辅助运动最多一个；固定基线/坐标轴不漂移。中文字体不可拉伸变形。
输出关键帧 PNG、可编辑 Remotion 组件、时间轴、最终 MP4 和 QC 自查列表。
不得将样例数字当作客观事实，不得伪造企业销量、增长率、市场份额等统计。
```

### 6 秒实操 / 三种出海路径 → 三栏比较

| Frame | Time | Action |
|---|---|---|
|0–17|0–0.6s|固定网格与标题；左侧3张抽象品牌模块|
|18–42|0.6–1.4s|GM01 模块级联，间隔3帧逐一揭示|
|43–68|1.43–2.27s|GM02 从三卡状态重排为三栏参数面板，边框保持连续|
|69–116|2.3–3.87s|完整信息保持，确保可读|
|117–156|3.9–5.2s|GM03 从中心模块共享元素扩展为下一镜图表标题栏|
|157–179|5.23–6.0s|下一镜建立静态布局与准备 data chart|

**关键验收**：同一模块在变形前后 `element_id` 不变；中间 50% 过渡不出现非语义空白、文字扭曲或身份丢失。

### QC 评分 100分

| 维度 | 权重 |
|---|---:|
| 静态布局与版式 | 20 |
| 对象身份与过渡连续性 | 25 |
| 运动编排与节奏 | 25 |
| 阅读停留与信息层级 | 15 |
| 工程质量 | 15 |

建议≥85/100放行；CH03 数据造假或单位/时间口径不可核查则直接不通过。

### 后续网站集成字段

`ch02_catalog.json` 保存 pattern ID、title、motion rule、duration、failure、reference URL、style token 和验收标准。六章齐备后再统一整合。