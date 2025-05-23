import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const TimeIcon = (props: IIconProps) => {
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
                    d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path
                    d="M13 7H11V12.414L14.293 15.707L15.707 14.293L13 11.586V7Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
