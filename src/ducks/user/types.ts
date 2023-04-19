export interface GetRelationsPath {
  user: string;
}

export interface GetRelationsParams {
  count: number;
  type: string;
}

export interface GetRelationsValues {
  path: GetRelationsPath;
  params?: GetRelationsParams;
}
