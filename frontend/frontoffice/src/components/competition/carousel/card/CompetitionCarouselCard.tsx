import { card, slide } from "./CompetitionCarouselCard.css";
import { Card, Divider, Image, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel"
import { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    competition: {
        name: string,
        url: string,
        address: string
        slug: string
    }
}

export function CompetitionCarouselCard({ competition}: Props) {
    const ref = useRef<HTMLDivElement | null>(null);

    const navigate = useNavigate()

    useLayoutEffect(() => {
        // Select the card element
        const card = ref.current;
        if (!card) return;

        // Add an event listener for when the mouse moves over the card
        card.addEventListener('mousemove', (e) => {
            // Get the card's size and position relative to the viewport
            const cardRect = card.getBoundingClientRect();
            
            // Calculate the position of the mouse relative to the card's top-left corner
            const x = e.clientX - cardRect.left; // X coordinate within the card
            const y = e.clientY - cardRect.top;  // Y coordinate within the card
            
            // Find the center of the card
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            // Calculate the rotation angles based on mouse position
            // Multiply by 15 for a stronger tilt effect
            const rotateX = ((y - centerY) / centerY) * 10; // Tilt on the X-axis (up and down)
            const rotateY = ((centerX - x) / centerX) * 10; // Tilt on the Y-axis (left and right)
             
            // Apply the calculated rotation to the card
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Add an event listener for when the mouse leaves the card area
        card.addEventListener('mouseleave', () => {
            // Reset the card's rotation when the mouse leaves
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    }, [])

    return (
        <Carousel.Slide className={slide}>
            <Card shadow="sm" padding="lg" radius="md" withBorder ref={ref} className={card} onClick={() => {
                navigate(`/competitions/${competition.slug}`)
            }}>
                <Card.Section>
                    <Image
                        style={{
                            backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${competition.url})`,
                        }}
                        src={competition.url}
                        height={200}
                        alt="Norway"
                    />
                </Card.Section>
                <Card.Section p={"sm"}>
                    <Title  size={"h3"}>{competition.name}</Title>
                    <Divider my={5} />
                    <Text p={0}>{competition.address}</Text>
                </Card.Section>
                
            </Card>
        </Carousel.Slide>
    )
}