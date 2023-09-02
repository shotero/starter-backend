import type { ColumnType } from "kysely";

export type AuthProvider = "apple" | "google";

export type ChangeType = "CREATE" | "DELETE" | "UPDATE";

export type Gender = "female" | "male" | "trans";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AdminHistory {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  created_by: string;
  resource: string;
  resource_id: string;
  parent_resource: string;
  parent_resource_id: string;
  action: ChangeType;
  diff: Generated<Json>;
}

export interface CommitteeCommittees {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  organization_id: string;
}

export interface CommitteeRoles {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  committee_id: string;
}

export interface CommitteeUserRoles {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  user_id: string;
  role_id: string;
}

export interface Countries {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  iso: string;
  phonecode: string;
  currency: string;
  region: string;
}

export interface DirectoryBatches {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  graduating_year: number | null;
  batch_identifier: string | null;
  organization_id: string;
  department_id: string | null;
  program_id: string | null;
  forum_id: string | null;
}

export interface DirectoryBatchPersons {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  batch_id: string;
  user_id: string;
  student_id: string | null;
}

export interface DirectoryContacts {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  user_id: string;
  country_id: string | null;
  phone: string | null;
  email: string | null;
}

export interface DirectoryDepartments {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  organization_id: string;
  faculty_id: string | null;
}

export interface DirectoryFaculties {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  organization_id: string;
}

export interface DirectoryPrograms {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  organization_id: string;
  faculty_id: string | null;
}

export interface ForumForums {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  deleted: Generated<boolean>;
  name: string;
  cover_image: string | null;
}

export interface ForumPosts {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  thread_id: string;
  deleted: Generated<boolean>;
  body: string;
  votes: Generated<number>;
  created_by: string;
  parent_post_id: string | null;
}

export interface ForumPostVotes {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  user_id: string;
  post_id: string;
  downvote: Generated<boolean>;
}

export interface ForumThreads {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  forum_id: string | null;
  deleted: Generated<boolean>;
  title: string;
  body: string;
  votes: Generated<number>;
  thread_type_id: string;
  created_by: string;
}

export interface ForumThreadTypes {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
}

export interface ForumThreadVotes {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  user_id: string;
  thread_id: string;
  downvote: Generated<boolean>;
}

export interface GeographyColumns {
  f_table_catalog: string | null;
  f_table_schema: string | null;
  f_table_name: string | null;
  f_geography_column: string | null;
  coord_dimension: number | null;
  srid: number | null;
  type: string | null;
}

export interface GeometryColumns {
  f_table_catalog: string | null;
  f_table_schema: string | null;
  f_table_name: string | null;
  f_geometry_column: string | null;
  coord_dimension: number | null;
  srid: number | null;
  type: string | null;
}

export interface Organizations {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  country_id: string;
  state_id: string | null;
  gender_exclusive: Gender | null;
  has_departments: Generated<boolean>;
  has_faculties: Generated<boolean>;
}

export interface SpatialRefSys {
  srid: number;
  auth_name: string | null;
  auth_srid: number | null;
  srtext: string | null;
  proj4text: string | null;
}

export interface States {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  country_id: string;
  location: string | null;
}

export interface UserAccounts {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  user_id: string;
  provider: AuthProvider;
  email: string;
  refresh_token: string | null;
  external_id: string | null;
}

export interface Users {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  full_name: string;
  picture: string | null;
  display_name: string | null;
  bio: string | null;
  birth_year: number | null;
  death_year: number | null;
  country_id: string | null;
  added_by: string | null;
  links: Generated<Json>;
  achievements: Generated<Json>;
}

export interface DB {
  "admin.history": AdminHistory;
  "committee.committees": CommitteeCommittees;
  "committee.roles": CommitteeRoles;
  "committee.user_roles": CommitteeUserRoles;
  countries: Countries;
  "directory.batch_persons": DirectoryBatchPersons;
  "directory.batches": DirectoryBatches;
  "directory.contacts": DirectoryContacts;
  "directory.departments": DirectoryDepartments;
  "directory.faculties": DirectoryFaculties;
  "directory.programs": DirectoryPrograms;
  "forum.forums": ForumForums;
  "forum.post_votes": ForumPostVotes;
  "forum.posts": ForumPosts;
  "forum.thread_types": ForumThreadTypes;
  "forum.thread_votes": ForumThreadVotes;
  "forum.threads": ForumThreads;
  geography_columns: GeographyColumns;
  geometry_columns: GeometryColumns;
  organizations: Organizations;
  spatial_ref_sys: SpatialRefSys;
  states: States;
  user_accounts: UserAccounts;
  users: Users;
}
