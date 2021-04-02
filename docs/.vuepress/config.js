module.exports = {
  title: 'dongxiongle',
  head: [
    ['link', { rel: 'icon', href: '/img/favicon.ico'}]
  ],
  dest: 'public',
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    sidebarDepth: 4, // 同时提取markdown中h2和h3标题，显示在侧边栏上
    lastUpdated: 'Last Updated', // 文档更新时间： 每个文件git最后提交时间
    repo: 'https://github.com/dongxiongle/dongxiongle.github.io.git',
    repoLabel: 'github',
    // 顶部导航栏
    nav: [
      { text: 'css', link: '/CSS/' },
      {
        text: '数据结构与算法',
        items: [
          {text: '数据结构', link: '/dataStructure/'},
          {text: '算法', link: '/algorithm/'}
        ]
      }
    ],
    sidebar: {
      '/CSS/': [
        ['/CSS/singleBorder', '单边框'],
        '/CSS/水平垂直居中'
      ],
      '/react': [
        ['/react/init', '搭建react+ts+webpack项目'],
        ['/react/hooks', 'react hooks']
      ],
      '/algorithm/': [
        ['/algorithm/排序算法', '排序算法']
      ]
    }
  }
}