import { fallback } from '../../utils/helpers'
import { IIconProps } from './types'

export const MapIcon = (props: IIconProps) => {
    return (
        <>
            <svg
                width={fallback(props.width, 20)}
                height={fallback(props.height, 18)}
                className={props.className}
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19.447 3.105L13.447 0.104999C13.3081 0.0354782 13.1549 -0.000717163 12.9995 -0.000717163C12.8441 -0.000717163 12.6909 0.0354782 12.552 0.104999L7 2.882L1.447 0.104999C1.2945 0.0287961 1.12506 -0.00715621 0.954757 0.000556707C0.784455 0.00826962 0.618953 0.0593916 0.473969 0.149067C0.328985 0.238743 0.209334 0.363994 0.126379 0.512926C0.0434244 0.661857 -7.93497e-05 0.829523 1.08651e-07 0.999999V14C1.08651e-07 14.379 0.214 14.725 0.553 14.895L6.553 17.895C6.69193 17.9645 6.84515 18.0007 7.0005 18.0007C7.15585 18.0007 7.30907 17.9645 7.448 17.895L13 15.118L18.553 17.894C18.7051 17.9709 18.8744 18.0074 19.0446 17.9998C19.2149 17.9923 19.3803 17.9411 19.525 17.851C19.82 17.668 20 17.347 20 17V4C20 3.621 19.786 3.275 19.447 3.105ZM8 4.618L12 2.618V13.382L8 15.382V4.618ZM2 2.618L6 4.618V15.382L2 13.382V2.618ZM18 15.382L14 13.382V2.618L18 4.618V15.382Z"
                    fill={fallback(props.fill, 'black')}
                />
            </svg>
        </>
    )
}
