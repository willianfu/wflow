module.exports = {
  title: 'wflow文档',
  description: 'wflow工作流',
  base: '/wflow/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  //theme: 'reco',
  themeConfig: {
   // codeTheme: 'tomorrow',
    sidebarDepth: 4,
    logo: '/logo.png',
    //repo: 'willianfu/wlink-iot',
    docsDir: 'docs',
    editLinks: false,
    //editLinkText: '在 Github 上帮助我们编辑此页',
    nav: [
      {text: '指南', link: '/'},
      {text: '码云gitee', link: 'https://gitee.com/willianfu/jw-workflow-engine'},
      {text: '💰订阅 pro 版', link: '/pro/index'},
      {text: 'wflow在线演示', link: 'http:/47.100.202.245:83'},
    ],
    lastUpdated: '最近更新',
    sidebar: [
      {
        title: '🚀 快速入门',
        collapsable: false,
        children: [
          '/start/quickStart'
        ]
      },
      {
        title: '✍ 开发',
        collapsable: false,
        children: [
          '/dev/project',
          '/dev/form',
          '/dev/process',
          '/dev/server',
          '/dev/update'
        ]
      },
      {
        title: '❓ FAQ',
        collapsable: false,
        children: [
          //'/other/upgrade', '/other/community'
        ]
      }
    ],
    nextLinks: true,
    prevLinks: true,
  },
  plugins: ['@vuepress/back-to-top', require('./plugins/alert')],
  markdown: {
    lineNumbers: true
  }
}
