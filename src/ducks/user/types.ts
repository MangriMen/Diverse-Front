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
