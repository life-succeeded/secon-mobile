import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const ImageIcon = (props: IIconProps) => {
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
                    d="M19 3H5C3.897 3 3 3.897 3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V5C21 3.897 20.103 3 19 3ZM5 19V5H19L19.002 19H5Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path d="M10 14L9 13L6 17H18L13 10L10 14Z" fill={fallback(props.fill, 'black')} />
            </svg>
        </>
    )
}
