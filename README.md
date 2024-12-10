# React Dynamic Form

Based on react-hooks-form & tailwindcss

## Component Schema for Component

```typescript

export type PropsItemType = InputFieldProps | SelectFieldProps | ArrayFieldProps;

export interface SchemaItemType {
    name: string;
    component: string;
    renderComponent?: string;
    props: PropsItemType[];
    defaultValue: unknown;
}

```

## Examples

![](./public/demos.mov)

## Develop

```bash

pnpm i

pnpm dev

```
