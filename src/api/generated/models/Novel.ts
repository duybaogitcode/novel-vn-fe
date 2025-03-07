/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Genre } from './Genre';
import type { Origin } from './Origin';
import type { User } from './User';
export type Novel = {
    /**
     * Date of creation
     */
    createdAt: string;
    /**
     * Date of last update
     */
    updatedAt: string;
    /**
     * Name of the novel
     */
    title: string;
    /**
     * Slug of the novel
     */
    slug: string;
    /**
     * Description of the novel
     */
    description: string;
    /**
     * Author of the novel
     */
    author?: string | null;
    /**
     * Cover image of the novel
     */
    coverImage: string;
    /**
     * Background image of the novel
     */
    backgroundImage: string;
    /**
     * Status of the novel
     */
    status: string;
    /**
     * Is mature content
     */
    isMature: boolean;
    /**
     * Number of views
     */
    views: number;
    /**
     * Genres of the novel
     */
    genres: Genre;
    /**
     * Number of chapters
     */
    chapters: number;
    /**
     * Number of words
     */
    words: number;
    /**
     * Average rating
     */
    rating: number;
    /**
     * Origin of the novel
     */
    origin: Origin;
    /**
     * Translator ID
     */
    translatorId: string;
    /**
     * Translator of the novel
     */
    translator: User;
};

