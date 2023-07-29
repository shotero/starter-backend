import type { ColumnType } from "kysely";

export type ChangeType = "CREATE" | "DELETE" | "UPDATE";

export type EventType = "BIRTH" | "DEATH" | "MARRIAGE" | "RELOCATION" | "SCHOOL" | "SEPARATION" | "STORY" | "TRAVEL" | "WORK";

export type Gender = "female" | "male";

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

export interface ChangeHistory {
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

export interface ChronicleMedia {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  life_event_id: string;
  url: string | null;
}

export interface Chronicles {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  person_id: string;
  organization_id: string | null;
  school_id: string | null;
  event_type: EventType;
  description: string | null;
  year: number;
  end_year: number | null;
}

export interface Contacts {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  person_id: string;
  phone: string | null;
  email: string | null;
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
}

export interface Persons {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  gender: Gender;
  preferred_name: string | null;
  birth_year: number | null;
  death_year: number | null;
  country_id: string | null;
  state_id: string | null;
  user_id: string | null;
  added_by: string | null;
}

export interface Relations {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  parent_id: string;
  child_id: string;
}

export interface Schools {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  name: string;
  country_id: string;
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

export interface Users {
  id: Generated<string>;
  created_at: Generated<Timestamp>;
  login: string;
  hash: string;
  login_date: Timestamp | null;
  prev_login_date: Timestamp | null;
}

export interface DB {
  change_history: ChangeHistory;
  chronicle_media: ChronicleMedia;
  chronicles: Chronicles;
  contacts: Contacts;
  countries: Countries;
  geography_columns: GeographyColumns;
  geometry_columns: GeometryColumns;
  organizations: Organizations;
  persons: Persons;
  relations: Relations;
  schools: Schools;
  spatial_ref_sys: SpatialRefSys;
  states: States;
  users: Users;
}
