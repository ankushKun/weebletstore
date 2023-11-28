import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const elRef = useRef(null);
  useEffect(() => {
    const el: any = elRef.current;
    if (el) {
      const onWheel = (e: any) => {
        console.log(e.deltaX, e.deltaY);
        console.log(el.scrollLeft, el.scrollWidth - el.offsetWidth);

        if (e.deltaX < -4 || e.deltaX > 4) return;

        if (el.scrollLeft == 0 && e.deltaY < 0) {
          console.log("scroll up");
          return;
        } else if (
          el.scrollWidth - el.offsetWidth == el.scrollLeft &&
          e.deltaY > 0
        ) {
          console.log("scroll down");
          return;
        } else {
          console.log("h scroll");
          e.preventDefault();
          el.scrollBy(e.deltaY, 0);
        }
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
