/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGenreDto } from '../models/CreateGenreDto';
import type { Genre } from '../models/Genre';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GenreService {
    /**
     * Create a new genre
     * @param requestBody
     * @returns CreateGenreDto Genre created successfully
     * @throws ApiError
     */
    public static genreControllerCreate(
        requestBody: CreateGenreDto,
    ): CancelablePromise<CreateGenreDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/genre',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns Genre Get all genres
     * @throws ApiError
     */
    public static genreControllerFindAll(): CancelablePromise<Array<Genre>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/genre',
        });
    }
    /**
     * @param slug
     * @returns any
     * @throws ApiError
     */
    public static genreControllerFindOne(
        slug: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/genre/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
}
