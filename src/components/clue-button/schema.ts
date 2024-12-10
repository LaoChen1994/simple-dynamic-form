import type { SchemaItemType } from '@/component/SchemaItem';

const schemas: SchemaItemType = {
  name: '线索卡片',
  component: 'ClueButton',
  renderComponent: 'ClueCard',
  props: [
      {
          name: 'title',
          type: 'input',
          label: '标题',
      },
      {
          name: 'description',
          type: 'input',
          label: '描述',
      },
      {
          name: 'label',
          type: 'input',
          label: '按钮文案',
      },
      {
          name: 'type',
          type: 'select',
          label: '点击行为',
          options: [
              {
                  label: '弹框',
                  value: 'alert',
              },
              {
                  label: '链接',
                  value: 'link',
              },
          ],
      },
      {
          name: 'target',
          type: 'input',
          label: '链接地址',
          condition: {
              anyOf: [
                  {
                      fieldName: 'type',
                      filedValue: 'link',
                  },
              ],
          },
      },
      {
        name: 'actionContent',
        type: 'input',
        label: '行动点文案',
        condition: {
            anyOf: [
                {
                    fieldName: 'type',
                    filedValue: 'alert'
                }
            ]
        }
      }
  ],
  defaultValue: {
      title: '我是按钮卡片',
      label: '点击跳转',
      type: 'link',
      target: "https://www.baidu.com"
  },
}

export default schemas