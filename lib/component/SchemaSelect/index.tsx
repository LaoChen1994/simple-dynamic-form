import { FormControl, FormField, FormItem, FormLabel } from '@/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

import type { BaseItemProps } from '../SchemaItem';
import { useFormContext } from 'react-hook-form';

export interface SelectFieldProps extends BaseItemProps {
    type: 'select';
    options: {
        label: string;
        value: string;
    }[];
}

const SelectField = (props: SelectFieldProps) => {
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
                        <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="请选择" />
                            </SelectTrigger>

                            <SelectContent className='bg-white'>
                                {
                                    item.options.map((item) => (
                                        <SelectItem
                                            value={item.value}
                                            key={item.value}
                                        >
                                            {item.label}
                                        </SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default SelectField;
