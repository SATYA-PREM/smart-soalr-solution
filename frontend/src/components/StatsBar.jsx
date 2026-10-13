import React, { useState, useEffect, useRef } from "react";

function CounterNumber({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let animated = false;
    let timer;

    const animate = () => {
      if (animated) return;
      animated = true;
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      timer = setInterval(() => {
        current = Math.min(target, current + step);
        setCount(current);
        if (current >= target) clearInterval(timer);
      }, 30);
    };

    if ("IntersectionObserver" in window && ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animate();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
        if (timer) clearInterval(timer);
      };
    } else {
      animate();
    }
  }, [target]);

  return (
    <strong className="counter" ref={ref}>
      {count}+
    </strong>
  );
}

export default function StatsBar() {
  return (
    <section className="stats">
      <div className="container stats-grid">
        <div className="stat">
          <CounterNumber target={150} />
          <span>Installations Across Bihar</span>
        </div>
        <div className="stat">
          <strong>25+ Yrs</strong>
          <span>Tier-1 Performance Warranty</span>
        </div>
        <div className="stat">
          <strong>PM Surya Ghar</strong>
          <span>Direct Subsidy Assistance</span>
        </div>
        <div className="stat">
          <strong>Local Support</strong>
          <span>Tarapur Engineering Center</span>
        </div>
      </div>
    </section>
  );
}

