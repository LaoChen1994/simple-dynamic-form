import React, { useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import ArrayField, { type ArrayFieldProps } from '../SchemaArrayField';
import InputField, { type InputFieldProps } from '../SchemaInput';
import SelectField, { type SelectFieldProps } from '../SchemaSelect';

interface ConditionItem {
    fieldName: string;
    filedValue: any;
}

export interface BaseItemProps {
    name: string;
    label: string;
    prefixKey?: string;
    condition?: {
        anyOf?: ConditionItem[];
        allOf?: ConditionItem[];
    };
}

export type PropsItemType = InputFieldProps | SelectFieldProps | ArrayFieldProps;

export interface SchemaItemType {
    name: string;
    component: string;
    props: PropsItemType[];
    defaultValue: unknown;
}

const Components: Record<PropsItemType['type'], React.FC<any>> = {
    input: InputField,
    select: SelectField,
    array: ArrayField,
};

const SchemaItem = (props: PropsItemType) => {
    const { type, condition } = props;
    const form = useFormContext();

    const formData = useWatch({
        control: form.control,
    });

    const isShow = useMemo(() => {
        if (!condition) { return true; }

        const { anyOf, allOf } = condition;

        if (anyOf && allOf) {
            // eslint-disable-next-line no-console
            console.error('schema both anyOf and allOf are set');
        }

        if (allOf) {
            return (allOf || []).reduce((p, c) => {
                return p && formData[c.fieldName] === c.filedValue;
            }, true);
        }

        return (anyOf || []).reduce((p, c) => {
            return p || formData[c.fieldName] === c.filedValue;
        }, false);
    }, [condition, formData]);

    const Component = useMemo(() => {
        return Components[type];
    }, [type]);

    if (!isShow || !Component) { return null; }

    return <Component {...props} />;
};

export default SchemaItem;
