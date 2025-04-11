import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const FileIcon = (props: IIconProps) => {
    return (
        <>
            <svg
                width={fallback(props.width, 16)}
                height={fallback(props.height, 20)}
                className={props.className}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15.903 6.586C15.8556 6.47747 15.7892 6.37825 15.707 6.293L9.707 0.293C9.62175 0.210782 9.52253 0.144411 9.414 0.0969999C9.384 0.0829999 9.352 0.0749999 9.32 0.0639999C9.23633 0.0355262 9.14922 0.0183742 9.061 0.013C9.04 0.011 9.021 0 9 0H2C0.897 0 0 0.897 0 2V18C0 19.103 0.897 20 2 20H14C15.103 20 16 19.103 16 18V7C16 6.979 15.989 6.96 15.987 6.938C15.9821 6.84972 15.9649 6.76255 15.936 6.679C15.926 6.647 15.917 6.616 15.903 6.586ZM12.586 6H10V3.414L12.586 6ZM2 18V2H8V7C8 7.26522 8.10536 7.51957 8.29289 7.70711C8.48043 7.89464 8.73478 8 9 8H14L14.002 18H2Z"
                    fill={fallback(props.fill, 'black')}
                />
                <path
                    d="M4 10H12V12H4V10ZM4 14H12V16H4V14ZM4 6H6V8H4V6Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
