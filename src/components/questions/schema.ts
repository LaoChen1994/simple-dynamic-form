import type { SchemaItemType } from '@/component/SchemaItem'

const schemas: SchemaItemType  = {
  name: '常见问题',
  component: 'Questions',
  props: [
      {
          name: 'title',
          label: '标题',
          type: 'input',
      },
      {
          name: 'prefix',
          label: '前缀',
          type: 'input',
      },
      {
          name: 'list',
          label: '问题列表',
          type: 'array',
          items: [
              {
                  name: 'title',
                  label: '问题标题',
                  type: 'input',
              },
              {
                  name: 'description',
                  label: '答案',
                  type: 'input',
              },
              {
                  name: 'label',
                  type: 'input',
                  label: '按钮文案',
              },
              {
                  name: 'target',
                  label: '跳转链接',
                  type: 'input',
              },
          ],
      },
  ],
  defaultValue: {
      title: '前端怎么学习',
      prefix: '教练我想写前端',
      list: [
        {
            "title": "如何优化网站的页面加载速度？",
            "label": "我要了解",
            "target": "https://developer.mozilla.org/zh-CN/docs/Learn/Performance/How_do_you_optimize_for_performance",
            "description": "网站的页面加载速度对于用户体验至关重要。优化加载速度可以通过多种方式实现，包括压缩图片、减少HTTP请求、使用浏览器缓存、延迟加载非关键资源等。这些方法可以帮助提升网站的响应速度，减少用户等待时间，提高转化率。"
          },
          {
            "title": "响应式设计在前端开发中的重要性是什么？",
            "label": "我要了解",
            "target": "https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Responsive_Design",
            "description": "响应式设计是指网站能够根据不同设备屏幕尺寸自动调整布局，以提供最佳浏览体验。这种设计可以确保网站在手机、平板、桌面等多种设备上都能正常显示，提升用户体验，增加用户粘性，对于SEO优化也具有积极影响。"
          },
          {
            "title": "如何使用CSS Grid布局来改善网页布局？",
            "label": "我要了解",
            "target": "https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/Grids",
            "description": "CSS Grid布局是一种强大的网页布局系统，它允许开发者在二维空间内创建复杂的布局结构。通过使用Grid布局，可以更灵活地控制元素的位置和大小，实现复杂的设计效果，同时减少对浮动和定位的依赖，简化代码，提高开发效率。"
          }
      ],
  },
}

export default schemas