import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const IdCardIcon = (props: IIconProps) => {
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
                    d="M9.715 12C10.866 12 11.715 11.151 11.715 10C11.715 8.849 10.866 8 9.715 8C8.564 8 7.715 8.849 7.715 10C7.715 11.151 8.563 12 9.715 12Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path
                    d="M20 4H4C2.897 4 2 4.841 2 5.875V18.125C2 19.159 2.897 20 4 20H20C21.103 20 22 19.159 22 18.125V5.875C22 4.841 21.103 4 20 4ZM20 18L4 17.989V6L20 6.011V18Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path
                    d="M14 9H18V11H14V9ZM15 13H18V15H15V13ZM13.43 15.536C13.43 14.162 11.754 12.75 9.715 12.75C7.676 12.75 6 14.162 6 15.536V16H13.43V15.536Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
