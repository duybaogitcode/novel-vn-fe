/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRoleDto } from '../models/CreateRoleDto';
import type { Role } from '../models/Role';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * Create new role
     * @param requestBody
     * @param authorization Bearer token
     * @returns Role Role created successfully
     * @throws ApiError
     */
    public static roleControllerCreate(
        requestBody: CreateRoleDto,
        authorization?: string,
    ): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/role',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all roles
     * @returns Role Roles retrieved successfully
     * @throws ApiError
     */
    public static roleControllerFindAll(): CancelablePromise<Array<Role>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/role',
        });
    }
}
