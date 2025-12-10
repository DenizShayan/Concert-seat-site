export type Slider = {
    ind: number;
    title: string;
    description: string;
    image: string | null;
    url: string;
    concert: number;
};

export type Concert = {
    id: number;
    concert_name: string;
    concert_type: string;
    concert_date: string;
    concert_address: string;
    concert_image: string | null;
    concert_location: string;
    artist_name: string;
    concert_status: string;
    number_of_rows: number;
    number_of_sans: number;
};

export type ConcertListResponse = {
    sliders: Slider[];
    concerts: Concert[];
};