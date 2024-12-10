import classNames from 'classnames';
import { useMemo, useState } from 'react';
import Styles from './index.module.scss';

interface IQuestionItem {
    title: string;
    description: string;
    label?: string;
    target?: string;
    initCollapsed?: boolean;
}

interface IProps {
    title: string;
    prefix: string;

    list: IQuestionItem[];
}

const QuestionItem = (props: IQuestionItem) => {
    const { title, description, label = '了解更多', target, initCollapsed = false } = props;
    const [collapsed, setCollapsed] = useState(initCollapsed);

    const linkNode = useMemo(() => {
        if (!target) {
            return null;
        }

        return <a href={target} target="_blank">{label}</a>;
    }, [label, target]);

    const handleClick = () => {
        setCollapsed((collapsed) => !collapsed);
    };

    return (
        <div className={classNames(Styles.collapse, { [Styles.opened]: collapsed })} onClick={handleClick}>
            <div className={Styles.collapseContent}>
                <div className={Styles.collapseTitle}>{title}</div>
                <div className={Styles.collapseAnswer}>
                    {description} {linkNode}
                </div>
            </div>
            <div className={Styles.icon}>
                {collapsed ? '-' : '+'}
            </div>
        </div>
    );
};

const Questions = (props: IProps) => {
    const { title, prefix, list } = props;

    return (
        <div className={Styles.wrap}>
            <div className={Styles.prefix}>{prefix}</div>
            <div className={Styles.title}>{title}</div>
            <div className={Styles.questionList}>
                {list.map((item, i) => <QuestionItem key={item.title} {...item} initCollapsed={i === 0} />)}
            </div>
        </div>
    );
};

export default Questions;

export { default as Schema } from './schema.ts'
