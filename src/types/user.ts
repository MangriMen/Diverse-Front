import { User } from './auth';
import { ServerBaseResponse } from './base';

export interface RelationModel {
  id: string;
  type: string;
  created_at: string;
  relation_user: User;
}

export interface ServerGetRelationsCountResponse extends ServerBaseResponse {
  count: number;
}

export interface ServerGetRelationsResponse extends ServerBaseResponse {
  count: number;
  relations: RelationModel[];
}
