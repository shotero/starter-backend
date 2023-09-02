-- UP SCRIPT: init
-- Created by: demouser
-- Created at: 2023/09/02 18:4759

-- Your code goes here
CREATE SCHEMA IF NOT EXISTS public;

CREATE SCHEMA IF NOT EXISTS directory;

CREATE SCHEMA IF NOT EXISTS committee;

CREATE SCHEMA IF NOT EXISTS forum;

CREATE SCHEMA IF NOT EXISTS job;

CREATE SCHEMA IF NOT EXISTS event;

CREATE SCHEMA IF NOT EXISTS activity;

CREATE SCHEMA IF NOT EXISTS poll;

CREATE SCHEMA IF NOT EXISTS admin;

CREATE EXTENSION IF NOT EXISTS postgis;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- countries
-- states
-- organizations
-- users
-- public.users
-- directory.departments
-- directory.organization_departments
-- directory.batches
-- directory.person_batches
-- directory.clubs
-- directory.person_clubs
-- committee.roles
-- committee.person_role
-- committee.committees
-- forum.threads
-- forum.thread_voters
-- forum.posts
-- forum.post_voters
-- job.post
-- job.applicable_departments
-- job.organizations
-- job.applications
-- event.events
-- event.event_media
-- event.attendees
-- event.posts
-- activity.photos
-- activity.stories
-- activity.music
-- activity.videos
-- activity.interviews
-- poll.thread
-- poll.options
-- poll.voters
-- admin.reports
-- admin.history
CREATE TABLE public.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL UNIQUE,
    iso VARCHAR(3) NOT NULL UNIQUE,
    phonecode TEXT NOT NULL,
    currency TEXT NOT NULL,
    region TEXT NOT NULL
);

CREATE TABLE public.states (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    country_id UUID NOT NULL REFERENCES public.countries (id),
    location GEOGRAPHY (POINT),
    UNIQUE (country_id, NAME)
);

CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    full_name TEXT NOT NULL,
    picture TEXT,
    display_name TEXT,
    bio TEXT,
    birth_year INT CONSTRAINT valid_birth_year CHECK (birth_year > 1200 AND birth_year <= extract('year' FROM current_date)::INT),
    death_year INT CONSTRAINT valid_death_year CHECK (death_year >= birth_year AND death_year <= extract('year' FROM current_date)::INT),
    country_id UUID REFERENCES public.countries (id),
    added_by UUID REFERENCES public.users (id),
    links JSONB NOT NULL DEFAULT '{}',
    achievements JSONB NOT NULL DEFAULT '{}'
);

CREATE TYPE public.AUTH_PROVIDER AS ENUM (
    'google',
    'apple'
);

CREATE TABLE public.user_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users (id),
    provider public.AUTH_PROVIDER NOT NULL,
    email TEXT UNIQUE NOT NULL,
    refresh_token TEXT,
    external_id TEXT UNIQUE
);

CREATE TYPE public.GENDER AS ENUM (
    'male',
    'female',
    'trans'
);

CREATE TABLE public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    country_id UUID NOT NULL REFERENCES public.countries (id),
    state_id UUID REFERENCES public.states (id),
    gender_exclusive public.GENDER,
    has_departments BOOLEAN NOT NULL DEFAULT TRUE,
    has_faculties BOOLEAN NOT NULL DEFAULT TRUE,
    UNIQUE (country_id, state_id, NAME)
);

-- HELP, SUGGESTION
CREATE TABLE forum.thread_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL
);

INSERT INTO forum.thread_types (name)
    VALUES ('GENERAL'), ('HELP'), ('ANNOUNCEMENTS');

CREATE TABLE forum.forums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    name TEXT NOT NULL,
    cover_image TEXT
);

CREATE TABLE forum.threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    forum_id UUID REFERENCES forum.forums (id),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    votes INT NOT NULL DEFAULT 0,
    thread_type_id UUID NOT NULL REFERENCES forum.thread_types (id),
    created_by UUID NOT NULL REFERENCES public.users (id)
);

CREATE TABLE forum.thread_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID NOT NULL REFERENCES public.users (id),
    thread_id UUID NOT NULL REFERENCES forum.threads (id),
    downvote BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (user_id, thread_id)
);

CREATE TABLE forum.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    thread_id UUID NOT NULL REFERENCES forum.threads (id),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    body TEXT NOT NULL,
    votes INT NOT NULL DEFAULT 0,
    created_by UUID NOT NULL REFERENCES public.users (id),
    parent_post_id UUID REFERENCES forum.posts (id)
);

CREATE TABLE forum.post_votes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID NOT NULL REFERENCES public.users (id),
    post_id UUID NOT NULL REFERENCES forum.posts (id),
    downvote BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE (user_id, post_id)
);

CREATE INDEX ON forum.post_votes (post_id, downvote);

CREATE TABLE directory.faculties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES public.organizations (id),
    UNIQUE (organization_id, NAME)
);

CREATE TABLE directory.departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES public.organizations (id),
    faculty_id UUID REFERENCES directory.faculties (id),
    UNIQUE (organization_id, NAME)
);

CREATE TABLE directory.programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES public.organizations (id),
    faculty_id UUID REFERENCES directory.faculties (id),
    UNIQUE (organization_id, NAME)
);

CREATE TABLE directory.batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    graduating_year INT CONSTRAINT valid_graduating_year CHECK (graduating_year > 1200 AND graduating_year <= extract('year' FROM current_date + INTERVAL '10 years')::INT),
    batch_identifier TEXT,
    organization_id UUID NOT NULL REFERENCES public.organizations (id),
    department_id UUID REFERENCES directory.departments (id),
    program_id UUID REFERENCES directory.programs (id),
    forum_id UUID REFERENCES forum.forums (id),
    UNIQUE (organization_id, department_id, program_id, graduating_year)
);

CREATE TABLE directory.batch_persons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    batch_id UUID NOT NULL REFERENCES directory.batches (id),
    user_id UUID NOT NULL REFERENCES public.users (id),
    student_id TEXT,
    UNIQUE (batch_id, user_id)
);

CREATE TABLE directory.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID NOT NULL UNIQUE REFERENCES public.users (id),
    country_id UUID REFERENCES public.countries (id),
    phone TEXT UNIQUE,
    email TEXT UNIQUE
);

CREATE TABLE committee.committees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES public.organizations (id),
    UNIQUE (organization_id, NAME)
);

CREATE TABLE committee.roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    committee_id UUID NOT NULL REFERENCES committee.committees (id),
    UNIQUE (committee_id, NAME)
);

CREATE TABLE committee.user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    user_id UUID NOT NULL REFERENCES public.users (id),
    role_id UUID NOT NULL REFERENCES committee.roles (id),
    UNIQUE (user_id, role_id)
);

CREATE TYPE public.CHANGE_TYPE AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE'
);

CREATE TABLE admin.history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_by UUID NOT NULL REFERENCES public.users (id),
    resource TEXT NOT NULL,
    resource_id UUID NOT NULL,
    parent_resource TEXT NOT NULL,
    parent_resource_id UUID NOT NULL,
    action public.CHANGE_TYPE NOT NULL,
    diff JSONB NOT NULL DEFAULT '{}'
);
