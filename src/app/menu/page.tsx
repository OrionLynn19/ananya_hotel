"use client";

import Link from "next/link";
import React from "react";

export default function Menu() {
  const headingStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    color: "#463214",
    fontWeight: 700,
    fontSize: "48px",
    margin: 0,
    padding: 0,
  };

  const itemStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    color: "#463214",
    fontWeight: 800,
    fontSize: "36px",
    marginBottom: 24,
    textDecoration: "none",
  };

  const subItemStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    color: "#463214",
    fontWeight: 700,
    fontSize: "22px",
    marginBottom: 12,
    display: "block",
    textDecoration: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/images/b.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        paddingTop: "16px",
                justifyContent: "center",
        position: "relative",
      }}
    >

      <main
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 1200,
          padding: "80px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 40,
        }}
      >
        {/* Left column */}
        <section>
          <nav className="flex flex-col">
            <Link href="/aboutus" style={itemStyle}>
              About Us
            </Link>
            <Link href="/rooms" style={itemStyle}>
              Rooms
            </Link>
            <Link href="/promotions" style={itemStyle}>
              Promotions
            </Link>
            <Link href="/gallery" style={itemStyle}>
              Gallary
            </Link>
          </nav>
        </section>

        {/* Center column */}
        <section style={{ textAlign: "center" }}>
          <h2 style={{ ...headingStyle, fontSize: 50 }}>Discover</h2>
          <div
            style={{
              marginTop: 24,
              display: "inline-block",
              textAlign: "left",
            }}
          >
            <Link href="/about" style={subItemStyle}>
              • Restaurant
            </Link>
            <Link href="/about" style={subItemStyle}>
              • Spa
            </Link>
          </div>
        </section>

        {/* Right column */}
        <section style={{ textAlign: "left" }}>
          <h2 style={{ ...headingStyle, fontSize: 44 }}>Our Services</h2>
          <div style={{ marginTop: 18 }}>
            <Link href="/about" style={subItemStyle}>
              • Weddings
            </Link>
            <Link href="/about" style={subItemStyle}>
              • Events
            </Link>
            <Link href="/about" style={subItemStyle}>
              • Worksops
            </Link>
            <Link href="/about" style={subItemStyle}>
              • Creators' Program
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

