/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateNovelDto } from '../models/CreateNovelDto';
import type { Novel } from '../models/Novel';
import type { UpdateNovelDto } from '../models/UpdateNovelDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NovelService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static novelControllerCreate(
        requestBody: CreateNovelDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/novel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static novelControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novel',
        });
    }
    /**
     * @param slug
     * @returns Novel Get a novel by ID
     * @throws ApiError
     */
    public static novelControllerFindOne(
        slug: string,
    ): CancelablePromise<Novel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novel/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static novelControllerUpdate(
        id: string,
        requestBody: UpdateNovelDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/novel/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static novelControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/novel/{id}',
            path: {
                'id': id,
            },
        });
    }
}
