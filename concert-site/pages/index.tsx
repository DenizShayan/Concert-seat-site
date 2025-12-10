import { GetServerSideProps } from "next";
import { ConcertListResponse} from "../types/api";

type HomeProps = {
  concerts: Concert[];
};

export default function Home({ concerts }: HomeProps) {
  return(
    <main className="min-h-screen bg-slate-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Concerts 🎵</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {concerts.map((concert) => (
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
  
  // fetch data from Django backed on each request
  export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
    const res = await fetch("http://127.0.0.1:8000/concerts/");
    const data: ConcertListResponse = await res.json();

    return{
      props: {
        concerts: data.concerts,
      },
    }