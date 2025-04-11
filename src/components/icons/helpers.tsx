import { ArrowIcon } from './bxArrow'
import { IIconParams, IIconProps, TIconVariant } from './types'
import { fallback } from '../../utils/helpers'
import { HeartIcon } from './bxHeart'
import { FileBlankIcon } from './bxFileBlank'
import { TaskIcon } from './bxTask'
import { MapIcon } from './bxMap'
import { PlusIcon } from './bxPlus'
import { FileIcon } from './bxFile'
import { ExitIcon } from './bxExit'
import { ImageIcon } from './bxImage'
import { TimeIcon } from './bxTime'
import { UserIcon } from './bxUser'
import { PhoneIcon } from './bxPhone'
import { IdCardIcon } from './bxIdCard'

// this could be much better than it is... saving time with this monstrosity...
export const renderIcon = (variant: TIconVariant, params?: IIconParams) => {
    const { fill, width, height, className } = params ?? {}

    switch (variant) {
        case 'heart':
            return (
                <HeartIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, 16)}
                    height={fallback(height, 16)}
                    className={fallback(className, undefined)}
                />
            )
        case 'arrow':
            return (
                <ArrowIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, 16)}
                    height={fallback(height, 16)}
                    className={fallback(className, undefined)}
                />
            )
        case 'fileBlank':
            return (
                <FileBlankIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'task':
            return (
                <TaskIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'map':
            return (
                <MapIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'plus':
            return (
                <PlusIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'file':
            return (
                <FileIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'exit':
            return (
                <ExitIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'image':
            return (
                <ImageIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'time':
            return (
                <TimeIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'user':
            return (
                <UserIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        case 'phone':
            return (
                <PhoneIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )

        case 'idCard':
            return (
                <IdCardIcon
                    fill={fallback(fill, 'white')}
                    width={fallback(width, undefined)}
                    height={fallback(height, undefined)}
                    className={fallback(className, undefined)}
                />
            )
        default:
            return <></>
    }
}
