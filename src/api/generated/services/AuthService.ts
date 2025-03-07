/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FirebaseIdToken } from '../models/FirebaseIdToken';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Sign in by firebase token
     * @param requestBody
     * @returns User Sign in by firebase token
     * @throws ApiError
     */
    public static authControllerSignInByFirebaseToken(
        requestBody: FirebaseIdToken,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signInByFirebaseToken',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns User Refresh token
     * @throws ApiError
     */
    public static authControllerRefresh(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/refresh',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static authControllerSignOut(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/auth/signOut',
        });
    }
}
