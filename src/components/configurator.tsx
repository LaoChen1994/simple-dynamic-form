import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@/ui/sheet';

import { useForm } from 'react-hook-form';
import { Button } from '@/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { type SchemaItemType } from '@/component/SchemaItem';
import SchemaForm from '@/component/SchemaForm'

interface ConfirmProps {
    component: string;
    props: Record<string, any>
}

export interface ConfiguratorProps {
    open: boolean;
    handleConfirm?: (value: ConfirmProps) => void;
    handleClose?: () => void;
    schemas: SchemaItemType[];
}

const Configurator = (props: ConfiguratorProps) => {
    const form = useForm<Record<string, any>>();

    const [step, setStep] = useState(1);
    const [selectComponent, setSelectComponent] = useState<string | undefined>(undefined);

    const handleReset = () => {
        setStep(1);
        setSelectComponent(undefined);
        form.reset({});
    }

    const handleClose = (opened?: boolean) => {
        if (!opened) {
            props.handleClose && props.handleClose()
            handleReset();
        }
    };

    const handleConfirm = () => {
        if (!selectComponent) {
            toast.error('请选择要添加的组件');
            return;
        }

        props.handleConfirm && props.handleConfirm({
            component: selectComponent,
            props: form.getValues(),
        })

        handleClose()
    };

    useEffect(() => {
        if (props.open) {
            handleReset()
        }
    }, [props.open]);

    const handleSelectComponent = (component: string) => () => {
        setSelectComponent(component);
        setStep(2);
    };

    const componentSchema = useMemo(() => {
        const { schemas } = props;

        if (!selectComponent || !schemas || !schemas.length) { return []; }

        const matchSchema = schemas.find((item) => item.component === selectComponent);

        return matchSchema?.props || [];
    }, [props.schemas, selectComponent]);

    const handleImportConfig = () => {
        if (!selectComponent) { return; }

        const matchSchema = props.schemas.find((item) => item.component === selectComponent);

        if (matchSchema) {
            form.reset(matchSchema.defaultValue || {});
        }
    };

    return (
        <Sheet
            open={props.open}
            onOpenChange={handleClose}
        >
            <SheetContent className="bg-white">
                <SheetHeader>
                    <SheetTitle>
                        添加组件
                    </SheetTitle>
                </SheetHeader>

                <div
                    className="w-full overflow-y-auto px-0.5"
                    style={{
                        height: 'calc(100% - 24px - 69px)',
                    }}
                >
                    {step === 1 ? (
                        <div className="flex flex-wrap mt-4 grid grid-cols-3 gap-2">
                            {
                                (props.schemas || []).map((item) => (
                                    <Button
                                        onClick={handleSelectComponent(item.component)}
                                        key={item.component}
                                        variant="outline"
                                    >
                                        {item.name}
                                    </Button>
                                ))
                            }
                        </div>
                    ) : null}

                    <SchemaForm form={form} componentSchema={componentSchema} />
                </div>

                {selectComponent && step === 2
                    ? (
                        <SheetFooter className='absolute bottom-0 left-0 w-full p-4 border-t'>
                            <Button onClick={handleReset}>返回上一步</Button>
                            <Button variant="outline" onClick={handleImportConfig}>
                                导入默认配置
                            </Button>
                            <Button type='submit' onClick={form.handleSubmit(handleConfirm)}>确定</Button>
                        </SheetFooter>
                    )
                    : null
                }
            </SheetContent>
        </Sheet>
    );
};

export default Configurator;
