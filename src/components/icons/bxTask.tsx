import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const TaskIcon = (props: IIconProps) => {
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
                    d="M5 22H19C20.103 22 21 21.103 21 20V5C21 3.897 20.103 3 19 3H17C17 2.73478 16.8946 2.48043 16.7071 2.29289C16.5196 2.10536 16.2652 2 16 2H8C7.73478 2 7.48043 2.10536 7.29289 2.29289C7.10536 2.48043 7 2.73478 7 3H5C3.897 3 3 3.897 3 5V20C3 21.103 3.897 22 5 22ZM5 5H7V7H17V5H19V20H5V5Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path
                    d="M11 13.586L9.207 11.793L7.793 13.207L11 16.414L16.207 11.207L14.793 9.793L11 13.586Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
