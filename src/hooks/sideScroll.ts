import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
    const elRef = useRef(null);
    useEffect(() => {
        const el: any = elRef.current;
        if (el) {
            const onWheel = (e: any) => {
                if (e.deltaY == 0) return;
                e.preventDefault();
                el.scrollBy(e.deltaY, 10);
            };
            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}