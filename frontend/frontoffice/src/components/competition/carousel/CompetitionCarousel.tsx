import { Carousel } from "@mantine/carousel"
import { CompetitionCarouselCard } from "./card/CompetitionCarouselCard";
import { useMatches } from "@mantine/core";
import { CompetitionAPI } from "../../../api/common";
import { useQuery } from "react-query";

export function CompetitionCarousel() {

    const {data: competitions} = useQuery({
        queryKey: ["homepage-competitions"],
        queryFn: () => CompetitionAPI.getPublicCompetitions({skip: 0, take: 25})
    })

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
            withIndicators
            slidesToScroll={slideSize} >
            {(competitions?.data ?? []).map((competition) => (
                <CompetitionCarouselCard key={competition.name} competition={competition} />
            ))}
        </Carousel>
    )
}