#!/usr/bin/env node
/**
 * Generates src/icons/registry.ts from icon path data.
 * Run: node scripts/generate-registry.mjs
 */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @typedef {{ outline: string[], solid: string[] }} IconPaths */

/** @type {Record<string, IconPaths>} */
const icons = {
	arrowLeft: {
		outline: ['M19 12H5', 'M12 19l-7-7 7-7'],
		solid: ['M13.5 4.5L21 12l-7.5 7.5V4.5z'],
	},
	arrowRight: {
		outline: ['M5 12h14', 'M12 5l7 7-7 7'],
		solid: ['M10.5 4.5L3 12l7.5 7.5V4.5z'],
	},
	arrowUp: {
		outline: ['M12 19V5', 'M5 12l7-7 7 7'],
		solid: ['M12 4.5L4.5 12H12v7.5L19.5 12H12V4.5z'],
	},
	arrowDown: {
		outline: ['M12 5v14', 'M19 12l-7 7-7-7'],
		solid: ['M12 19.5L19.5 12H12V4.5L4.5 12H12v7.5z'],
	},
	chevronLeft: {
		outline: ['M15 18l-6-6 6-6'],
		solid: ['M14 6l-8 6 8 6V6z'],
	},
	chevronRight: {
		outline: ['M9 18l6-6-6-6'],
		solid: ['M10 6l8 6-8 6V6z'],
	},
	chevronUp: {
		outline: ['M18 15l-6-6-6 6'],
		solid: ['M6 10l6-6 6 6H6z'],
	},
	chevronDown: {
		outline: ['M6 9l6 6 6-6'],
		solid: ['M6 14l6 6 6-6H6z'],
	},
	chevronsLeft: {
		outline: ['M11 17l-5-5 5-5', 'M18 17l-5-5 5-5'],
		solid: ['M11 5L6 12l5 7V5z', 'M18 5l-5 7 5 7V5z'],
	},
	chevronsRight: {
		outline: ['M13 17l5-5-5-5', 'M6 17l5-5-5-5'],
		solid: ['M13 5l5 7-5 7V5z', 'M6 5l5 7-5 7V5z'],
	},
	home: {
		outline: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'],
		solid: ['M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z'],
	},
	menu: {
		outline: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
		solid: ['M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z'],
	},
	close: {
		outline: ['M18 6L6 18', 'M6 6l12 12'],
		solid: ['M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z'],
	},
	search: {
		outline: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'],
		solid: ['M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12z'],
	},
	filter: {
		outline: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
		solid: ['M2 3h20l-7.8 9.2V19l-4.2 2v-8.8L2 3z'],
	},
	sortAsc: {
		outline: ['M11 11h4', 'M11 15h7', 'M11 19h10', 'M3 5v14', 'M7 9l-4 4-4-4'],
		solid: ['M3 5v14h2V5H3zm4 4l-4 4 4 4V9zm8 2h4v2h-4v-2zm-3 4h7v2h-7v-2zm-3 4h10v2H9v-2z'],
	},
	sortDesc: {
		outline: ['M11 11h10', 'M11 15h7', 'M11 19h4', 'M3 5v14', 'M7 15l-4-4 4-4'],
		solid: ['M3 5v14h2V5H3zm4 8l-4-4 4-4v8zm8-6h10v2H13V7zm-3 4h7v2h-7v-2zm-3 4h4v2h-4v-2z'],
	},
	plus: {
		outline: ['M12 5v14', 'M5 12h14'],
		solid: ['M11 5h2v7h7v2h-7v7h-2v-7H4v-2h7V5z'],
	},
	minus: {
		outline: ['M5 12h14'],
		solid: ['M5 11h14v2H5v-2z'],
	},
	check: {
		outline: ['M20 6L9 17l-5-5'],
		solid: ['M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'],
	},
	x: {
		outline: ['M18 6L6 18', 'M6 6l12 12'],
		solid: ['M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 0 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4L12 13.4l4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z'],
	},
	edit: {
		outline: ['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'],
		solid: ['M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'],
	},
	trash: {
		outline: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'],
		solid: ['M6 7h12v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7zm3-3h6v2H9V4z'],
	},
	copy: {
		outline: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2', 'M15 2H5a2 2 0 0 0-2 2v14'],
		solid: ['M16 4h2a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2v12h8V4z'],
	},
	share: {
		outline: ['M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'M16 6l-4-4-4 4', 'M12 2v13'],
		solid: ['M18 8h-5V3l-7 7 7 7v-5h5a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z'],
	},
	download: {
		outline: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'],
		solid: ['M12 3v10.6l3.3-3.3 1.4 1.4L12 17l-4.7-4.7 1.4-1.4L11 13.6V3h1zm8 14H5v2h14v-2z'],
	},
	upload: {
		outline: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'],
		solid: ['M12 3l4.7 4.7-1.4 1.4L13 6.4V17h-2V6.4L8.7 9.1 7.3 7.7 12 3zM5 19h14v2H5v-2z'],
	},
	settings: {
		outline: ['M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z', 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'],
		solid: ['M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm8.94 3A7.94 7.94 0 0 0 19 10h2a1 1 0 0 0 0-2h-2.06A7.94 7.94 0 0 0 17 5.06V3a1 1 0 0 0-2 0v2.06A7.94 7.94 0 0 0 12 4V2a1 1 0 0 0-2 0v2a7.94 7.94 0 0 0-3 1.06V3a1 1 0 0 0-2 0v2.06A7.94 7.94 0 0 0 3.06 8H1a1 1 0 0 0 0 2h2.06A7.94 7.94 0 0 0 5 13v2a7.94 7.94 0 0 0-1.94 3H1a1 1 0 0 0 0 2h2.06A7.94 7.94 0 0 0 7 19v2a1 1 0 0 0 2 0v-2.06A7.94 7.94 0 0 0 12 20v2a1 1 0 0 0 2 0v-2a7.94 7.94 0 0 0 3-1.94V21a1 1 0 0 0 2 0v-2.06A7.94 7.94 0 0 0 19 15v-2z'],
	},
	user: {
		outline: ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
		solid: ['M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-7 9a7 7 0 0 1 14 0H5z'],
	},
	users: {
		outline: ['M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
		solid: ['M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm8 10v-2a4 4 0 0 0-3-3.87A4 4 0 0 1 20 11a4 4 0 0 1 0 8v2h-3zM5 19h8a6 6 0 0 0-6-6H1v6h4z'],
	},
	userPlus: {
		outline: ['M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M20 8v6', 'M23 11h-6'],
		solid: ['M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM1 19v-2a4 4 0 0 1 4-4h3v2H5a2 2 0 0 0-2 2v2H1zm20-8h-3v3h-2v-3h-3V8h3V5h2v3h3v3z'],
	},
	userMinus: {
		outline: ['M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2', 'M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M23 11h-6'],
		solid: ['M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM1 19v-2a4 4 0 0 1 4-4h3v2H5a2 2 0 0 0-2 2v2H1zm20-8h-8v2h8v-2z'],
	},
	lock: {
		outline: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
		solid: ['M17 10h-1V7a4 4 0 0 0-8 0v3H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z'],
	},
	unlock: {
		outline: ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 9.9-1'],
		solid: ['M17 10H7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zm-2-3V7a3 3 0 0 0-5.2-2.1L12 7h3z'],
	},
	key: {
		outline: ['M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4'],
		solid: ['M15.5 7.5l-1.4 1.4a5.5 5.5 0 1 0 1.4 1.4l1.4-1.4L19 11l3-3-3-3-3.5 2.5z'],
	},
	mail: {
		outline: ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
		solid: ['M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'],
	},
	phone: {
		outline: ['M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'],
		solid: ['M20 15.5c-1.2 0-2.4-.2-3.5-.6-.3-.1-.7 0-.9.3l-1.2 1.2c-2.5-1.3-4.5-3.3-5.8-5.8l1.2-1.2c.3-.3.4-.6.3-.9-.4-1.1-.6-2.3-.6-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1C3 14.8 9.2 21 17.5 21c.6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1z'],
	},
	message: {
		outline: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
		solid: ['M21 3H5a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z'],
	},
	messageCircle: {
		outline: ['M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'],
		solid: ['M12 2a9 9 0 0 0-7.8 13.5L3 22l6.5-1.2A9 9 0 1 0 12 2z'],
	},
	comment: {
		outline: ['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'],
		solid: ['M21 3H5a2 2 0 0 0-2 2v14l4-4h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z'],
	},
	bell: {
		outline: ['M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9', 'M13.73 21a2 2 0 0 1-3.46 0'],
		solid: ['M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6H6s3-2 3-9a3 3 0 0 1 6 0c0 7 3 9 3 9z'],
	},
	bellOff: {
		outline: ['M13.73 21a2 2 0 0 1-3.46 0', 'M18.63 13A17.89 17.89 0 0 1 18 8', 'M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14', 'M1 1l22 22'],
		solid: ['M1 1l22 22M6.3 6.3C4.5 7.5 3 9.5 3 12v2h3l11 11H5s3-2 3-9c0-1.2.4-2.3 1-3.2z'],
	},
	calendar: {
		outline: ['M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M16 2v4', 'M8 2v4', 'M3 10h18'],
		solid: ['M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4H5v10h14V8z'],
	},
	clock: {
		outline: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'],
		solid: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h4v-2h-3V7h-2v6h1z'],
	},
	timer: {
		outline: ['M10 2h4', 'M12 14V8', 'M4.93 4.93l1.41 1.41', 'M19.07 4.93l-1.41 1.41', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'],
		solid: ['M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 2v5h4v-2h-3V8h-1zM10 2h4v2h-4V2z'],
	},
	alarm: {
		outline: ['M12 6v6l4 2', 'M4.2 4.2l1.4 1.4', 'M18.4 4.2l-1.4 1.4', 'M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M2 22l4-4', 'M22 22l-4-4'],
		solid: ['M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm1 2v4h3v-2h-2V8h-1zM2 22l3-3 1.4 1.4L3.4 22H2zm20 0h-1.4l-3-3 1.4-1.4L22 20.6V22z'],
	},
	star: {
		outline: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
		solid: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
	},
	heart: {
		outline: ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'],
		solid: ['M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'],
	},
	bookmark: {
		outline: ['M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'],
		solid: ['M17 3H7a2 2 0 0 0-2 2v16l7-4 7 4V5a2 2 0 0 0-2-2z'],
	},
	eye: {
		outline: ['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
		solid: ['M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z'],
	},
	eyeOff: {
		outline: ['M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94', 'M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19', 'M1 1l22 22', 'M14.12 14.12a3 3 0 1 1-4.24-4.24'],
		solid: ['M1 1l22 22M9.9 4.2A10.8 10.8 0 0 1 12 4c7 0 11 8 11 8a18.6 18.6 0 0 1-4.8 6.2l-2.1-2.1A4.5 4.5 0 0 0 12 7.5c-.6 0-1.2.1-1.7.3L9.9 4.2z'],
	},
	info: {
		outline: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 16v-4', 'M12 8h.01'],
		solid: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'],
	},
	alertCircle: {
		outline: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 8v4', 'M12 16h.01'],
		solid: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'],
	},
	alertTriangle: {
		outline: ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'],
		solid: ['M12 2L1 21h22L12 2zm1 14h-2v-2h2v2zm0-4h-2v-4h2v4z'],
	},
	helpCircle: {
		outline: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'],
		solid: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1.6-7.2c-.6-.4-1.1-.7-1.6-1.1a2 2 0 1 1 2.8 2.8c-.8.8-2 1-2 2.4h-2c0-2.2 1.8-3.3 2.8-4.1z'],
	},
	externalLink: {
		outline: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'],
		solid: ['M15 3h6v6h-2V6.4l-7.3 7.3-1.4-1.4L17.6 5H15V3zM5 8h2v10h10v2H5a2 2 0 0 1-2-2V8z'],
	},
	link: {
		outline: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'],
		solid: ['M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.5 1.5 1.4 1.4L12.5 6a3 3 0 1 1 4.2 4.2l-2 2A3 3 0 0 1 10 13z'],
	},
	unlink: {
		outline: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71', 'M1 1l22 22'],
		solid: ['M1 1l22 22M10 13a5 5 0 0 0 7.5.5l1-1-1.4-1.4-1 1A3 3 0 0 1 10 13z'],
	},
	image: {
		outline: ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M21 15l-5-5L5 21'],
		solid: ['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-3 10.5L13 10l-3 4-2-2-4 5h12v-1.5z'],
	},
	file: {
		outline: ['M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z', 'M13 2v7h7'],
		solid: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2.5L18.5 9H13V4.5z'],
	},
	fileText: {
		outline: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'],
		solid: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 2.5L18.5 9H13V4.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z'],
	},
	folder: {
		outline: ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'],
		solid: ['M10 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-8l-2-3z'],
	},
	folderOpen: {
		outline: ['M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1', 'M5 19h14a2 2 0 0 0 2-2v-5H5z'],
		solid: ['M5 19h14a2 2 0 0 0 2-2v-6H3v4a2 2 0 0 0 2 2zM5 7h4l2 2h6v2H5V7z'],
	},
	camera: {
		outline: ['M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z', 'M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
		solid: ['M9 3L7 6H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-4l-2-3H9zm3 13a5 5 0 1 1 0-10 5 5 0 0 1 0 10z'],
	},
	video: {
		outline: ['M23 7l-7 5 7 5V7z', 'M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z'],
		solid: ['M3 5h11a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm16 2.5v9l6-4.5-6-4.5z'],
	},
	mic: {
		outline: ['M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z', 'M19 10v2a7 7 0 0 1-14 0v-2', 'M12 19v4', 'M8 23h8'],
		solid: ['M12 1a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3zm-7 9a7 7 0 0 0 14 0h-2a5 5 0 0 1-10 0H5zm7 9v3h4v2H8v-2h4v-3z'],
	},
	micOff: {
		outline: ['M1 1l22 22', 'M9 9v3a3 3 0 0 0 5.12 2.12', 'M19 10v2a7 7 0 0 1-2.16 4.99', 'M12 19v4', 'M8 23h8', 'M12 1a3 3 0 0 1 3 3v1'],
		solid: ['M1 1l22 22M12 1a3 3 0 0 0-3 3v3l6 6V4a3 3 0 0 0-3-3z'],
	},
	volume: {
		outline: ['M11 5L6 9H2v6h4l5 4V5z', 'M19.07 4.93a10 10 0 0 1 0 14.14', 'M15.54 8.46a5 5 0 0 1 0 7.07'],
		solid: ['M11 5L6 9H2v6h4l5 4V5zm8.07-2.07a8 8 0 0 1 0 11.3l-1.4-1.42a6 6 0 0 0 0-8.46l1.4-1.42z'],
	},
	volumeOff: {
		outline: ['M11 5L6 9H2v6h4l5 4V5z', 'M23 9l-6 6', 'M17 9l6 6'],
		solid: ['M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6'],
	},
	play: {
		outline: ['M5 3l14 9-14 9V3z'],
		solid: ['M8 5v14l11-7L8 5z'],
	},
	pause: {
		outline: ['M6 4h4v16H6V4z', 'M14 4h4v16h-4V4z'],
		solid: ['M6 4h4v16H6V4zm8 0h4v16h-4V4z'],
	},
	stop: {
		outline: ['M6 6h12v12H6z'],
		solid: ['M6 6h12v12H6z'],
	},
	skipForward: {
		outline: ['M5 4l10 8-10 8V4z', 'M19 5v14'],
		solid: ['M5 4l10 8-10 8V4zM19 5h2v14h-2V5z'],
	},
	skipBack: {
		outline: ['M19 20l-10-8 10-8v16z', 'M5 19V5'],
		solid: ['M19 20l-10-8 10-8v16zM5 19H3V5h2v14z'],
	},
	refresh: {
		outline: ['M23 4v6h-6', 'M1 20v-6h6', 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10', 'M1 14l4.64 4.36A9 9 0 0 0 20.49 15'],
		solid: ['M12 4V1L8 5l4 4V6a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z'],
	},
	loader: {
		outline: ['M12 2v4', 'M12 18v4', 'M4.93 4.93l2.83 2.83', 'M16.24 16.24l2.83 2.83', 'M2 12h4', 'M18 12h4', 'M4.93 19.07l2.83-2.83', 'M16.24 7.76l2.83-2.83'],
		solid: ['M12 2a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zm0 16a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1zM4.2 4.2a1 1 0 0 1 1.4 0l2.1 2.1a1 1 0 1 1-1.4 1.4l-2.1-2.1a1 1 0 0 1 0-1.4z'],
	},
	sun: {
		outline: ['M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z', 'M12 2v2', 'M12 20v2', 'M4.93 4.93l1.41 1.41', 'M17.66 17.66l1.41 1.41', 'M2 12h2', 'M20 12h2', 'M4.93 19.07l1.41-1.41', 'M17.66 6.34l1.41-1.41'],
		solid: ['M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm1-5h-2v3h2V2zm0 17h-2v3h2v-3zM4.2 4.2l-1.4 1.4 2.1 2.1 1.4-1.4-2.1-2.1zm15.6 0l-2.1 2.1 1.4 1.4 2.1-2.1-1.4-1.4z'],
	},
	moon: {
		outline: ['M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'],
		solid: ['M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8z'],
	},
	cloud: {
		outline: ['M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'],
		solid: ['M18 10h-1.3A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z'],
	},
	mapPin: {
		outline: ['M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'],
		solid: ['M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z'],
	},
	navigation: {
		outline: ['M3 11l19-9-9 19-2-8-8-2z'],
		solid: ['M3 11l19-9-9 19-2-8-8-2z'],
	},
	shoppingCart: {
		outline: ['M6 6h15l-1.5 9H7.5L6 6z', 'M6 6l-2-2H1', 'M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'],
		solid: ['M6 6h15l-1.5 9H7.5L6 6zM4 4H1V2h3l1 2zm5 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm9 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
	},
	creditCard: {
		outline: ['M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z', 'M1 10h22'],
		solid: ['M21 4H3a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4H1v8h20V8z'],
	},
	tag: {
		outline: ['M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z', 'M7 7h.01'],
		solid: ['M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8zM7 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'],
	},
	grid: {
		outline: ['M3 3h7v7H3z', 'M14 3h7v7h-7z', 'M14 14h7v7h-7z', 'M3 14h7v7H3z'],
		solid: ['M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z'],
	},
	list: {
		outline: ['M8 6h13', 'M8 12h13', 'M8 18h13', 'M3 6h.01', 'M3 12h.01', 'M3 18h.01'],
		solid: ['M3 5h2v2H3V5zm0 6h2v2H3v-2zm0 6h2v2H3v-2zM8 5h13v2H8V5zm0 6h13v2H8v-2zm0 6h13v2H8v-2z'],
	},
	layout: {
		outline: ['M3 3h18v18H3z', 'M3 9h18', 'M9 21V9'],
		solid: ['M3 3h18v6H3V3zm0 8h6v10H3V11zm8 0h10v10H11V11z'],
	},
	login: {
		outline: ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4', 'M10 17l5-5-5-5', 'M15 12H3'],
		solid: ['M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4v-2h4V5h-4V3zM3 11h8.6l-2.3-2.3 1.4-1.4L15 12l-4.3 4.7-1.4-1.4 2.3-2.3H3v-2z'],
	},
	logout: {
		outline: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
		solid: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4v2H5v14h4v2zM16 17l5-5-5-5v3H9v2h7v3z'],
	},
	shield: {
		outline: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
		solid: ['M12 2l8 3v7c0 5.5-3.8 9.7-8 11-4.2-1.3-8-5.5-8-11V5l8-3z'],
	},
	wifi: {
		outline: ['M5 12.55a11 11 0 0 1 14.08 0', 'M1.42 9a16 16 0 0 1 21.16 0', 'M8.53 16.11a6 6 0 0 1 6.95 0', 'M12 20h.01'],
		solid: ['M12 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM8.5 15.5a3.5 3.5 0 0 1 7 0h-2a1.5 1.5 0 0 0-3 0h-2zM5 12.5A7.5 7.5 0 0 1 19 12.5h-2A5.5 5.5 0 0 0 7 12.5H5z'],
	},
	send: {
		outline: ['M22 2L11 13', 'M22 2l-7 20-4-9-9-4 20-7z'],
		solid: ['M2 21l21-9L2 3v7l15 2-15 2v7z'],
	},
	inbox: {
		outline: ['M22 12h-6l-2 3H10l-2-3H2', 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'],
		solid: ['M5 4h14a2 2 0 0 1 2 2v3h-7l-2 3h-2l-2-3H3V6a2 2 0 0 1 2-2zm0 14h14a2 2 0 0 0 2-2v-3h-5.6l2 3h2l2-3H22v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3h5.6l-2 3h-2l-2-3H3v3a2 2 0 0 0 2 2z'],
	},
	archive: {
		outline: ['M21 8v13H3V8', 'M1 3h22v5H1z', 'M10 12h4'],
		solid: ['M2 3h20v5H2V3zm0 7h20v11H2V10zm8 2v3h4v-3h-4z'],
	},
	paperclip: {
		outline: ['M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48'],
		solid: ['M16.5 6.5l-8.5 8.5a3 3 0 1 0 4.2 4.2l8.5-8.5a5 5 0 0 0-7-7L5.3 9.9a1 1 0 1 0 1.4 1.4L15.1 2.9a3 3 0 0 1 4.2 4.2L9.9 16.5a1 1 0 1 1-1.4-1.4l8.5-8.5a1 1 0 0 0-1.4-1.4L7.1 13.7a1 1 0 0 0 1.4 1.4l8.5-8.5z'],
	},
	pin: {
		outline: ['M12 17v5', 'M9 10.76a6 6 0 0 1-1.8-4.24 6 6 0 0 1 11.6 0A6 6 0 0 1 15 10.76V17', 'M8 17h8'],
		solid: ['M12 17v5h-1v-5H8l-1-4 5-3 5 3-1 4h-3v5h-1zM9 10.8a6 6 0 0 1 6 0L12 8 9 10.8z'],
	},
	globe: {
		outline: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
		solid: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm7.9 9H16.1a16.4 16.4 0 0 0-1.2-5.1A8 8 0 0 1 19.9 11zM12 4c.8 1.6 1.4 3.4 1.7 5.3H10.3C10.6 7.4 11.2 5.6 12 4zM4.1 13h3.8a16.4 16.4 0 0 0 1.2 5.1A8 8 0 0 1 4.1 13z'],
	},
	zoomIn: {
		outline: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35', 'M11 8v6', 'M8 11h6'],
		solid: ['M10 2a8 8 0 1 0 4.3 14.7l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2zm1 3v3h3v2h-3v3H9v-3H6V10h3V5h2z'],
	},
	zoomOut: {
		outline: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35', 'M8 11h6'],
		solid: ['M10 2a8 8 0 1 0 4.3 14.7l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2zM6 10h8v2H6v-2z'],
	},
	moreHorizontal: {
		outline: ['M12 12h.01', 'M19 12h.01', 'M5 12h.01'],
		solid: ['M5 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'],
	},
};

const count = Object.keys(icons).length;
if (count !== 100) {
	console.error(`Expected 100 icons, got ${count}`);
	process.exit(1);
}

function pathsToElements(paths) {
	return paths.map((d) => ({ type: 'path', d }));
}

function formatDefinition(name, def) {
	const outline = JSON.stringify(pathsToElements(def.outline), null, '\t');
	const solid = JSON.stringify(pathsToElements(def.solid), null, '\t');
	return `\t${name}: {\n\t\toutline: ${outline.replaceAll('\n', '\n\t\t')},\n\t\tsolid: ${solid.replaceAll('\n', '\n\t\t')},\n\t}`;
}

const registryBody = Object.entries(icons)
	.map(([name, def]) => formatDefinition(name, def))
	.join(',\n');

const output = `// This file is auto-generated by scripts/generate-registry.mjs
import type { IconDefinition } from '../types';

export const iconRegistry = {
${registryBody},
} as const satisfies Record<string, IconDefinition>;

export type IconRegistry = typeof iconRegistry;
`;

const outPath = join(__dirname, '../src/icons/registry.ts');
writeFileSync(outPath, output);
console.log(`Generated ${count} icons -> ${outPath}`);

// Also write individual SVG files for reference
const svgDir = join(__dirname, '../src/svgs');
for (const [name, def] of Object.entries(icons)) {
	for (const variant of ['outline', 'solid']) {
		const paths = def[variant];
		const attrs =
			variant === 'outline'
				? 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"'
				: 'fill="currentColor"';
		const pathMarkup = paths.map((d) => `<path d="${d}" ${attrs}/>`).join('\n  ');
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n  ${pathMarkup}\n</svg>\n`;
		writeFileSync(join(svgDir, variant, `${name}.svg`), svg);
	}
}

console.log(`Wrote SVG files to ${svgDir}`);
