/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateBookmarkDto } from '../models/CreateBookmarkDto';
import type { UpdateBookmarkDto } from '../models/UpdateBookmarkDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BookmarkService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static bookmarkControllerCreate(
        requestBody: CreateBookmarkDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/bookmark',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static bookmarkControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookmark',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static bookmarkControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/bookmark/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static bookmarkControllerUpdate(
        id: string,
        requestBody: UpdateBookmarkDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/bookmark/{id}',
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
    public static bookmarkControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/bookmark/{id}',
            path: {
                'id': id,
            },
        });
    }
}
