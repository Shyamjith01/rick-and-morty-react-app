import { gql, useQuery } from '@apollo/client';
import { Container } from '@mui/material'
import React from 'react';
import "./EpisodeDetail.css";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EpisodeDetail = () => {
    const navigate = useNavigate();
    const EPISODE = gql`
    query Episode($episodeId: ID!) {
        episode(id: $episodeId) {
            air_date
            characters {
            id
            name
            }
            episode
            name
            id
        }
    }`;
    let { id } = useParams();
    const { loading, error, data } = useQuery(EPISODE, {
        variables: { episodeId: id }
    });


    const showUserDetails=(id)=>{
        navigate(`/character/${id}`);
    }


    return (
        <div className='episode_detail'>
            <Container maxWidth="lg">
                <h1 style={{marginBottom:0}}>Episode Details</h1>
                {loading ? <h1>Loading....</h1> :
                    <div className='episode_details'>
                        <div className='right_side'>
                            <div className='details'>
                                <h1>{data.episode.name}</h1>
                                <h3 style={{ margin: 0 }}>Air date : {data.episode.air_date}</h3>
                                <h4>characters played :</h4>
                                <div className='character_section'>
                                    {
                                        data.episode.characters.map((item) => <div className='each_character' onClick={(()=>showUserDetails(item.id))} >{item.name}</div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Container>
        </div>
    )
}

export default EpisodeDetail