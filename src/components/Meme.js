import React from "react";
import "./Meme.css";

function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/3oevdk.jpg",
    title: "",
  });

  const [allMemeImages, setAllMemeImages] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((generator) => setAllMemeImages(generator.data.memes));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => {
      return {
        ...prevMeme,
        [name]: value,
      };
    });
  }

  function animateImage(imageDiv) {
    console.log(imageDiv);
    imageDiv.className = "animate__animated animate__bounceIn animate__faster";
    setTimeout(() => {
      imageDiv.className = "animate__animated";
    }, 500);
  }

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemeImages.length);
    const url = allMemeImages[randomNumber].url;
    const title = allMemeImages[randomNumber].name;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
      title: title,
    }));
    animateImage(document.getElementById("image-div"));
  }

  return (
    <main>
      <div className="container">
        <div className="row p-3">
          <div className="col">
            <input
              type="text"
              placeholder="Top Text"
              className="w-100 form-control-plaintext border border-secondary bg-white"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Bottom Text"
              className="w-100 form-control-plaintext border border-secondary bg-white"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row pl-3 pr-3 pb-3">
          <div className="col">
            <button className="w-100 btn btn-info" onClick={getMemeImage}>
              Get a new image
            </button>
            <br />
            <br />
            <h3>{meme.title}</h3>
          </div>
        </div>

        <div className="row pl-3 pr-3 pb-3">
          <div className="col">
            <div id="image-div" className="">
              <img src={meme.randomImage} className="w-100" onClick={getMemeImage}/>
            </div>
            <div id="top-text" className="">
              <h2 className="meme--text top">{meme.topText}</h2>
            </div>
            <h2 className="meme--text bottom" id="bottom-text">
              {meme.bottomText}
            </h2>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Meme;
