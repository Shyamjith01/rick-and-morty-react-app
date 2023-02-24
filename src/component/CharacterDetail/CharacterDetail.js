import { gql, useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import "./CharacterDetail.css";

const CharacterDetail = () => {
  const navigate = useNavigate();
  const CHARACTER = gql`
  query Character($characterId: ID!) {
    character(id: $characterId) {
      created
      episode {
        air_date
        name
        id
      }
      name
      image
      species
      location {
        id
        name
        type
      }
      origin {
        name
        type
        id
      }
      status
      gender
  }
  }`;
  let { id } = useParams()
  const { loading, error, data } = useQuery(CHARACTER, {
    variables: { characterId: id }
  });

  const showEpisodeDetail=(id)=>{
    navigate(`/episode/${id}`);
  }

  useEffect(() => {
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: 50,textAlign:'center' }}>
    <h1>Character Details</h1>
      {
        loading ? <h1>Loading...</h1> :
          <>
            <div className='character_details'>
              <div className='left_side'>
                <div className='image'>
                  <img src={data.character.image} alt='char_img' />
                </div>
              </div>
              <div className='right_side'>
                <div className='details'>
                  <h1>{data.character.name}</h1>
                  <div style={{ marginBottom: 10 }}><strong>Origin :</strong><span>{data.character.origin.name}</span></div>
                  <div style={{ marginBottom: 10 }}><strong>Location :</strong><span>{data.character.location.name}</span></div>
                  <div style={{ marginBottom: 10 }}><strong>Species :</strong><span>{data.character.species}</span></div>
                  <div style={{ marginBottom: 10 }}><strong>Gender :</strong><span>{data.character.gender}</span></div>
                  <div style={{ marginBottom: 4 }}><strong>Episodes :</strong></div>
                  <div className='episode_section'>
                    {
                      data.character.episode.map((item) => <div className='each_episode' onClick={(()=>showEpisodeDetail(item.id))}>{item.name}</div>)
                    }

                  </div>
                </div>
              </div>
            </div>
            <Link to={'/characters'} style={{fontSize:15,textDecoration:'none',marginTop:'15px'}} >Go to Character listing page</Link>
          </>
      }

    </Container>
  )
}

export default CharacterDetail