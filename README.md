# React Dynamic Form

Based on react-hooks-form & tailwindcss

## Component Schema for Component

```typescript

export type PropsItemType = InputFieldProps | SelectFieldProps | ArrayFieldProps;

export interface SchemaItemType {
    name: string;
    component: string;
    props: PropsItemType[];
    defaultValue: unknown;
}

```

## Examples

![](./public/demos.gif)

## Develop

```bash

pnpm i

pnpm dev

```
