import { ArrowIcon } from './bxArrow'
import { IIconParams, TIconVariant } from './types'
import { fallback } from '../../utils/helpers'
import { HeartIcon } from './bxHeart'

export const renderIcon = (variant: TIconVariant, params?: IIconParams) => {
    const { fill, width, height, className } = params ?? {}

    console.log(params, variant, {
        fill: fallback(fill, 'white'),
        width: fallback(width, 16),
        height: fallback(height, 16),
    })

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
        default:
            return <></>
    }
}
