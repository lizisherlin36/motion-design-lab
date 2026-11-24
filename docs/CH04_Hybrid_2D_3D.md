# MOTION DESIGN LAB · CH04

> Hybrid 2D / 3D Motion｜二维与三维融合动效
>
> 系列参考库 · 2026-11-20 · CH04 独立教学章节（尚未并入主站）

## 00 / 本章定位

上一章 CH02 研究模块如何运动，CH03 研究信息与数据如何被准确揭示。CH04 研究 **三维物体与二维信息如何共享一套动态排版与空间叙事规则**。

强调三层结构：

1. **World Space：** 真实三维模型、装配层级、部件坐标与相机路径。
2. **Projected Anchors：** 三维目标每帧经过 `camera.project()` 映射成屏幕坐标，领线端点与 3D 部件保持绑定。
3. **Screen Space：** 字体、标题、表格、图例、字幕在稳定的 2D 网格中排布，而不受三维相机的透视变形影响。

混合不是“在 3D 产品外圈堆几个科技 HUD”；它是一种分工：3D 负责解释空间，2D 负责解释意义，转场负责建立连续性。

### 视觉参考：沿用 TRA / PRA

- TRA · `#242626` 深灰 + `#D9FA39` 酸性黄绿 + `#FF6500` 安全橙 + 柔灰绿金属。
- PRA · `#073AEF` 电蓝 + `#F8FF00` 荧光黄 + 白 + 黑。
- 屏幕基线稳定、超大无衬线标题、精密小字、横向标注、一致的编号规则；不要泛滥辉光粒子、蓝色全息 UI。
- 标准 1920×1080 / 30fps，二维安全边距建议 6%，默认 12 列网格；竖版需要重新设计构图而不是直接等比裁切。

## 01 / 真实作品参考与学习要点

| 项目 / 权威资料 | 来源 | 观察重点 |
|---|---|---|
| Ordinary Folk — School of Motion Manifesto | https://www.ordinaryfolk.co/project/school-of-motion-manifesto | 线条与简单图形逐步发展成三维空间，如何组织层次升级 |
| Ordinary Folk — Introducing Spline | https://www.ordinaryfolk.co/project/introducing-spline | 几何产品、相机与品牌图形的一致动效语言 |
| nanoCAD — Explainer Video | https://www.behance.net/gallery/200966687/nanoCAD-Explainer-video | 工业软件主角与辅助图形的美术比例；注意作品为作者发布内容 |
| Autodesk — Animate assembly/service instruction | https://www.autodesk.com/learn/ondemand/module/animate-assembly-or-service-instruction-in-autodesk-inventor/unit/7udcwWU2iXiIiGUycaBmC9 | 分离方向、部件身份与装配层级，真正技术说明先建立准确装配关系 |
| Three.js — OrthographicCamera | https://threejs.org/docs/pages/OrthographicCamera.html | 同样尺寸物体在正交投影中不受远近影响 |
| Three.js — CSS2DRenderer | https://threejs.org/docs/pages/CSS2DRenderer.html | 将二维 HTML 标注附着三维对象；需自建遮挡/碰撞/越界规则 |
| Blender — Grease Pencil | https://docs.blender.org/manual/en/4.5/grease_pencil/animation/introduction.html | 将手绘/2D 图形融入三维摄影机空间 |

**注意：** 以上是公开作品与制作规范的延伸参考。CH04 的 12 项交互演示为自行制作的教学性概念，不是对这些真实作品的逐镜复刻。

## 02 / 十二种技法

| ID | Technique | 用途 | 主时间建议 | 关键约束 |
|---|---|---|---|---|
| H401 | Orthographic Editorial | 严谨技术展示、工程风格视图 | 0.7–1.2s | 正交视图不应被误认为实车尺寸证据 |
| H402 | Controlled Orbit | 解释隐藏侧面与相对空间关系 | 1.2–2.4s | 相机绕主体稳定轴转动；禁止无目的自转 |
| H403 | Depth-Layer Parallax | 层次感与深度信息 | 0.8–1.6s | 三个深度层各自有合理的运动速度 |
| H404 | Exploded Assembly | 产品结构与装配说明 | 1.2–2.5s | 零件沿可解释的拆装方向分离 |
| H405 | Cutaway & X-Ray Reveal | 内部结构讲解 | 0.8–1.5s | 只有已确认真实存在的结构才能当作证据 |
| H406 | Surface-to-Wireframe | 真实外观过渡到结构分析 | 0.6–1.1s | 实体与线框来自同一几何顶点集 |
| H407 | World-Anchored Labels | 三维定位点对应二维解释 | 0.5–1.1s | 实时跟踪、遮挡判断、标签避让 |
| H408 | Projection-Matched Graphics | 平面图形贴合三维结构 | 0.6–1.2s | 2D 面片匹配真实投影，非悬浮 HUD |
| H409 | 3D-to-Infographic Match Cut | 将产品构件转换为可比较数据结构 | 0.7–1.4s | 锚点与颜色持续；数值必须有来源 |
| H410 | Material-State Transition | 外观/材质/工艺切换 | 0.7–1.3s | 明确为何换材质；不要盲目发光 |
| H411 | Spatial Editorial Split | 产品与图表/规格并置 | 0.8–1.5s | 左右屏幕分工、避免文字重叠主体 |
| H412 | Technical-to-Cinematic Transition | 技术讲解切换到产品英雄画面 | 1.2–2.5s | 相机连续、对象方向保持、真实模型不改变拓扑 |

> 推荐学习顺序：H401 → H407 → H402 → H404 → H405 → H409 → H411 → H412。

## 03 / Camera Motion：镜头运动不是“转起来”

### 正交与透视

- **Orthographic（正交）：** 展示结构与相对尺寸时对比清晰。注意 **正交投影并不自动等于严格工程正视/侧视**；真正侧视需要锁定相机位置、方向与对象的参照轴。
- **Perspective（透视）：** 更自然地表达空间深度、产品体积和镜头进入感。
- **切换摄影机：** 不是剪辑跳切。需要在相同对象中心、相似屏幕占比和一致运动方向之间匹配；若要做真正插值，需自定义投影或混合两个镜头画面。

### 参考起点（非硬性规范）

| 场景 | 镜头角度变化 | 时长 | 备注 |
|---|---:|---:|---|
| 技术展示 | 0–15° | 0.6–1.2s | 锁定目标点，避免文字随相机转动 |
| 产品结构 | 35–65° | 1.2–2.4s | 保持对象完整、背景稳定 |
| 零件分解 | 0–18° | 1.4–2.6s | 摄影机运动应弱于零件分离运动 |
| 英雄镜头 | 20–50° | 1.5–3.0s | 注意反光与材质变化的连续性 |

**精确工程正视图附加 QC：** 摄影机固定在车辆正前/正后/正侧的主轴线上，正交投影，无随意俯仰、侧倾或车体旋转；对齐地面线、车轮直径和车长/轴距。此前 RALLY 与 GT3 项目里多次出现的变形风险，在这个流程里要明确禁止。

## 04 / World-Anchor + 2D Label 的完整技术合同

### 推荐对象数据模型

```json
{
  "object_id": "battery_pack",
  "world_anchor": [0.0, 0.8, 0.1],
  "label": "ENERGY MODULE",
  "label_space": "screen",
  "leader_start": "project(world_anchor, camera)",
  "visible_when": "in_frustum_and_not_occluded",
  "screen_safe_margin": 0.06,
  "collision_strategy": "reflow_label_columns",
  "readable_hold_seconds": 1.5
}
```

生产版 Three.js 流程：

1. 从部件自身坐标经 `localToWorld()` 获取当前世界锚点。
2. 每帧将点投影到 NDC：`worldPoint.clone().project(camera)`，转换为屏幕坐标。
3. 判断目标点是否处于视椎体，并根据实际需要做遮挡测试（raycast、深度缓冲或自定义判定）。**`CSS2DRenderer` 并不会自动解决复杂的物体遮挡与标签碰撞**。
4. 在屏幕安全边距内安排标签，并让领线末端对准对应投影点。
5. 摄影机运动期间，优先降低说明文字数量；停下来以后再分步揭示全部标签。

### 标签排版建议

- 1920×1080 画面中主要信息标签 24–32px 起，根据实际平台预览；极小字仅供装饰不是核心结论。
- 线条 1–2px，尽量水平/垂直折线；锚点圆点、零件编号、标签形成统一系统。
- 避免所有标签都放在 3D 主体上方；优先使用分栏外侧留白区。
- 重要说明 **最少 1.5s 完整停留**，同时考虑解说时间与字幕占位。

## 05 / EP: 汽车技术影像 12 秒训练卡（360 帧 @30fps）

**主题：** 《电动平台，三层结构》。演示仅为概念工业设计，真实车型需要经授权或可合法使用的 GLB/CAD 资产，以及可靠的结构资料。

| 时间 | 帧 | 画面设计 | 技法 |
|---|---:|---|---|
| 0.0–1.0s | 0–29 | 背景栅格与大标题建立，电动平台固定正交视角 | H401 + CH01 KT01 |
| 1.0–2.3s | 30–68 | 镜头受控环绕约 35°，展示整体构成 | H402 |
| 2.3–4.2s | 69–125 | 摄影机稳定，电池、电控、动力模块分离到说明位置 | H404 |
| 4.2–5.9s | 126–176 | 真实三维部件锚点投影为二维技术标注；保持阅读 | H407 |
| 5.9–7.2s | 177–215 | 外观转入半透明观察状态，内层模块显现 | H405 |
| 7.2–8.5s | 216–254 | 主体退到左侧，右侧出现配置信息框架 | H411 |
| 8.5–10.0s | 255–299 | 3D 模块的颜色与几何延展为图解/可比信息卡，数据不得伪造 | H409 + CH03 DM01 |
| 10.0–12.0s | 300–359 | 结构重归位，转为克制的产品英雄画面并保持 | H412 |

### 主次动作规则

- 单个镜头中优先只有一个主要运动主体：**相机运动、零件运动、图表重排三选一**；最多一个辅助运动。
- 3D 主体与 2D 标签不要同一时刻进行大幅度移动。
- 内容来自真实 CAD 时，不得因为提高视觉冲击而改变装配关系、轮毂、车长或零件形状。
- 使用的音轨、旁白、BGM 与片段结构应独立可编辑；当前纯教学 Demo 不包括声音。

## 06 / Codex 母提示词

```text
你是 Motion Art Director、Technical Visualization Designer 和 Three.js / Remotion 实现工程师。

任务：创建 12 秒 Hybrid 2D / 3D Motion 技术短片。
输入：用户指定的可合法使用的 GLB/CAD 或 Blender 源文件；如素材不足，先明确列出缺失项，使用“概念示意”代替，不得假装真实机械数据。
画幅：1920×1080，30fps，设计网格 12 columns，safe area 6%。
美术：TRA Industrial Signal；深灰 + 酸性黄绿 + 少量安全橙；现代无衬线字、精密细线、克制信息层级、真实产品体积阴影；禁止廉价科幻 HUD 与过度辉光。
场景结构：world scene、camera rig、screen typography、world anchors、annotation layout、data layer 五套系统分离。
镜头语言：先 H401 工程构图，再 H402 有目的的环绕，再 H404 真实部件分解，H407 屏幕锚点标签，H405 结构揭示，再 H409 进入信息图，最后 H412 产品英雄镜头。阅读区间按旁白预留。
图层行为：3D 物件可转动并拥有真实遮挡；二维标题保持水平；标签领线起点每帧投影而非手动随便绘制；需要响应式安全区和碰撞避让。
交付：在制作完整动效前先输出 3 张 style frames、资产清单、相机与锚点坐标、12s 时间轴、每个镜头的关键帧。随后交付 Three.js / Remotion 可编辑工程、无字幕版与字幕版、关键帧 PNG、QC 报告。
硬性禁止：伪造尺寸、车身变形、轮毂错位、错误装配顺序、未经来源确认的数值、突然换模型、持续转圈、文字跟随相机发生透视扭曲。
```

### Engineering Export Contract

```yaml
chapter: CH04
canvas: 1920x1080
fps: 30
duration: 12s
grid_columns: 12
safe_area: 6%
visual_system: TRA
world_layer: editable_3d
annotation_layer: editable_screen_2d
camera_orbit: max_65_deg_for_technical_shots
motion: one_primary_plus_one_secondary
mesh_identity: preserved
world_anchors: per_frame_projection
reading_hold: at_least_1.5s
camera_and_mesh_export: required
styleframes: [intro, assembly, final]
outputs: [mp4, remotion_source, editable_3d_asset, qc_report]
```

## 07 / QC 评分表

| 指标 | 权重 | 通过标准 |
|---|---:|---|
| 三维资产与工程忠实性 | 30 | 真实车型不变形；零件身份与结构可核实 |
| 2D / 3D 空间关系 | 20 | 相机、投影锚点、遮挡/版式一致 |
| 摄影机运动与构图 | 15 | 运动有目的、无穿模、无镜头丢失主体 |
| 动态文字与信息层级 | 15 | 字级、可读时间、留白和安全区合理 |
| 美术与材质 | 10 | 真实体积与克制配色；无廉价光效 |
| 工程与输出 | 10 | 源码可改、帧渲染稳定、横竖比例可重排 |

建议达 85/100 才进入正式成片。真实性错误、严重几何扭曲、虚构数据直接不通过，无论总分多高。

## 08 / 教学原型的边界

- 交互 HTML 使用自写的 Canvas 2D 软件三维投影、盒体与圆柱等程序化几何，**不是 Three.js / Blender 的完整三维工程**，但它确实执行了 3D 坐标投影和相机运动。
- `H405` 为半透明结构教学示意，并没有实现真正的布尔剖切、实体壁厚或物理光线追踪。
- `H408` 为 3D 四角投影匹配的图形示意，不包含真实贴图的 UV / 透视纹理映射流程。
- `H412` 为摄像机角度与产品外观状态的教学过渡；实际“正交↔透视”完整连续切换需针对渲染引擎设计严谨的投影过渡/双相机合成。
- 所有模型和数值均为 **原创概念示意**。不可视为车辆、底盘、马达和电池真实机械结构。
- 网站集成计划：六章完成后汇总 `ch01..ch06_catalog.json`，重建跨章节搜索/收藏/参数预设与 Codex Prompt 链接。
