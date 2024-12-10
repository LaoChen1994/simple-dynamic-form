import { PropsItemType, SchemaItemType } from "@/component/SchemaItem";

type SchemaItemWithoutDefault = Omit<SchemaItemType, "defaultValue">;

type GetDefaults<
  T extends readonly PropsItemType[],
  K extends Record<string, any> = {}
> = T["length"] extends 0
  ? K
  : T extends readonly [infer P, ...infer Rest]
  ? Rest["length"] extends 0
    ? P extends PropsItemType
      ? P["name"] extends string
        ? K & { [key in P["name"]]: any }
        : never
      : never
    : P extends PropsItemType
    ? P["name"] extends string
      ? Rest extends PropsItemType[]
        ? GetDefaults<Rest, K & { [key in P["name"]]: any }>
        : never
      : never
    : never
  : never;

export interface SchemaItem<T extends PropsItemType[]>
  extends SchemaItemWithoutDefault {
  defaultValue: GetDefaults<T>;
}

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

