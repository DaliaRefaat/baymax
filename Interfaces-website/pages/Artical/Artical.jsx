import React, { useState, useEffect } from "react";
import axios from "axios";
import Articles from "./Articles";
import css from "./Articles.module.css";
import img from "../../../../../img/wallpaperflare.com_wallpaper (2).jpg";

function Artical() {
  const [CardsArtical, setCardsArtical] = useState([]);

  useEffect(() => {
    fetchCardsArtical();

  }, []);
  const fetchCardsArtical = async () => {
    await axios.get("http://127.0.0.1:8000/api/articals").then(({ data }) => {
      setCardsArtical(data);
      console.log('====================================');
      console.log(data);
      console.log('====================================');
    });
  };
const url = "http://127.0.0.1:8000/files/";
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <h1 className="mb-1">Discover our latest blog posts and articles</h1>
        <div className={css["posts"] + " w-100"}>
          {CardsArtical.length > 0 &&
            CardsArtical.map((row) => (
              <Articles
                name={row.type}
                po={row.title}
                max={row.psychiatrist_name}
                add={String(row.body).substring(0,100)+"....."}
                dat={row.date}
                img={url+row.img}
                Link={row.id}
              />
            ))}
        </div>
      </>
    );

}

export default Artical;
