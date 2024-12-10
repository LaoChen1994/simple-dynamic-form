import { useFieldArray, useFormContext } from 'react-hook-form';
import SchemaItem, { type BaseItemProps, type PropsItemType } from '../SchemaItem';
import { Button } from '@/ui/button';
import { FormField, FormItem, FormLabel } from '@/ui/form';
import { Cross2Icon } from '@radix-ui/react-icons';

export interface ArrayFieldProps extends BaseItemProps {
    type: 'array';
    items: PropsItemType[];
}

const ArrayField = (props: ArrayFieldProps) => {
    const form = useFormContext();
    const { items, name, label, prefixKey = '' } = props;

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name,
    });

    return (
        <FormField
            control={form.control}
            name={`${prefixKey}${name}`}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <div>
                        {fields.map((field, index) => (
                            <div
                                key={field.id}
                                className="mb-2 border-dashed border border-gray-300 rounded-lg p-4 relative"
                            >
                                {items.map((item) => (
                                    <SchemaItem
                                        key={item.name}
                                        {...item}
                                        prefixKey={`${name}.${index}.`}
                                    />
                                ))}

                                <Button
                                    type='button'
                                    variant="ghost"
                                    className="absolute top-4 right-4 size-4 p-0 text-base font-semibold text-red-500"
                                    onClick={() => remove(index)}
                                >
                                    <Cross2Icon />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={() => append({})}
                    >
                        添加
                    </Button>
                </FormItem>
            )}
        />
    );
};

export default ArrayField;
