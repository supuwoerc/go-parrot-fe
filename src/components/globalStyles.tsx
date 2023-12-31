import { colors } from '@/style/color'
import { resetCss } from '@/style/reset'
import { Global, css } from '@emotion/react'

// 全局的样式
export const GlobalStyles: React.FC = () => {
    return (
        <Global
            styles={css`
                html,
                body,
                * {
                    box-sizing: border-box;
                }
                ${colors}
                ${resetCss}
                #root {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            `}
        />
    )
}
