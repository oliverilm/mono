export const LS_TOKEN_KEY = "token"
export const TEST_COMPETITION_IMAGES = [
    "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqMrFoTx9WBnqS2yWWs7Rda_GIVRk4zFQeA&s",
    "https://ookami.ee/wp-content/uploads/2024/01/424708720_763220925827399_6076925967381729131_n.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSFu-K1S5ziq2hu0M129dCQVDc4D2YjQP2w&s",
    "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
    "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
]

export function getRandomTestCompetitionImage() {
    return TEST_COMPETITION_IMAGES[Math.floor(Math.random() * TEST_COMPETITION_IMAGES.length)]
}