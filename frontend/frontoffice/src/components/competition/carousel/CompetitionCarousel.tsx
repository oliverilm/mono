import { Carousel } from "@mantine/carousel"
import { CompetitionCarouselCard } from "./card/CompetitionCarouselCard";
import { useMatches } from "@mantine/core";

const competitions = [{
    name: "Vinni nationals",
    url: "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
    address: "Kalevi spordihall",
    slug: "vinni-nationals"
},{
    name: "Rothberg cup",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqMrFoTx9WBnqS2yWWs7Rda_GIVRk4zFQeA&s",
    address: "Decora spordihoone",
    slug: "rothberg-cup"
},{
    name: "Tallinn judo cup",
    url: "https://ookami.ee/wp-content/uploads/2024/01/424708720_763220925827399_6076925967381729131_n.jpg",
    address: "Viimsi vabaõhumuuseum",
    slug: "tallinn-judo-cup"
},{
    name: "Test competition4",
    url: "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
    address: "test",
    slug: "test-competition-4"
},{
    name: "Test competition5",
    url: "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
    address: "test",
    slug: ""
},{
    name: "Test competition6",
    url: "https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg",
    address: "test",
    slug: ""
}]


export function CompetitionCarousel() {

    const slideSize = useMatches({
        lg: 3,
        md: 2,
        sm: 2,
        xs: 1,
        base: 1
    })
 
    return (
      
        <Carousel 
            slideSize={`${(1 / slideSize) * 100}%`}
            slideGap="md"
            includeGapInSize
            align="start"
            slidesToScroll={slideSize} >
            {competitions.map((competition) => (
                <CompetitionCarouselCard key={competition.name} competition={competition} />
            ))}
        </Carousel>
    )
}