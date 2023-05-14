import { User } from 'types/auth';

export interface GetUserPath {
  username: string;
}

export interface GetUserRequest {
  path: GetUserPath;
}

export interface GetRelationsCountPath {
  user: string;
}

export interface GetRelationsCountParams {
  type: string;
}

export interface GetRelationsCountRequest {
  path: GetRelationsCountPath;
  params?: GetRelationsCountParams;
}

export interface GetRelationsPath {
  user: string;
}

export interface GetRelationsParams {
  count: number;
  type: string;
}

export interface GetRelationsRequest {
  path: GetRelationsPath;
  params?: GetRelationsParams;
}

export interface GetRelationStatusPath extends GetRelationsPath {
  relationUser: string;
}

export interface GetRelationStatusRequest {
  path: GetRelationStatusPath;
}

export interface CreateRelationParams {
  type: string;
}

export interface CreateRelationRequest {
  path: GetRelationStatusPath;
  params: CreateRelationParams;
}

export interface DeleteRelationRequest {
  path: GetRelationStatusPath;
  params: CreateRelationParams;
}

export interface UpdateUserRequest {
  path: GetRelationsPath;
  body: Partial<User>;
}

export interface ChangePassword {
  password: string;
  oldPassword: string;
}

export interface UpdatePasswordRequest {
  path: GetRelationsPath;
  body: ChangePassword;
}
