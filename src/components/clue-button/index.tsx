import { Button } from '@/ui/button';
import classNames from 'classnames';
import Styles from './index.module.scss';
import type { ICard } from './interface';

const ClueCard = (props: ICard) => {
    const { title, description, label = '了解更多' } = props;

    const handler = async () => {
        switch (props.type) {
            case 'link': {
                const { target } = props;

                location.href = target
                break;
            }

            case 'alert': {
                const { actionContent } = props;
                
                alert(`这次的行动内容是: ${actionContent}`)
                break;
            }
        }
    };

    return (
        <div className={Styles.card}>
            <div className={classNames(Styles.cardContent, { [Styles.onlyTitle]: !description })}>
                <div className={Styles.cardContentTitle}>{title}</div>
                {description ? <p className={Styles.cardDesc}>{description}</p> : null}
            </div>

            <Button
                className={Styles.btn}
                onClick={handler}
            >
                {label}
            </Button>
        </div>

    );
};

export default ClueCard;
export { default as Schema } from './schema'