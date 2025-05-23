export type TIconVariant =
    | 'heart'
    | 'arrow'
    | 'fileBlank'
    | 'task'
    | 'map'
    | 'plus'
    | 'file'
    | 'exit'
    | 'image'
    | 'time'
    | 'user'
    | 'phone'
    | 'idCard' | 'magic'

export interface IIconProps {
    className?: string
    width?: number
    height?: number
    fill?: string
}

export interface IIconParams {
    fill?: string
    width?: number
    height?: number
    className?: string
}
