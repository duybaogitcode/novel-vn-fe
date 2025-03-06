/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReadingHistoryDto } from '../models/CreateReadingHistoryDto';
import type { UpdateReadingHistoryDto } from '../models/UpdateReadingHistoryDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ReadingHistoryService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static readingHistoryControllerCreate(
        requestBody: CreateReadingHistoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/reading-history',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static readingHistoryControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reading-history',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static readingHistoryControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/reading-history/{id}',
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
    public static readingHistoryControllerUpdate(
        id: string,
        requestBody: UpdateReadingHistoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/reading-history/{id}',
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
    public static readingHistoryControllerRemove(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/reading-history/{id}',
            path: {
                'id': id,
            },
        });
    }
}
