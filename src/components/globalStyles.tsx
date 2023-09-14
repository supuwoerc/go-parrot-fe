import { Global, css } from '@emotion/react'
interface GlobalStylesProps {}
// 全局的样式
export const GlobalStyles: React.FC<GlobalStylesProps> = () => {
    return (
        <Global
            styles={css`
                html,
                body,
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                #root {
                    height: 100%;
                    margin: 0;
                    padding: 0;
                }
            `}
        />
    )
}
