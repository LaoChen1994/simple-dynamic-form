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

<video width="640" height="320" controls>
  <source src="./public/demos.mov" type="video/mp4">
</video>
