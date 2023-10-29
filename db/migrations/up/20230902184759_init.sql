-- UP SCRIPT: init
-- Created by: demouser
-- Created at: 2023/09/02 18:4759

-- Your code goes here
CREATE SCHEMA IF NOT EXISTS public;
CREATE SCHEMA IF NOT EXISTS forum;

CREATE EXTENSION IF NOT EXISTS 'uuid-ossp';

CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    pub_key TEXT NOT NULL,
    email TEXT NOT NULL
);

-- HELP, SUGGESTION
CREATE TABLE forum.thread_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL
);

INSERT INTO forum.thread_types (id, name)
    VALUES ('dd7a1153-ad23-40fb-ba61-14de4954bd36', 'GENERAL'), ( '419123de-c17b-4eb7-bca4-568c738b9c6d', 'HELP'), ( '8b6c518d-30df-4506-b891-e34ccf4c70f1', 'ANNOUNCEMENTS');

CREATE TABLE forum.forums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    name TEXT NOT NULL
);

CREATE TABLE forum.threads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    forum_id UUID NOT NULL REFERENCES forum.forums (id),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    votes INT NOT NULL DEFAULT 0,
    thread_type_id UUID NOT NULL REFERENCES forum.thread_types (id) DEFAULT 'dd7a1153-ad23-40fb-ba61-14de4954bd36', --default is GENERAL
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

