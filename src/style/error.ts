import { css } from '@emotion/react'

export const errorTipsClass = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .img {
        width: 300px;
        margin-right: 30px;
    }
    .title {
        font-size: 56px;
    }
    .tips {
        color: rgba(0, 0, 0, 0.5);
        margin: 8px 0 24px 0;
        max-width: 40em;
    }
`
