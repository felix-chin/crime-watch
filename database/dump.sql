--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.searches DROP CONSTRAINT searches_pkey;
ALTER TABLE ONLY public.bookmarks DROP CONSTRAINT bookmarks_pkey;
ALTER TABLE public.users ALTER COLUMN "userId" DROP DEFAULT;
ALTER TABLE public.searches ALTER COLUMN "searchId" DROP DEFAULT;
ALTER TABLE public.bookmarks ALTER COLUMN "bookmarkId" DROP DEFAULT;
DROP SEQUENCE public."users_userId_seq";
DROP TABLE public.users;
DROP SEQUENCE public."searches_searchId_seq";
DROP TABLE public.searches;
DROP SEQUENCE public."bookmarks_bookmarkId_seq";
DROP TABLE public.bookmarks;
DROP EXTENSION plpgsql;
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.bookmarks (
    "bookmarkId" integer NOT NULL,
    "userId" integer NOT NULL,
    incident json NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: bookmarks_bookmarkId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."bookmarks_bookmarkId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: bookmarks_bookmarkId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."bookmarks_bookmarkId_seq" OWNED BY public.bookmarks."bookmarkId";


--
-- Name: searches; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.searches (
    "searchId" integer NOT NULL,
    "userId" integer NOT NULL,
    location text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: searches_searchId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."searches_searchId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: searches_searchId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."searches_searchId_seq" OWNED BY public.searches."searchId";


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    "userId" integer NOT NULL,
    username text NOT NULL,
    name text NOT NULL,
    "defaultLocation" text NOT NULL
);


--
-- Name: users_userId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_userId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."users_userId_seq" OWNED BY public.users."userId";


--
-- Name: bookmarks bookmarkId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks ALTER COLUMN "bookmarkId" SET DEFAULT nextval('public."bookmarks_bookmarkId_seq"'::regclass);


--
-- Name: searches searchId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.searches ALTER COLUMN "searchId" SET DEFAULT nextval('public."searches_searchId_seq"'::regclass);


--
-- Name: users userId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN "userId" SET DEFAULT nextval('public."users_userId_seq"'::regclass);


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.bookmarks ("bookmarkId", "userId", incident, "createdAt") FROM stdin;
\.


--
-- Data for Name: searches; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.searches ("searchId", "userId", location, "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users ("userId", username, name, "defaultLocation") FROM stdin;
3	crime_watcher	Detective Pikachu	Chicago
1	anime_kotaku	Uzair Ashraf	Los Angeles
2	final_boss	Tim Davis	San Francisco
\.


--
-- Name: bookmarks_bookmarkId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."bookmarks_bookmarkId_seq"', 19, true);


--
-- Name: searches_searchId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."searches_searchId_seq"', 82, true);


--
-- Name: users_userId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."users_userId_seq"', 3, true);


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY ("bookmarkId");


--
-- Name: searches searches_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.searches
    ADD CONSTRAINT searches_pkey PRIMARY KEY ("searchId");


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY ("userId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
