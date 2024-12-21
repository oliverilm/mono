import { Carousel } from '@mantine/carousel';
import { Box, Card, Divider, Flex, Text, Title } from '@mantine/core';
import { useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CompetitionListItem } from '../../../../api/common';
import { TEST_COMPETITION_IMAGES } from '../../../../constants';
import { ImageWithOverlay } from '../../../shared/image-with-text/ImageWithText';
import {
	card,
	cardContent,
	cardSection,
	slide,
} from './CompetitionCarouselCard.css';
import { getCompetitionBannerColorAndStatus } from './CompetitionCarouselCard.utils';

interface Props {
	competition: CompetitionListItem;
}

export function CompetitionCarouselCard({ competition }: Props) {
	const ref = useRef<HTMLDivElement | null>(null);
	const navigate = useNavigate();


	

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
			const y = e.clientY - cardRect.top; // Y coordinate within the card

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
	}, []);

	const url =
		TEST_COMPETITION_IMAGES[
			Math.floor(Math.random() * TEST_COMPETITION_IMAGES.length)
		];


		const {text, bg} = getCompetitionBannerColorAndStatus(competition)
	return (
		<Carousel.Slide className={slide}>
			<Card
				shadow="sm"
				padding="lg"
				radius="md"
				withBorder
				ref={ref}
				className={card}
				onClick={() => {
					navigate(`/competitions/${competition.slug}`);
				}}
			>
				<Card.Section className={cardSection}>
					<ImageWithOverlay
						src={url}
						imageHeight={250}
						overlay={
							<Flex className={cardContent}>
								<Title size={'h3'}>{competition.name}</Title>
								<Divider my={5} />
								<Text p={0}>{'Address'}</Text>
							</Flex>
						}
					/>
					<Box bg={bg} pos={"absolute"} top={0} w={"100%"} p={"3px"} style={{ zIndex: 2}}>
						<Text>
							{text}
						</Text>
					</Box>
				</Card.Section>
			</Card>
		</Carousel.Slide>
	);
}
