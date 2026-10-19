import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart, Send } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

type Wish = {
  id: string;
  name: string;
  attendance: string;
  guest_count: number;
  message: string;
  created_at: string;
};

const attendanceLabel: Record<string, string> = {
  hadir: "Hadir",
  tidak_hadir: "Tidak hadir",
  ragu: "Masih ragu",
};
const previewWishName = "budi santoso";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const menit = Math.floor(diff / 60000);
  if (menit < 1) return "baru saja";
  if (menit < 60) return `${menit} menit lalu`;
  const jam = Math.floor(menit / 60);
  if (jam < 24) return `${jam} jam lalu`;
  return `${Math.floor(jam / 24)} hari lalu`;
}

export function WishesSection({ guestName }: { guestName: string }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(guestName === "Tamu Undangan" ? "" : guestName);
  const [attendance, setAttendance] = useState("hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const wishesQuery = useQuery({
    queryKey: ["wishes"],
    enabled: typeof window !== "undefined",
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wishes")
        .select("id, name, attendance, guest_count, message, created_at")
        .order("created_at", { ascending: false })
        .limit(100);
      if (error) throw error;
      return (data ?? []) as Wish[];
    },
  });
  const wishes = wishesQuery.data ?? [];
  const hasGuestWishes = wishes.some(
    (wish) => wish.name.trim().toLocaleLowerCase("id-ID") !== previewWishName,
  );
  const displayedWishes = hasGuestWishes
    ? wishes.filter((wish) => wish.name.trim().toLocaleLowerCase("id-ID") !== previewWishName)
    : wishes;

  const mutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("wishes").insert({
        name: name.trim(),
        attendance,
        guest_count: guestCount,
        message: message.trim(),
      });
      if (error) throw error;
    },
    onSuccess: () => {
      setMessage("");
      setSent(true);
      setError(null);
      void queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
    onError: () => setError("Ucapan gagal dikirim. Coba lagi sebentar lagi ya."),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Mohon isi nama dan ucapan terlebih dahulu.");
      return;
    }
    setError(null);
    mutation.mutate();
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-accent";

  return (
    <div className="mx-auto mt-10 max-w-xl space-y-8">
      <form onSubmit={submit} className="space-y-3 rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm backdrop-blur">
        <input
          className={inputClass}
          placeholder="Nama Anda"
          value={name}
          maxLength={60}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <select
            className={inputClass}
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
            aria-label="Konfirmasi kehadiran"
          >
            <option value="hadir">Hadir</option>
            <option value="tidak_hadir">Tidak hadir</option>
            <option value="ragu">Masih ragu</option>
          </select>
          <select
            className={inputClass}
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            aria-label="Jumlah tamu"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} orang
              </option>
            ))}
          </select>
        </div>
        <textarea
          className={`${inputClass} min-h-28 resize-none`}
          placeholder="Tulis ucapan & doa untuk kedua mempelai"
          value={message}
          maxLength={500}
          onChange={(e) => setMessage(e.target.value)}
        />
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
        {sent && !error ? (
          <p className="text-sm text-primary">Terima kasih, ucapan Anda sudah kami terima.</p>
        ) : null}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium tracking-wide text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {mutation.isPending ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>

      <div className="space-y-3">
        {wishesQuery.isLoading ? (
          <p className="text-center text-sm text-muted-foreground">Memuat ucapan...</p>
        ) : null}
        {!wishesQuery.isLoading && displayedWishes.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Belum ada ucapan. Jadilah yang pertama memberi doa.
          </p>
        ) : null}
        <div className="max-h-96 space-y-3 overflow-y-auto pr-1">
          {displayedWishes.map((wish) => (
            <div key={wish.id} className="rounded-xl border border-border/60 bg-background/60 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="font-display text-lg text-foreground">{wish.name}</p>
                <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[0.65rem] uppercase tracking-wider text-primary">
                  {attendanceLabel[wish.attendance] ?? wish.attendance}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{wish.message}</p>
              <p className="mt-2 flex items-center gap-1 text-[0.7rem] text-muted-foreground/80">
                <Heart className="h-3 w-3" /> {timeAgo(wish.created_at)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
