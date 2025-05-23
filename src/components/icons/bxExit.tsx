import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const ExitIcon = (props: IIconProps) => {
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
                    d="M19.002 3H5.002C3.899 3 3.002 3.897 3.002 5V9H5.002V5H19.002V19H5.002V15H3.002V19C3.002 20.103 3.899 21 5.002 21H19.002C20.105 21 21.002 20.103 21.002 19V5C21.002 3.897 20.104 3 19.002 3Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path
                    d="M11 16L16 12L11 8V11.001H3V13.001H11V16Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
