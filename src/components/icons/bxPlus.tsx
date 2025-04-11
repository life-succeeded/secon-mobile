import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const PlusIcon = (props: IIconProps) => {
    return (
        <>
            <svg
                width={fallback(props.width, 24)}
                height={fallback(props.height, 24)}
                className={props.className}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
