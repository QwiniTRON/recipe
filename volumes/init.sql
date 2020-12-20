--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

-- Started on 2020-12-20 15:31:32


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

--
-- TOC entry 2890 (class 1262 OID 16468)
-- Name: curs; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE curs;

ALTER DATABASE curs OWNER TO postgres;

\connect curs

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
-- TOC entry 205 (class 1259 OID 16483)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(56),
    description text NOT NULL
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16481)
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.category_id_seq OWNER TO postgres;

--
-- TOC entry 2891 (class 0 OID 0)
-- Dependencies: 204
-- Name: category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;


--
-- TOC entry 211 (class 1259 OID 16530)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    author_id integer,
    recipe_id integer,
    content text NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16528)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 2892 (class 0 OID 0)
-- Dependencies: 210
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 209 (class 1259 OID 16517)
-- Name: ingridients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingridients (
    id integer NOT NULL,
    recipe_id integer,
    title character varying(48) NOT NULL
);


ALTER TABLE public.ingridients OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 16515)
-- Name: ingridients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingridients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingridients_id_seq OWNER TO postgres;

--
-- TOC entry 2893 (class 0 OID 0)
-- Dependencies: 208
-- Name: ingridients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingridients_id_seq OWNED BY public.ingridients.id;


--
-- TOC entry 207 (class 1259 OID 16494)
-- Name: recipe; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe (
    id integer NOT NULL,
    name character varying(56) DEFAULT 'без имени'::character varying,
    photo_path text DEFAULT 'default.png'::text,
    description text NOT NULL,
    category_id integer,
    author_id integer,
    creat_date date DEFAULT CURRENT_DATE NOT NULL
);


ALTER TABLE public.recipe OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 16492)
-- Name: recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_id_seq OWNER TO postgres;

--
-- TOC entry 2894 (class 0 OID 0)
-- Dependencies: 206
-- Name: recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipe.id;


--
-- TOC entry 212 (class 1259 OID 16550)
-- Name: session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16471)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying(56) NOT NULL,
    login text NOT NULL,
    nickname character varying(56) NOT NULL,
    status integer DEFAULT 2
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16469)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 2895 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2722 (class 2604 OID 16486)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);


--
-- TOC entry 2728 (class 2604 OID 16533)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 2727 (class 2604 OID 16520)
-- Name: ingridients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingridients ALTER COLUMN id SET DEFAULT nextval('public.ingridients_id_seq'::regclass);


--
-- TOC entry 2723 (class 2604 OID 16497)
-- Name: recipe id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);


--
-- TOC entry 2720 (class 2604 OID 16474)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2877 (class 0 OID 16483)
-- Dependencies: 205
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, name, description) VALUES (2, 'салаты', 'салаты, вкусно и просто');
INSERT INTO public.category (id, name, description) VALUES (3, 'горячее', 'горячие блюда');
INSERT INTO public.category (id, name, description) VALUES (4, 'закуски', 'закуски и разные мелочи');
INSERT INTO public.category (id, name, description) VALUES (5, 'десерты', 'вкусности и все что с ними связанно');
INSERT INTO public.category (id, name, description) VALUES (1, 'супы', 'категория для обычных супов.');
INSERT INTO public.category (id, name, description) VALUES (6, 'завтраки', 'очень полезные рецепты для тех кто любит завтраки и встаёт рано.');


--
-- TOC entry 2883 (class 0 OID 16530)
-- Dependencies: 211
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.comments (id, author_id, recipe_id, content, create_time) VALUES (14, 2, 8, 'Привет комментраии!', '2020-11-24 21:22:18.877864');
INSERT INTO public.comments (id, author_id, recipe_id, content, create_time) VALUES (15, 2, 8, 'Я тут просто посидеть.', '2020-11-24 21:22:28.13676');
INSERT INTO public.comments (id, author_id, recipe_id, content, create_time) VALUES (16, 4, 8, 'Ну посиди', '2020-11-24 21:22:53.935606');
INSERT INTO public.comments (id, author_id, recipe_id, content, create_time) VALUES (19, 5, 17, 'мой первый комментарий в жизни.', '2020-12-16 23:25:52.755303');


--
-- TOC entry 2881 (class 0 OID 16517)
-- Dependencies: 209
-- Data for Name: ingridients; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ingridients (id, recipe_id, title) VALUES (12, 8, 'помидоры 500гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (13, 8, 'рис 500гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (14, 8, 'сыр 100гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (15, 8, 'репчатый лук 100гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (16, 8, 'говядина 100гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (22, 11, 'помидоры 500гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (23, 12, 'картошка 250 гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (24, 12, 'колбаса 50 гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (25, 12, 'макароны 100 гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (26, 13, 'сахар 1000гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (27, 13, 'тесто пельменное 1000гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (28, 14, 'помидоры 500гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (29, 14, 'тест ингредиент 2');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (30, 14, 'qwerewqrwer 20 мл.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (31, 15, 'Ингредиент 1');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (32, 15, 'Ингредиент 2');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (33, 15, 'Ингредиент 3');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (34, 15, 'Ингредиент 4');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (37, 9, 'тест ингредиент 2');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (38, 9, 'тест ингредиент 3');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (39, 16, 'простота');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (44, 17, 'перец чили 100гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (45, 17, 'соус чили 500гр.');
INSERT INTO public.ingridients (id, recipe_id, title) VALUES (46, 17, 'макарена 10шт.');


--
-- TOC entry 2879 (class 0 OID 16494)
-- Dependencies: 207
-- Data for Name: recipe; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (8, 'суп харчо', '1605280264102sup-harcho.jpg', 'В Грузии в разных областях готовят харчо по-разному. Мы представляем классический грузинский рецепт супа харчо из привычных для нашего стола ингредиентов. Можно использовать говядину, если хотите блюдо попостнее, и баранину — для большей жирности. Но мясо обязательно должно быть на косточке! Краснодарский рис заменит грецкий орех из классического рецепта грузинских хозяек. А помидоры добавят необходимую кислинку вместо алычи. Для этих же целей можно использовать чернослив или гранатовый сок. И не стоит забывать главный секрет харчо — пряных специй и рубленой зелени не жалеть.', 1, 2, '2020-11-13');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (11, 'Тестовый рецепт 3', '1605280945806city.jpg', 'Тестовый рецепт 3 текст', 4, 2, '2020-11-13');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (12, 'Рецепт суп вкусный', '1605811050428eat4.jpg', 'Ну очень вкусный суп. Честно.', 1, 3, '2020-11-19');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (13, 'Тестовый рецепт 4', '1605811112565eat5.jpg', 'Очень вкусный пирог.', 5, 3, '2020-11-19');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (14, 'Пятый рецепт', '1605811413248pixels.png', 'Рецепт для теста, хотя можно попробовать приготовить.', 4, 3, '2020-11-19');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (15, 'Примерный формат рецепта', '1605811478869eat3.jpg', 'Тут место для описания и шагов с советами по приготовлению.', 3, 3, '2020-11-19');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (9, 'Рецепт для теста.', '1606312252144lenin.svg', 'Внимание происходит тест', 3, 2, '2020-11-13');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (16, 'Просто рецепт теперь на новой базе', '1606350315391img1.jpg', 'Очень просто всё.', 2, 1, '2020-11-26');
INSERT INTO public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) VALUES (17, 'острый парень', '1608150279289igm3.jpg', 'Сбалансированный комплект двух наивкуснейших ингредиентов заставят вас и страдать и наслаждаться этим шедевром кулинарии.', 2, 5, '2020-12-16');


--
-- TOC entry 2884 (class 0 OID 16550)
-- Dependencies: 212
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.session (sid, sess, expire) VALUES ('eVAKR18OuC4xhOANAG_9BUci8m_1BnGe', '{"cookie":{"originalMaxAge":86400000,"expires":"2020-12-18T23:02:01.837Z","httpOnly":true,"path":"/"},"passport":{"user":1}}', '2020-12-19 02:58:54');


--
-- TOC entry 2875 (class 0 OID 16471)
-- Dependencies: 203
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, password, login, nickname, status) VALUES (1, '12345678', 'u1@mail.ru', 'admin', 1);
INSERT INTO public.users (id, password, login, nickname, status) VALUES (2, '1234567', 'u2@mail.ru', 'userrrr', 2);
INSERT INTO public.users (id, password, login, nickname, status) VALUES (3, '123456', 'u3@mail.ru', 'urrre', 2);
INSERT INTO public.users (id, password, login, nickname, status) VALUES (4, '123456', 'u4@mail.ru', 'tester_vanek', 2);
INSERT INTO public.users (id, password, login, nickname, status) VALUES (5, '123456', 'u10@mail.ru', 'moodo', 2);


--
-- TOC entry 2896 (class 0 OID 0)
-- Dependencies: 204
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_id_seq', 6, true);


--
-- TOC entry 2897 (class 0 OID 0)
-- Dependencies: 210
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 19, true);


--
-- TOC entry 2898 (class 0 OID 0)
-- Dependencies: 208
-- Name: ingridients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingridients_id_seq', 46, true);


--
-- TOC entry 2899 (class 0 OID 0)
-- Dependencies: 206
-- Name: recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_id_seq', 17, true);


--
-- TOC entry 2900 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 2733 (class 2606 OID 16491)
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- TOC entry 2739 (class 2606 OID 16539)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 2737 (class 2606 OID 16522)
-- Name: ingridients ingridients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingridients
    ADD CONSTRAINT ingridients_pkey PRIMARY KEY (id);


--
-- TOC entry 2735 (class 2606 OID 16504)
-- Name: recipe recipe_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);


--
-- TOC entry 2742 (class 2606 OID 16557)
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- TOC entry 2731 (class 2606 OID 16480)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2740 (class 1259 OID 16558)
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- TOC entry 2746 (class 2606 OID 16540)
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 2747 (class 2606 OID 16545)
-- Name: comments comments_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;


--
-- TOC entry 2745 (class 2606 OID 16523)
-- Name: ingridients ingridients_recipe_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingridients
    ADD CONSTRAINT ingridients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;


--
-- TOC entry 2744 (class 2606 OID 16510)
-- Name: recipe recipe_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 2743 (class 2606 OID 16505)
-- Name: recipe recipe_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE SET NULL;


-- Completed on 2020-12-20 15:31:32

--
-- PostgreSQL database dump complete
--

