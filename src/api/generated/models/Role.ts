/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Permission } from './Permission';
import type { User } from './User';
export type Role = {
    /**
     * Role slug
     */
    readonly slug?: string;
    /**
     * Role name
     */
    name: string;
    /**
     * Role description
     */
    description: string;
    permissions: Array<Array<Permission>>;
    users: Array<Array<User>>;
};

