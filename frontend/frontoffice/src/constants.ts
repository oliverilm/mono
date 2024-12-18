export const LS_TOKEN_KEY = 'token';
export const TEST_COMPETITION_IMAGES = [
	'https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiqMrFoTx9WBnqS2yWWs7Rda_GIVRk4zFQeA&s',
	'https://ookami.ee/wp-content/uploads/2024/01/424708720_763220925827399_6076925967381729131_n.jpg',
	'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSFu-K1S5ziq2hu0M129dCQVDc4D2YjQP2w&s',
	'https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg',
	'https://t3.ftcdn.net/jpg/01/33/07/34/360_F_133073492_eRHEmxyShXrDRpW4NeiQrP8r1mnBzj6U.jpg',
];

export function getRandomTestCompetitionImage() {
	return TEST_COMPETITION_IMAGES[
		Math.floor(Math.random() * TEST_COMPETITION_IMAGES.length)
	];
}

export const TEST_CLUB_IMAGES = [
	'https://judo.ee/wp-content/uploads/2013/07/ZEN-logo-9k-1-100x100.jpg',
	'https://judo.ee/wp-content/uploads/2013/07/YAWARA-101x100.png',
	'https://judo.ee/wp-content/uploads/2013/08/Rei.png',
	'https://judo.ee/wp-content/uploads/2013/07/Toni-JK-vol-2-93x100.png',
	'https://judo.ee/wp-content/uploads/2023/05/Tallinn_Sports_Academy_logo_1-130x100.jpg',
	'https://judo.ee/wp-content/uploads/2017/02/Capture-234x100.jpg',
	'https://judo.ee/wp-content/uploads/2021/05/logo-1-182x100.png',
	'https://judo.ee/wp-content/uploads/2013/07/dvig.jpg',
	'https://judo.ee/wp-content/uploads/2013/08/samurai.png',
	'https://judo.ee/wp-content/uploads/2013/08/Sakura_logo-89x100.jpg',
	'https://judo.ee/wp-content/uploads/2017/01/rapla-judoklubi-logo-99x100.jpg',
	'https://judo.ee/wp-content/uploads/2013/06/3_ico.png',
	'https://judo.ee/wp-content/uploads/2014/10/mdojo-115x100.jpg',
	'https://judo.ee/wp-content/uploads/2013/07/Do.gif',
	'https://judo.ee/wp-content/uploads/2018/07/DOKYO-logo-transparent-132x100.png',
	'https://judo.ee/wp-content/uploads/2018/12/Spordiklubi-byakko-logo-must-valge-97x100.png',
	'https://judo.ee/wp-content/uploads/2013/08/Buffen-do-100x100.jpg',
	'https://judo.ee/wp-content/uploads/2013/07/Budolinn.png',
	'https://judo.ee/wp-content/uploads/2017/01/barra_logo-100x100.jpg',
	'https://judo.ee/wp-content/uploads/2013/07/Audentes_Spordiklubi_logo_RGB_vert-113x100.jpg',
	'https://judo.ee/wp-content/uploads/2024/10/logo-73x100.png',
	'https://judo.ee/wp-content/uploads/2013/07/companyname.png',
	'https://judo.ee/wp-content/uploads/2013/07/Aitado-logo-jpg-209x100.jpg',
];

export function getRandomTestClubImage() {
	return TEST_CLUB_IMAGES[Math.floor(Math.random() * TEST_CLUB_IMAGES.length)];
}
