import { Image, ImageProps } from "@mantine/core"
import { container, overlayVariants, overlay as overlayStyle } from "./ImageWithText.css"

interface Props {
    src: string,
    overlay: React.ReactNode
    gradientTo?: "bottom" | "top" | "left" | "right"
    imageWidth?: ImageProps["w"]
    imageHeight?: ImageProps["h"]
}

export function ImageWithOverlay({src, overlay, gradientTo = "bottom", imageHeight = 300, imageWidth}: Props) {

    return (
        <div className={container}>
            <Image  src={src} w={imageWidth} h={imageHeight} />

            <div className={[overlayStyle, overlayVariants[gradientTo]].join(" ")}>
                {overlay}
            </div>
        </div>
    )
}