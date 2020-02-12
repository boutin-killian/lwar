import React, {useState, useEffect} from "react";
import axios from "axios";
import {Grid, Segment} from "semantic-ui-react";
import ArticleCard from "./ArticleCard";

export default function MusicsList() {
  const [photoFound, setMusicFound] = useState([]);
  const [photos, setMusics] = useState([]);
  const [filteredMusic, setFilteredMusic] = useState([]);

  useEffect(() => {
    setMusicFound(false);
    axios.get("http://localhost:3001/articles?type=photo").then(res => {
      const photos = res.data;
      setMusicFound(true);
      setMusics(photos);
      setFilteredMusic(photos);
    });
  }, []);

  function getFilteredMusics(e) {
    setFilteredMusic(photos.filter((photo) => {
      let photoTitle = photo.title.toLowerCase();
      return photoTitle.indexOf(e.target.value.toLowerCase()) !== -1
    }));
  }

  return (
      <div className={"articles-div"}>
        <h3>Photos</h3>
        {!photoFound ? (
            <div>Chargement des photos...</div>
        ) : (
            <div>
              <div className={"filter-div"}>
                <label htmlFor="filter">Filtre par titre: </label>
                <input type="text" id="filter"
                       onChange={getFilteredMusics}/>
              </div>
              {filteredMusic.length === 0 ? (
                  <div>Aucune photo trouvée.</div>
              ) : (
                  <Grid columns={3} doubling stackable>
                    {filteredMusic.map(photo => (
                        <Grid.Column key={photo.id}>
                          <Segment style={{height: "26em"}}>
                            <ArticleCard data={photo} type={photo.type} typeLabel={"Photo"}/>
                          </Segment>
                        </Grid.Column>
                    ))}
                  </Grid>
              )}
            </div>
        )}
      </div>
  );
}
