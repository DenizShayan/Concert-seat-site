import { GetServerSideProps } from "next";
import { ConcertListResponse, Concert, Slider } from "../types/api";
import { useMemo, useState } from "react";
import Link from "next/link":}

type HomeProps = {
  sliders: Slider[];
  concerts: Concert[];
};

export default function Home({ concerts }: HomeProps) {

  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");
  const [slideIndex, setSlideIndex] = useState(0);
  const activeSlide = sliders.length > 0 ? 

  const filteredConcerts = useMemo(() => {
    return concerts.filter((c) => {
      const q = query.trim().toLowerCase();

      const matchesQuery =
        q.length === 0
          ? true
          : c.concert_name.toLowerCase().includes(q) ||
          c.artist_name.toLowerCase().includes(q) ||
          c.concert_location.toLowerCase().includes(q);

      const matchesType = type === "all" ? true : c.concert_type === type;

      return matchesQuery && matchesType;
    });
  }, [concerts, query, type]);

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Concerts 🎵</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredConcerts.map((concert) => (
          <article
            key={concert.id}
            className="rounded-xl border border-slate-700 bg-slate-800/60 p-4 hover:border-emerald-400 transition"
          >
            <h2 className="text-xl font-semibold mb-1">
              {concert.artist_name}
            </h2>
            <p className="text-slate-300 text-sm mb-2">
              {concert.artist_name}.{concert.concert_location}
            </p>
            <p className="text-sm text-slate-400 mb-1">
              Date: {concert.concert_date}
            </p>
            <p className="text-sm text-slate-400 mb-1">
              Rows: {concert.number_of_rows}. Sans: {concert.number_of_sans}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}

// fetch data from Django backend on each request
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await fetch("https://backend-concert.liara.run/");

  const data: ConcertListResponse = await res.json();

  return {
    props: {
      concerts: data.concerts,
      sliders: data.sliders,
    },
  };

};