import { FormControl, FormField, FormItem, FormLabel } from '@/ui/form';
import type { BaseItemProps } from '../SchemaItem';
import { Input } from '@/ui/input';
import { useFormContext } from 'react-hook-form';

export interface InputFieldProps extends BaseItemProps {
    type: 'input';
}

const InputField = (props: InputFieldProps) => {
    const { prefixKey = '', ...item } = props;
    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={`${prefixKey}${item.name}`}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl accessKey={field.name}>
                        <Input
                            className="w-full border rounded-md px-2 py-1"
                            {...field}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default InputField;
