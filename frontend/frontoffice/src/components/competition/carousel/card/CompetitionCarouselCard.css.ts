import { globalStyle, style } from "@vanilla-extract/css";

export const slide = style({
    padding: "2rem 0"
})
export const card = style({
    transitionDuration: ".2s",
    cursor: "pointer"

    
})
globalStyle(`${card}:hover`, {
    scale: "1.008",
    transitionDuration: ".2s",
    boxShadow: "0 16px 32px rgba(0, 0, 0, 0.2)"

})
