import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const ArrowIcon = (props: IIconProps) => {
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
                    d="M21 11H6.414L11.707 5.707L10.293 4.293L2.586 12L10.293 19.707L11.707 18.293L6.414 13H21V11Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
