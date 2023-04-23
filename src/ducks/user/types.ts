export interface GetUserPath {
  user: string;
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
