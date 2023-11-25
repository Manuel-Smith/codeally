--
-- PostgreSQL database dump
--

-- Dumped from database version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.16 (Ubuntu 12.16-0ubuntu0.20.04.1)

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

DROP DATABASE universe;
--
-- Name: universe; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE universe WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE universe OWNER TO freecodecamp;

\connect universe

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: asteroid; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.asteroid (
    asteroid_id integer NOT NULL,
    name character varying(255),
    has_life character varying(255) NOT NULL
);


ALTER TABLE public.asteroid OWNER TO freecodecamp;

--
-- Name: galaxy; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.galaxy (
    galaxy_id integer NOT NULL,
    name character varying(255),
    age_in_millions_of_years integer,
    mass_in_millions_of_kilograms integer,
    distance_from_andromeda numeric(10,4),
    is_spherical boolean,
    description text NOT NULL
);


ALTER TABLE public.galaxy OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.galaxy_galaxy_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.galaxy_galaxy_id_seq OWNER TO freecodecamp;

--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.galaxy_galaxy_id_seq OWNED BY public.galaxy.galaxy_id;


--
-- Name: moon; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.moon (
    moon_id integer NOT NULL,
    name character varying(255),
    mass_in_millions_of_kilograms integer,
    age_in_millions_of_years integer,
    distance_from_andromeda numeric(10,4),
    description text,
    is_spherical boolean,
    planet_id integer NOT NULL
);


ALTER TABLE public.moon OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.moon_moon_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.moon_moon_id_seq OWNER TO freecodecamp;

--
-- Name: moon_moon_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.moon_moon_id_seq OWNED BY public.moon.moon_id;


--
-- Name: planet; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.planet (
    planet_id integer NOT NULL,
    name character varying(255),
    age_in_millions_of_years integer,
    mass_in_millions_of_kilograms integer,
    distance_from_andromeda numeric(10,4),
    description text,
    is_spherical boolean,
    star_id integer NOT NULL
);


ALTER TABLE public.planet OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.planet_planet_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.planet_planet_id_seq OWNER TO freecodecamp;

--
-- Name: planet_planet_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.planet_planet_id_seq OWNED BY public.planet.planet_id;


--
-- Name: star; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.star (
    star_id integer NOT NULL,
    name character varying(255),
    age_in_millions_of_years integer,
    mass_in_millions_of_kilograms integer,
    distance_from_andromeda numeric(10,4),
    description text,
    is_spherical boolean,
    galaxy_id integer NOT NULL
);


ALTER TABLE public.star OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE; Schema: public; Owner: freecodecamp
--

CREATE SEQUENCE public.star_star_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.star_star_id_seq OWNER TO freecodecamp;

--
-- Name: star_star_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: freecodecamp
--

ALTER SEQUENCE public.star_star_id_seq OWNED BY public.star.star_id;


--
-- Name: galaxy galaxy_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy ALTER COLUMN galaxy_id SET DEFAULT nextval('public.galaxy_galaxy_id_seq'::regclass);


--
-- Name: moon moon_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon ALTER COLUMN moon_id SET DEFAULT nextval('public.moon_moon_id_seq'::regclass);


--
-- Name: planet planet_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet ALTER COLUMN planet_id SET DEFAULT nextval('public.planet_planet_id_seq'::regclass);


--
-- Name: star star_id; Type: DEFAULT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star ALTER COLUMN star_id SET DEFAULT nextval('public.star_star_id_seq'::regclass);


--
-- Data for Name: asteroid; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.asteroid VALUES (1, 'Ceres', 'false');
INSERT INTO public.asteroid VALUES (2, 'Vesta', 'false');
INSERT INTO public.asteroid VALUES (3, 'Pallas', 'false');
INSERT INTO public.asteroid VALUES (4, 'Hygiea', 'false');
INSERT INTO public.asteroid VALUES (5, 'Juno', 'false');


--
-- Data for Name: galaxy; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.galaxy VALUES (1, 'Milky Way', 14192, 77014, 99490.0000, false, 'Our galaxy, a barred spiral galaxy');
INSERT INTO public.galaxy VALUES (2, 'Andromeda', 12588, 55014, 24490.0000, false, 'The closest spiral galaxy to the Milky Way');
INSERT INTO public.galaxy VALUES (3, 'Triangulum', 12558, 85014, 40090.0000, true, 'A spiral galaxy about 3 million light-years away');
INSERT INTO public.galaxy VALUES (4, 'Messier 87', 10158, 39014, 55090.0000, true, 'An elliptical galaxy located about 54 million light-years from Earth');
INSERT INTO public.galaxy VALUES (5, 'Centaurus A', 12458, 27614, 47290.0000, true, 'An elliptical galaxy located about 12 million light-years from Earth');
INSERT INTO public.galaxy VALUES (6, 'NGC 5128', 14858, 98614, 79290.0000, true, 'A lenticular galaxy located about 10 million light-years from Earth');


--
-- Data for Name: moon; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.moon VALUES (1, 'Phobos', 9530, 455, 402442.0000, 'A small, irregularly shaped moon of Mars', true, 4);
INSERT INTO public.moon VALUES (2, 'Deimos', 1530, 4525, 142442.0000, 'A smaller, irregularly shaped moon of Mars', true, 4);
INSERT INTO public.moon VALUES (3, 'Io', 19000, 52525, 542242.0000, 'A volcanic moon of Jupiter', true, 5);
INSERT INTO public.moon VALUES (4, 'Europa', 48800, 12525, 5242.0000, 'An icy moon of Jupiter with a possible subsurface ocean', true, 5);
INSERT INTO public.moon VALUES (5, 'Ganymede', 1405800, 11442525, 524442.0000, 'The largest moon in the solar system, with a possible subsurface ocean', true, 5);
INSERT INTO public.moon VALUES (6, 'Callistro', 45800, 13442525, 624444.0000, 'The largest cratered moon of Jupiter', true, 5);
INSERT INTO public.moon VALUES (7, 'Minimas', 58400, 12442525, 224444.0000, 'A small, irregularly shaped moon of Saturn', true, 6);
INSERT INTO public.moon VALUES (8, 'Enceladus', 37400, 83442525, 104444.0000, 'An icy moon of Saturn with a possible surface ocean', true, 6);
INSERT INTO public.moon VALUES (9, 'Tethys', 63400, 72442525, 4444.0000, 'A oon of Saturn with a large, bright equatorial ridge', true, 6);
INSERT INTO public.moon VALUES (10, 'Dione', 72400, 6442525, 34475.0000, 'A oon of Saturn with a heavily cratered surface', true, 6);
INSERT INTO public.moon VALUES (11, 'Rhea', 15400, 4642525, 89475.0000, 'A moon of Saturn of saturn with a ring', true, 6);
INSERT INTO public.moon VALUES (12, 'Titan', 13400, 4542525, 98475.0000, 'The second-largest moon in the solar system, with a dense atmosphere and lakes of liquid methane', true, 4);
INSERT INTO public.moon VALUES (13, 'Ariel', 13500, 2442525, 98475.0000, 'A moon on Uranus with a heavily cratered surface', true, 7);
INSERT INTO public.moon VALUES (14, 'Umbriel', 3500, 1042525, 40475.0000, 'A dark moon of Uranus with a heavily cratered surface', true, 7);
INSERT INTO public.moon VALUES (15, 'Titania', 350930, 192525, 35475.0000, 'A dark moon of Uranus, with a bright surface and ice caps', true, 7);
INSERT INTO public.moon VALUES (16, 'Oberon', 298090, 2525, 735475.0000, 'The second-largest moon of Uranus, with a dark surface and ice caps', true, 7);
INSERT INTO public.moon VALUES (17, 'Ariel II', 34890, 32525, 735475.0000, 'The moon of Ariel with a heavily cratered surface', true, 7);
INSERT INTO public.moon VALUES (18, 'Europa II', 11890, 15525, 87354.0000, 'An icy moon of Europa with a possible subsurface ocean', true, 5);
INSERT INTO public.moon VALUES (19, 'Titan II', 31890, 10525, 24532.0000, 'A moon of Titan with a bright surface and ice caps', true, 4);
INSERT INTO public.moon VALUES (20, 'Deimoss II', 51891, 10554, 16532.0000, 'A smaller, irregularly shaped moon of Deimos', true, 4);


--
-- Data for Name: planet; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.planet VALUES (1, 'Mercury', 4296, 97571, 40018.0000, 'A planet orbiting Arcturus', true, 1);
INSERT INTO public.planet VALUES (2, 'Venus', 4256, 97351, 40058.0000, 'A planet orbiting Arcturus', true, 1);
INSERT INTO public.planet VALUES (3, 'Earth', 242, 27351, 99458.0000, 'A planet orbiting Polaris', true, 2);
INSERT INTO public.planet VALUES (4, 'Mars', 245, 37351, 58458.0000, 'A planet orbiting Polaris', true, 2);
INSERT INTO public.planet VALUES (5, 'Jupiter', 10245, 12351, 99458.0000, 'A gas giant planet orbiting Barnard star', true, 3);
INSERT INTO public.planet VALUES (6, 'Saturn', 10285, 13351, 90458.0000, 'A gas giant planet orbiting Barnard star', true, 3);
INSERT INTO public.planet VALUES (7, 'Uranus', 19285, 57351, 40458.0000, 'An ice giant planet orbiting 47 Ursae Majoris b', true, 4);
INSERT INTO public.planet VALUES (8, 'Neptune', 16705, 56751, 90448.0000, 'An ice giant planet orbiting 47 Ursae Majoris b', true, 4);
INSERT INTO public.planet VALUES (9, 'Pluto', 40705, 96751, 190448.0000, 'A dward planet orbiting HD 142537 b', true, 5);
INSERT INTO public.planet VALUES (11, 'Eris', 44705, 14751, 240448.0000, 'A dward planet orbiting HD 142537 b', true, 5);
INSERT INTO public.planet VALUES (12, 'Kepler-452b', 43045, 28493, 25328.0000, 'A dward planet orbiting HD 142537 b', true, 5);
INSERT INTO public.planet VALUES (13, 'Mario p34', 24045, 32893, 12585.0000, 'A dward planet orbiting HD 142537 b', true, 5);


--
-- Data for Name: star; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.star VALUES (1, 'Arcturus', 4296, 97571, 40018.0000, 'A red giant star', true, 1);
INSERT INTO public.star VALUES (2, 'Polaris', 242, 27892, 99418.0000, 'A bright Cepheid variable star', true, 1);
INSERT INTO public.star VALUES (3, 'Barnards Star', 10080, 12485, 98023.0000, 'A red dwarf star located about 6 light-years from Earth', true, 2);
INSERT INTO public.star VALUES (4, '47 Ursae Majoris b', 10234, 57885, 40023.0000, 'A jupiter-like exoplanet located about 44 light-years from Earth', true, 2);
INSERT INTO public.star VALUES (5, 'HD 142537 b', 10256, 78985, 79023.0000, 'A Neptune-like exoplanet located about 46 light-years from Earth', true, 2);
INSERT INTO public.star VALUES (6, 'Kepler-452b', 10345, 89285, 98023.0000, 'An Earth-like exoplanet located about 1,400 light-years from Earth', true, 3);


--
-- Name: galaxy_galaxy_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.galaxy_galaxy_id_seq', 1, false);


--
-- Name: moon_moon_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.moon_moon_id_seq', 20, true);


--
-- Name: planet_planet_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.planet_planet_id_seq', 13, true);


--
-- Name: star_star_id_seq; Type: SEQUENCE SET; Schema: public; Owner: freecodecamp
--

SELECT pg_catalog.setval('public.star_star_id_seq', 6, true);


--
-- Name: asteroid asteroid_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT asteroid_pkey PRIMARY KEY (asteroid_id);


--
-- Name: galaxy galaxy_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT galaxy_pkey PRIMARY KEY (galaxy_id);


--
-- Name: moon moon_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_pkey PRIMARY KEY (moon_id);


--
-- Name: planet planet_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_pkey PRIMARY KEY (planet_id);


--
-- Name: star star_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_pkey PRIMARY KEY (star_id);


--
-- Name: asteroid unique_asteroid; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.asteroid
    ADD CONSTRAINT unique_asteroid UNIQUE (name);


--
-- Name: galaxy unique_galaxy; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.galaxy
    ADD CONSTRAINT unique_galaxy UNIQUE (name);


--
-- Name: moon unique_moon; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT unique_moon UNIQUE (name);


--
-- Name: planet unique_planet; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT unique_planet UNIQUE (name);


--
-- Name: star unique_star; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT unique_star UNIQUE (name);


--
-- Name: moon moon_planet_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.moon
    ADD CONSTRAINT moon_planet_id_fkey FOREIGN KEY (planet_id) REFERENCES public.planet(planet_id);


--
-- Name: planet planet_star_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.planet
    ADD CONSTRAINT planet_star_id_fkey FOREIGN KEY (star_id) REFERENCES public.star(star_id);


--
-- Name: star star_galaxy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.star
    ADD CONSTRAINT star_galaxy_id_fkey FOREIGN KEY (galaxy_id) REFERENCES public.galaxy(galaxy_id);


--
-- PostgreSQL database dump complete
--

