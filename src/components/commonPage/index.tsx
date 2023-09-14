import useCurrentRoutes from '@/hooks/useCurrentRoutes'
import { flexBetweenClass } from '@/style/display'
import { css } from '@emotion/react'
import { Breadcrumb } from 'antd'
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { forwardRef } from 'react'
import { ForwardRefRenderFunction } from 'react'
import { Link } from 'react-router-dom'

interface CommonPageProps {
    pageTitle?: string
    children?: React.ReactNode
    extra?: React.ReactNode
}
const CommonPageCss = css`
    position: relative;
    height: 100%;
    width: 100%;
    .page-title {
        height: 65px;
        border-bottom: 1px solid #ececec;
        padding: 16px 24px;
        ${flexBetweenClass}
    }
    .container {
        height: calc(100% - 65px);
    }
`
function itemRender(
    item: ItemType,
    _: any,
    items: ItemType[],
    paths: string[]
) {
    const last = items.indexOf(item) === items.length - 1
    return last || !item.path ? (
        <span>{item.title}</span>
    ) : (
        <Link to={paths.join('/')}>{item.title}</Link>
    )
}
const CommonPage: ForwardRefRenderFunction<HTMLDivElement, CommonPageProps> = (
    { pageTitle, children, extra },
    ref
) => {
    const routes = useCurrentRoutes()
    const metaInfo = routes.map((item, index) => {
        return {
            title: item.route.meta?.title ?? '',
            path: item.route.path,
            active: index > 0
        }
    })
    return (
        <div css={CommonPageCss} ref={ref}>
            <h2 className="page-title">
                <div className="left">
                    {pageTitle ? (
                        pageTitle
                    ) : (
                        <Breadcrumb
                            items={metaInfo}
                            itemRender={itemRender}
                            separator=">"
                        />
                    )}
                </div>
                {extra && <div className="right">{extra}</div>}
            </h2>
            <div className="container">{children}</div>
        </div>
    )
}
export default forwardRef(CommonPage)
