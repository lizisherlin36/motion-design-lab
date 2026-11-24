# Motion Design Lab · CH01

## Editorial Kinetic Typography｜编辑式动态排版

版本：2026-11-19 · 专题内容 v1.0 · **暂不整合进主站**

> 定位：本章节扩展现有 Motion Design Lab 02 中 TY01–TY08 的基础动效练习，从单一预设上升到「排版设计系统、运动语义、叙事节奏、验证机制」。

### 本章核心结论

- 字体不是动画的配件，而是画面构图和节奏的主角。
- 运动层级先于单点特效：主运动 1 个，辅助运动最多 1 个，参照网格尽量静止。
- 先完成高质量静帧，再决定哪些排版关系需要在时间中改变。
- 三组约束：**字形正确、阅读顺序明确、运动语义匹配**。
- 为动态文字建立安全区，重点防止长中文标题、数字单位、字幕的裁切和自动换行错误。

### 研究案例（项目原址）

1. DIA Studio · Nike Statement House (2017)：https://dia.tv/project/nike-statement-house/ —— 以篮球运动构成高能量动态排版。
2. DIA Studio · Nike Basketball (2016)：https://dia.tv/project/nike-basketball/ —— 将词句含义与运动直接连接，形成连续循环。
3. DIA Studio · Nuits Sonores (2025)：https://dia.tv/project/nuits-sonores/ —— 由声音节奏驱动的字体/粒子生成式系统，适合研究动效先行的品牌识别，但不宜直接套到需要保证可读性的资讯字幕。
4. Holke79 · Gamma：https://www.holke79.com/project-gamma.html —— 字形连续变形的品牌动效。
5. Tendril · Nike / So Many Ways To Air：https://tendril.studio/work/nikemanywaystoair/ —— 字体与真实动作场景互相作用，作为后续 Mixed-Media 章节的衔接案例。

这些项目分属不同时期，不代表都是 2026 年新发布作品。案例用来研究经得起时间考验的设计方法。

### 01 / 四个层级

**Layout hierarchy（静态排版层级）**：明确主标题、辅助标题、说明、编号、坐标、留白。字体层级不宜由运动弥补。

**Motion hierarchy（运动层级）**：每镜头一个主要运动机制，最多一个辅助机制。固定栅格、边距和信息区作为视觉锚点。

**Temporal hierarchy（时间层级）**：分成 Establish / Reveal / Settle / Read / Exit 五个时段。中文短片尤其需要阅读停留。

**Semantic mapping（语义映射）**：运动必须解释内容：对比→并置，扩张→延展，聚焦→收拢，转折→轴向对置。

### 02 / 12 种可复用样式

| ID | Technique | 中文 | 建议时长 | 典型应用 | 失败模式 |
|---|---|---|---|---|---|
| KT01 | Masked Baseline Reveal | 行遮罩·基线揭示 | 450–650ms | 资讯片头、章节标题 | 把容器与文字一起移动，导致视觉基准漂移 |
| KT02 | Staggered Phrase Cascade | 词组级递进入场 | 380–600ms | 论点三连、品牌对比 | 每个汉字随机弹出，破坏词组可读性 |
| KT03 | Axis-Led Wipe Type | 轴线引导擦入 | 420–700ms | 工业说明、技术标签 | 没有结构依据的闪光扫描 |
| KT04 | Editorial Overscale Crop | 超大字级·编辑式裁切 | 450–800ms | 强观点、章节封面 | 截断核心汉字导致误读 |
| KT05 | Tracking / Width Compression | 字距或字宽收束 | 650–1000ms | 工业科技、品牌字标 | 缩放 transformX 导致字形变形 |
| KT06 | Weight / Inversion Rhythm | 字重与正负形对置 | 300–650ms | 论点强调、段落节拍 | 过于频繁闪烁、文字形态跳变 |
| KT07 | Typographic Grid Reflow | 字块网格重排 | 550–900ms | 多品牌/产品比较 | 中途改变字号与列宽，让对齐关系丢失 |
| KT08 | Typographic Match Cut | 字体结构匹配转场 | 400–800ms | 章节切换 | 仅靠旋转、模糊或白闪掩盖无关场景 |
| KT09 | Split-Field Typography | 分栏对置·文字构图 | 450–750ms | Before/After、中外策略对比 | 两边分别做不同特效，冲淡对照 |
| KT10 | Numeric Editorial Typography | 数字作为排版主角 | 650–1200ms | 财经、里程碑、指数、排名 | 数字无端滚动或虚构实时值 |
| KT11 | Semantic Type Movement | 语义映射文字运动 | 450–950ms | 解释性短片、品牌概念 | 动作与语义相反，只求炫酷 |
| KT12 | Living Typography Loop | 持续生命化字体系统 | 2400–5000ms循环 | 品牌识别、音乐和展览 | 事实文字不断变形，阅读与审校失败 |

### 03 / 从审美描述到执行语言的转译模板

不要写：「三个品牌动起来，画面科技感，高级一点。」

推荐结构（八项都要明确）：

```text
COMMUNICATION：这一幕唯一要表达的内容及阅读顺序
STYLE：TRA Industrial Editorial / PRA Electric Editorial / 自定义审美
LAYOUT：尺寸、安全区、列数、字体/字重、标题/数字/说明层级
STATIC ANCHORS：固定不动的基线、栅格、边缘、编号
MOTION：对象、动画名、起点/终点、方向、距离、clip/mask 方式
TIMING：起止帧、duration、stagger、easing、hold、exit
CONSTRAINTS：禁止无意义的弹跳/发光/随机转场/中文字形形变
ACCEPTANCE：检查文字不裁切、数字准确、录屏关键帧可读
```

### 04 / 6 秒原创练习：「三种出海路径」

**画面规格**：1920×1080、30fps、总时长 180 帧，12 列网格、6% 安全边距。仅使用 Noto Sans CJK SC / 思源黑体等适合中文的字体，拉丁说明用 Inter 或 Space Grotesk。色彩 TRA：Charcoal #232525，Acid #DAFA39，Orange #FF6704，Paper #EBEEE5。

**版式**：标题「三种出海路径」左对齐，大字级、无阴影；右侧留白用于后续策略卡片。辅助标签「中国车企出海 / CH05」占标题字号的 0.14–0.18。固定标尺不参与入场运动。

| 帧（30fps） | 时间 | 设计动作 |
|---|---|---|
| 0–15 | 0–0.5s | 建立静态基线与栏目编号，背景保持稳定 |
| 15–38 | 0.5–1.27s | 第一行「三种」从自己的裁切窗口升入，移动 y = +72→0，缓动 ease-out |
| 29–53 | 0.97–1.77s | 第二行「出海路径」在独立遮罩中接续揭示，错开 14 帧，最终与第一行严格左对齐 |
| 54–78 | 1.8–2.6s | 辅助英文标签与编号沿同一基线逐步出现，辅助文字无缩放 |
| 79–135 | 2.63–4.5s | 完整信息保持，禁止无意义循环晃动与字幕抢镜 |
| 136–165 | 4.53–5.5s | 标题基线延伸为下一镜头的三列比较网格，执行 Match Move |
| 166–180 | 5.53–6.0s | 完成过渡并建立下一镜头静态参照 |

### 05 / 给 Codex 的母提示词（可直接复制）

```text
你是资深 Motion Art Director 和 Remotion/GSAP 动效工程师。
本任务不是做 PPT 式文字飞入，而是实现 Editorial Kinetic Typography。

请先输出三张静态 styleframes（0.5s、2.7s、5.5s），确认字级、版心、阅读顺序和负空间；静帧确认后再实现逐帧时间轴。

主题：三种出海路径（仅演示标题，禁止自动生成未经核验的出海统计数据）。
规格：1920×1080，30fps，6s，12列网格，安全边距 6%。
色彩：#232525 深炭灰，#DAFA39 酸性绿，#FF6704 仅用于小面积警示，#EBEEE5 作为中性文字。
字体：中文 Noto Sans CJK SC 或合法可用的等价中文无衬线字体；不可人为压扁字形。英文辅助字体 Inter/Space Grotesk。

画面结构：固定左边距和基线，主标题两行；辅助编号/标签不抢占视觉层级。
主运动：KT01 Masked Baseline Reveal。文字在独立 overflow-hidden 行框内 y:+72px→0。第一行从第15帧开始、持续23帧；第二行从第29帧开始、持续24帧。ease-out（cubic-bezier 0.18,0.82,0.19,1）。
次运动：辅助标签从第54帧开始轻微擦入，最大 y 位移 12px；不使用大范围透明度过渡。
信息保持：第79–135帧标题完整不动，以保障阅读。
转场：第136–180帧基线延伸并转化为下一场的三栏网格，只做共享锚点动画，不清屏硬切。

禁止：弹性过冲、逐字无序弹跳、发光/HUD粒子、随机3D翻转、背景与标题同时漂移、字体锯齿、文字截断、伪造数字。
注意：对于中文按整行或意义词组拆分，不允许因机械逐字符拆分造成断词和换行异常；标题层与辅助层分开渲染。

验收：第38、53、80、135、165帧分别输出 PNG 截图；输出可编辑的 Remotion 组件、样式/参数文件和 6s MP4；列出未完成或不可验证的项目，不可虚报完成。
```

### 06 / 质量标准（100分）

| 维度 | 权重 | 判据 |
|---|---:|---|
| 静态排版质量 | 25 | 字形、字号、行距、留白、网格、对齐及中文换行正确 |
| 阅读节奏 | 25 | 主次关系清晰；关键结论有稳定完整阅读段；不因动画漏读 |
| 运动语法 | 20 | 方向统一；有静态锚点；加减速有逻辑；避免多余动作 |
| 内容语义 | 15 | 动作符合内容含义，事实、数字、单位不被改写 |
| 工程品质 | 15 | 跨比例可排版、关键帧无裁切、渲染无抖动、模块化可编辑 |

**通过标准：≥85 分；其中“事实与文字准确性”为一票否决。**

### 07 / 作品归档字段

每个未来收录案例统一登记：`case_id / source_url / project_year / studio / copyright / subject / static_layout / animation_principle / anchor / easing / duration / stagger / semantic_mapping / format / visual_strength / production_notes / applicability / anti_patterns / verified`。

这套章节内容是可持续迭代的结构化资料；**本阶段不改写现有 Motion Design Lab 网站**。全部六大章节完成后，再统一建立筛选标签、收藏、评分、预览、源码和提示词等功能。
