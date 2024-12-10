import { PropsItemType, SchemaItemType } from "@/component/SchemaItem";

import { type SelectFieldProps } from "@/component/SchemaSelect";
import { type ArrayFieldProps } from "@/component/SchemaArrayField";

type SchemaItemWithoutDefault = Omit<SchemaItemType, "defaultValue">;

type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string, any>
    ? DeepReadonly<T[K]>
    : T[K];
};

// @fixme fix type readonly conflict problems
type ParseValue<T extends DeepReadonly<PropsItemType>> =
  T["type"] extends "input"
    ? string
    : T["type"] extends "select"
    ? T extends DeepReadonly<SelectFieldProps>
      ? T["options"][number]["value"]
      : never
    : T extends DeepReadonly<ArrayFieldProps>
    ? T["items"] extends infer P
      ? P extends Readonly<PropsItemType[]>
        ? GetDefaults<Readonly<P>>[]
        : P
      : never
    : never;

type Values<T, K extends Record<string, any>> = T extends PropsItemType
  ? T["name"] extends string
    ? K & { [key in T["name"]]: ParseValue<T> }
    : never
  : never;

type GetDefaults<
  T extends readonly PropsItemType[],
  K extends Record<string, any> = {}
> = T["length"] extends 0
  ? K
  : T extends readonly [infer P, ...infer Rest]
  ? Rest["length"] extends 0
    ? Values<P, K>
    : Rest extends PropsItemType[]
    ? GetDefaults<Rest, K & Values<P, K>>
    : 1
  : 2;

export interface SchemaItem<T extends PropsItemType[]>
  extends SchemaItemWithoutDefault {
  defaultValue: GetDefaults<T>;
}

/**
 * 
 * 
 * 处理schema的工厂方法
 * @param name 
 * @param component 
 * @param props 
 * @param defaultValue 
 * @returns 
 */
export function createSchemaItem<T extends PropsItemType[]>(
  name: string,
  component: string,
  props: T,
  defaultValue: GetDefaults<T>
): SchemaItem<T> {
  return {
    name,
    component,
    props,
    defaultValue,
  };
}

// const schemas = createSchemaItem(
//   '线索卡片',
//   'ClueCard',
//   [
//     {
//         name: 'title',
//         type: 'input',
//         label: '标题',
//     },
//     {
//         name: 'description',
//         type: 'input',
//         label: '描述',
//     },
//   ] as const,
//   {
//     title: '123',
//     description: '123'    
//   }
// )
