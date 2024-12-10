interface IBaseProps {
    title: string;
    description?: string;
    label?: string;
}


export interface ILinkCardType extends IBaseProps {
    type: 'link';
    target: string;
}

export interface IAlertType extends IBaseProps {
    type: 'alert';
    // m2l配置项key
    actionContent: string;
}

export type ICard = ILinkCardType | IAlertType;
