PGDMP     8                
    x            curs    12.4    12.4 0    G           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            H           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            I           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            J           1262    16468    curs    DATABASE     �   CREATE DATABASE curs WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Russian_Russia.1251' LC_CTYPE = 'Russian_Russia.1251';
    DROP DATABASE curs;
                postgres    false            �            1259    16483    category    TABLE     y   CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(56),
    description text NOT NULL
);
    DROP TABLE public.category;
       public         heap    postgres    false            �            1259    16481    category_id_seq    SEQUENCE     �   CREATE SEQUENCE public.category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.category_id_seq;
       public          postgres    false    205            K           0    0    category_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.category_id_seq OWNED BY public.category.id;
          public          postgres    false    204            �            1259    16530    comments    TABLE     �   CREATE TABLE public.comments (
    id integer NOT NULL,
    author_id integer,
    recipe_id integer,
    content text NOT NULL,
    create_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.comments;
       public         heap    postgres    false            �            1259    16528    comments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.comments_id_seq;
       public          postgres    false    211            L           0    0    comments_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
          public          postgres    false    210            �            1259    16517    ingridients    TABLE     ~   CREATE TABLE public.ingridients (
    id integer NOT NULL,
    recipe_id integer,
    title character varying(48) NOT NULL
);
    DROP TABLE public.ingridients;
       public         heap    postgres    false            �            1259    16515    ingridients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingridients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.ingridients_id_seq;
       public          postgres    false    209            M           0    0    ingridients_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.ingridients_id_seq OWNED BY public.ingridients.id;
          public          postgres    false    208            �            1259    16494    recipe    TABLE     :  CREATE TABLE public.recipe (
    id integer NOT NULL,
    name character varying(56) DEFAULT 'без имени'::character varying,
    photo_path text DEFAULT 'default.png'::text,
    description text NOT NULL,
    category_id integer,
    author_id integer,
    creat_date date DEFAULT CURRENT_DATE NOT NULL
);
    DROP TABLE public.recipe;
       public         heap    postgres    false            �            1259    16492    recipe_id_seq    SEQUENCE     �   CREATE SEQUENCE public.recipe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.recipe_id_seq;
       public          postgres    false    207            N           0    0    recipe_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.recipe_id_seq OWNED BY public.recipe.id;
          public          postgres    false    206            �            1259    16550    session    TABLE     �   CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);
    DROP TABLE public.session;
       public         heap    postgres    false            �            1259    16471    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    password character varying(56) NOT NULL,
    login text NOT NULL,
    nickname character varying(56) NOT NULL,
    status integer DEFAULT 2
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16469    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    203            O           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    202            �
           2604    16486    category id    DEFAULT     j   ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.category_id_seq'::regclass);
 :   ALTER TABLE public.category ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �
           2604    16533    comments id    DEFAULT     j   ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
 :   ALTER TABLE public.comments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    211    211            �
           2604    16520    ingridients id    DEFAULT     p   ALTER TABLE ONLY public.ingridients ALTER COLUMN id SET DEFAULT nextval('public.ingridients_id_seq'::regclass);
 =   ALTER TABLE public.ingridients ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208    209            �
           2604    16497 	   recipe id    DEFAULT     f   ALTER TABLE ONLY public.recipe ALTER COLUMN id SET DEFAULT nextval('public.recipe_id_seq'::regclass);
 8   ALTER TABLE public.recipe ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    206    207    207            �
           2604    16474    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            =          0    16483    category 
   TABLE DATA           9   COPY public.category (id, name, description) FROM stdin;
    public          postgres    false    205   !5       C          0    16530    comments 
   TABLE DATA           R   COPY public.comments (id, author_id, recipe_id, content, create_time) FROM stdin;
    public          postgres    false    211   '6       A          0    16517    ingridients 
   TABLE DATA           ;   COPY public.ingridients (id, recipe_id, title) FROM stdin;
    public          postgres    false    209   �6       ?          0    16494    recipe 
   TABLE DATA           g   COPY public.recipe (id, name, photo_path, description, category_id, author_id, creat_date) FROM stdin;
    public          postgres    false    207   �7       D          0    16550    session 
   TABLE DATA           4   COPY public.session (sid, sess, expire) FROM stdin;
    public          postgres    false    212   d;       ;          0    16471    users 
   TABLE DATA           F   COPY public.users (id, password, login, nickname, status) FROM stdin;
    public          postgres    false    203   <       P           0    0    category_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.category_id_seq', 6, true);
          public          postgres    false    204            Q           0    0    comments_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.comments_id_seq', 18, true);
          public          postgres    false    210            R           0    0    ingridients_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.ingridients_id_seq', 38, true);
          public          postgres    false    208            S           0    0    recipe_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.recipe_id_seq', 15, true);
          public          postgres    false    206            T           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 4, true);
          public          postgres    false    202            �
           2606    16491    category category_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.category DROP CONSTRAINT category_pkey;
       public            postgres    false    205            �
           2606    16539    comments comments_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_pkey;
       public            postgres    false    211            �
           2606    16522    ingridients ingridients_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ingridients
    ADD CONSTRAINT ingridients_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.ingridients DROP CONSTRAINT ingridients_pkey;
       public            postgres    false    209            �
           2606    16504    recipe recipe_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_pkey;
       public            postgres    false    207            �
           2606    16557    session session_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
 >   ALTER TABLE ONLY public.session DROP CONSTRAINT session_pkey;
       public            postgres    false    212            �
           2606    16480    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            �
           1259    16558    IDX_session_expire    INDEX     J   CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);
 (   DROP INDEX public."IDX_session_expire";
       public            postgres    false    212            �
           2606    16540     comments comments_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_author_id_fkey;
       public          postgres    false    203    2731    211            �
           2606    16545     comments comments_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;
 J   ALTER TABLE ONLY public.comments DROP CONSTRAINT comments_recipe_id_fkey;
       public          postgres    false    211    207    2735            �
           2606    16523 &   ingridients ingridients_recipe_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ingridients
    ADD CONSTRAINT ingridients_recipe_id_fkey FOREIGN KEY (recipe_id) REFERENCES public.recipe(id) ON DELETE CASCADE;
 P   ALTER TABLE ONLY public.ingridients DROP CONSTRAINT ingridients_recipe_id_fkey;
       public          postgres    false    209    2735    207            �
           2606    16510    recipe recipe_author_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;
 F   ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_author_id_fkey;
       public          postgres    false    203    207    2731            �
           2606    16505    recipe recipe_category_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.recipe
    ADD CONSTRAINT recipe_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(id) ON DELETE SET NULL;
 H   ALTER TABLE ONLY public.recipe DROP CONSTRAINT recipe_category_id_fkey;
       public          postgres    false    207    205    2733            =   �   x�]��m�0���)8@a���t��A�5���V�`��
w�(�@�'����*6��ٲ�W�FL<��`5dÅ�l�b��U��t]f$À���AO~��X�M�h���;_=8�&Rx��HR&��㵫� 0��xrs��4�	�h֗���{��QaĚ<�����M�fV��@��fۆ�c^6��ܸ�h-���ÊjV���(�]�����~U\Eq���o햽��.�K�2P�:��!�?JO#�      C   �   x�e���0��s2E�Q�<�,�#���
�
�F8�T�b��?�
UVt�#Uz����J�^2����.��S8�8 �8A�9����cnF�����P����<��g��0[p1EQ�.]x���6	��]�c����\xRN      A     x���Mn�0���)|�mH�]���M���j%*u�c�RK4��
37�3	���@�=�7���3�QC�4��R�qL5�Hj̎�g�$s.�)�7L/JOg~��.�GQ��t��V!�F� ����6Fh}gc�6�N�w\���e�X]�U0PKG�r�MG�Qu����=�'�J����_� �)z=��<.G�����f~��z�s�&��O�M�c�8bh���jw��e�kGm$��>�y��5��vZi�E�H���;gEV>ER�_��IV      ?   i  x��UMo�@=;�b�����!�/\��j��Rт���RZ= Dq�ꄸu����_�{���@Q���̛��Lڞ难^(3Щ�7���V�D� j�a=;\��|����|����J����ֹΕ+��)��fhJ�z�gH�5=s΃��4=��ث�Qz���*
����l�x��LO���zf��\(=u��:G��S��A�%���I�k.XX���-����r���51aET�9A<ZP��dy��Y��;C�4H���b7�F�S��k$�S!�dH���ה�1��F�r|2E�nY��s���F*��m&��s��>��?��B��I�P/���(]��l�tM� fib"-��F G:�����U����(��`��bN���C1�.H{T�C(�4,�q�d��ԥ���+���9H���L��;�a�;֡�&���Sx%A�ӎ�LI:Q��:D���g�z!ě�����gJ`ά��ސF�LRsL2h�*G�a�VH'�}��G�[R�궛�,ͫP0#L�J�&��Y��[$�G��Hz��7������@�)OX��B/� 
��p=l6����+�>�ڬ��F�������K�y��ĸS��╒����YT�үL'U�a$A��7�c[������ӕ �

�p��	[n����������a%��[�˿�B�3�����j�����w�TU���ý��G����mv�!�v����ĭR��$�0�o7�M�K�f���	A�fao���P0�ʔ/�?l�[`��LRz�>�n��BQ�nG��'x�������RYJ�tt�s�9����6���'�V3��$
�x�`��?z��P�؅�ܙr<n�}ؿKĢu7?���oh���      D   �   x�=��
�@E���f>�م�~!��ʠ��03�!�{��.ι��s�D���4NP�y=���8�In�Ptݫ��F�d]�m�\�a_���w�� j�0@�Ħ�F���<�a�������"j�/0-{n��t5�����^nz�%0:M�_�]d����X���H�4�      ;   Y   x�E�=� @�=�I���Đ؁(@=���=b��i^@iM!^CQG��SP�U���eP�����n�[�ڤ�w�rڲ�� �b#C     