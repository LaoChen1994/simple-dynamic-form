import { Form } from '@/ui/form';
import { UseFormReturn } from 'react-hook-form'
import SchemaItem, { type SchemaItemType } from '../SchemaItem'

interface SchemaFormProps<T extends Record<string, any>> {
    form: UseFormReturn<T>
    componentSchema: SchemaItemType['props'];
}

const SchemaForm = <T extends Record<string, any>>(props: SchemaFormProps<T>) => {
    const { form, componentSchema } = props;

    return (
        <Form {...form}>
            <form>
                {
                    componentSchema.map((item) => (
                        <SchemaItem key={item.name} {...item} />
                    ))
                }
            </form>
        </Form>
    )
}
export default SchemaForm