import Lenis from "lenis";
import { useEffect } from "react";

export default function SmoothScroll({
    children,
}: {
    children: React.ReactNode;
}) {
    // FUNGSI LENIS = >
    // UNTUK MEMPERHALUS GERAKAN SCROLL TERHADAP GERAKAN SCROLL WEBSITE AGAR TIDAK KAKU DAN SMOOTH SAAT
    // SCROLLING
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);

    return <>{children}</>;
}
