export const DEFAULT_INPUT =
  '今天有点累，想逃离工位。人在新加坡，只有 2 小时，预算 30 新币，想要安静、有风、适合拍照的地方。';

export const CHIPS = [
  { id: 'sg', label: '📍 新加坡', defaultOn: true },
  { id: 'sh', label: '📍 上海', defaultOn: false },
  { id: 'bj', label: '📍 北京', defaultOn: false },
  { id: '2h', label: '⏱ 2小时', defaultOn: true },
  { id: '4h', label: '⏱ 4小时', defaultOn: false },
  { id: '$low', label: '💰 低预算', defaultOn: false },
  { id: 'photo', label: '📸 适合拍照', defaultOn: true },
  { id: 'quiet', label: '🌿 安静', defaultOn: true },
];

export const SLIDES = [
  {
    id: 1,
    emoji: '🌆',
    title: '城市微冒险',
    subtitle: '用 AI 把你的状态变成一条城市路线',
    desc: '输入你的心情和约束，生成专属都市探索地图',
  },
  {
    id: 2,
    emoji: '✨',
    title: '动态笔记形态',
    subtitle: '每篇笔记都是可交互的 H5 Demo',
    desc: '不只是图文——你的路线可以点击、可以分享、可以复刻',
  },
  {
    id: 3,
    emoji: '🗺️',
    title: '三步生成路线',
    subtitle: '输入状态 → AI 解析 → 路线成图',
    desc: '基于真实地图数据，结合你的时间和预算约束',
  },
  {
    id: 4,
    emoji: '🎨',
    title: '内容创作者工具',
    subtitle: '一键复制创作 Prompt',
    desc: '让其他创作者也能复刻你的内容风格和生成逻辑',
  },
  {
    id: 5,
    emoji: '🤝',
    title: '共创生态',
    subtitle: '读者需求直接影响下一版功能',
    desc: '评论区的需求被采纳后会出现在功能迭代计划中',
  },
];

export const COMMENTS = [
  {
    id: 1,
    avatar: 'M',
    bg: '#a855f7',
    name: 'moonchild_sg',
    text: '这个功能也太懂我了！上周刚好在找新加坡植物园附近的小众咖啡，要是有这个就好了 ☕',
    likes: 42,
  },
  {
    id: 2,
    avatar: 'T',
    bg: '#ec4899',
    name: 'travel.with.tina',
    text: '博主能不能出一个"带娃版"的微冒险？小朋友友好的地点真的太难找了，每次都要刷好久的帖子',
    likes: 87,
  },
  {
    id: 3,
    avatar: 'K',
    bg: '#3b82f6',
    name: 'kopi_lover88',
    text: '如果能加一个"预算模式"就完美了，穷游党需要这个功能！已经截图收藏了，期待正式版 🙏',
    likes: 156,
  },
  {
    id: 4,
    avatar: 'A',
    bg: '#10b981',
    name: 'archi_notes',
    text: '作为一个建筑爱好者，如果能加建筑/设计主题路线就太好了，打卡 brutalist 建筑那种',
    likes: 63,
  },
];

export const NEEDS = [
  { id: 1, name: '带娃友好路线模式', count: 234, hot: true },
  { id: 2, name: '预算穷游模式（<50元）', count: 189, hot: true },
  { id: 3, name: '建筑/设计主题路线', count: 98, hot: false },
  { id: 4, name: '夜间模式（晚上 8 点后）', count: 76, hot: false },
  { id: 5, name: '多人组队版本', count: 54, hot: false },
];

export const CAPABILITY_TAGS = [
  'H5 Demo',
  '小程序原型',
  'AI 内容生成',
  '地图集成',
  '用户共创',
  '数据可视化',
  '多端适配',
  'A/B 测试',
];

export const CREATION_STEPS = [
  {
    step: 1,
    title: '产品定义',
    time: '第 1 周',
    items: ['用户访谈 12 人', '竞品分析 8 款', '确定核心用例'],
  },
  {
    step: 2,
    title: 'AI 方案设计',
    time: '第 2 周',
    items: ['Prompt 工程设计', 'Mock 数据验证', '生成质量评估'],
  },
  {
    step: 3,
    title: 'Demo 开发',
    time: '第 3-4 周',
    items: ['H5 前端实现', '动效与交互', '移动端适配'],
  },
  {
    step: 4,
    title: '用户验证',
    time: '第 5 周',
    items: ['小红书发布', '收集真实反馈', '迭代优先级排序'],
  },
];

export const REPLICATE_PROMPT = `你是一名具有审美能力的城市内容策划，擅长将用户的情绪状态转化为可执行的城市探索路线。

## 你的任务

根据用户输入的"当下状态"，生成一条城市微冒险路线。

## 输入格式

用户会描述：当前城市、可用时间、大致预算、当前情绪/需求

## 输出格式（JSON）

\`\`\`json
{
  "keyword": "3-5字的情绪关键词",
  "energy": 0-100的能量值,
  "decode": {
    "emotion": "解析出的情绪状态",
    "need": "深层需求",
    "constraint": "时间/预算约束"
  },
  "stops": [
    {
      "name": "地点名称",
      "type": "类型（如咖啡馆/公园）",
      "duration": "建议停留时间",
      "why": "为什么推荐这里"
    }
  ],
  "tasks": ["任务1", "任务2", "任务3"],
  "shareText": "适合小红书发布的分享文案（含emoji，100字左右）"
}
\`\`\`

## 约束

- 路线要真实可执行，考虑交通时间
- 情绪关键词要有文学感，不要太直白
- 任务要具体可操作，有仪式感
- 分享文案要符合小红书调性`;

export const MOCK_RESULT = {
  keyword: '低电量逃离中',
  energy: 62,
  decode: {
    emotion: '工作疲惫感，需要短暂抽离',
    need: '安静、有风、视觉刺激少',
    constraint: '2小时内，30新币以内',
  },
  stops: [
    {
      name: '滨海湾花园·云雾林',
      type: '室内花园',
      duration: '45 分钟',
      why: '恒温恒湿，绿色包围，噪音极低，适合低能量状态',
    },
    {
      name: 'Satay by the Bay',
      type: '海边餐饮区',
      duration: '30 分钟',
      why: '开阔海景，有风，可以什么都不想只看海',
    },
    {
      name: '滨海艺术中心外廊',
      type: '建筑散步',
      duration: '20 分钟',
      why: '榴莲造型打卡，傍晚光线好，适合一个人发呆',
    },
  ],
  tasks: [
    '找一片叶子或花，拍一张微距照片',
    '在海边站 5 分钟，什么都不做',
    '买一杯冷饮，慢慢走完剩余路程',
  ],
  shareText:
    '低电量的下午，给自己安排了一场说走就走的两小时充电。🌿 云雾林的水汽、海湾的风、还有那杯冷掉的椰子水——原来逃离不需要太远，只需要换一个空气。#新加坡 #城市微冒险 #低电量生活 #下班后的城市',
};
