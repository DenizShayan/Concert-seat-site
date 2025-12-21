import { GetServerSideProps } from "next";
import { Concert } from "../../types/api";

type Props = {
    concert: Concert;
}

export default function ConcertPage({ concert }: Props) {
    return (
        <main className="min-h-screen bg-slate-900 text-white px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{concert.artist_name} 🎵</h1>
            <div className="rounded-xl border border-slate-700 bg-slate-800/60 p-4">
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
            </div>
        </main>
    )