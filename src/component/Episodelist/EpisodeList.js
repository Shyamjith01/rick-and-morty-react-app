import { gql, useQuery } from '@apollo/client';
import { Box, Container, Grid, Pagination } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import "./Episodelist.css";
import { useNavigate } from 'react-router-dom';


const EpisodeList = () => {
    const navigate = useNavigate();
    const [page, setpage] = useState();
    const [Search, setSearch] = useState();
    const GET_EPISODE = gql`
        query Episode($filter: FilterEpisode, $page: Int) {
        episodes(filter: $filter, page: $page) {
            info {
            count
            next
            pages
            prev
            }
            results {
            characters {
                id
                image
                name
            }
            episode
            created
            id
            name
            air_date
            }
        }
        }
    `;
    const { loading, error, data } = useQuery(GET_EPISODE, {
        variables: { page: page, filter: { name: Search } }
    });


    const handlePageChange = (event, value) => {
        setpage(value);
    }

    const handleSearch = (event, value) => {
        setSearch(event.target.value);
    }

    const handleOnclick=(episode)=>{
        navigate(`/episode/${episode.id}`);
    }


    return (
        <div className='episode-list'>
            <Container maxWidth="lg">

                <h1 className='episode_Header'>EpisodeList</h1>
                <Grid xl={12} lg={12} md={12} sm={4} style={{marginBottom:20}}>
                    <div className='episode-searchBar'>
                        <div className='userList-search_input'>
                            <input type="text" name="" placeholder='search episode name..' onChange={handleSearch} id="" />
                        </div>
                        <div className='userList-search_icon' onClick={handleSearch}>
                            <SearchIcon />
                        </div>
                    </div>
                </Grid>
                {
                    loading ? <h1>Loading...</h1> :
                        <div className='episode-container'>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2}>
                                    {
                                        data.episodes.results.map((item, i) => {
                                            return (
                                                <Grid item xl={6} xs={12} lg={6} md={6} sm={6} style={{ cursor: 'pointer' }}>
                                                    <div className='userList-user_card' onClick={(()=>handleOnclick(item))} >
                                                        <div className='userList-user_name'>
                                                            <h4 className='m-0' style={{ marginBottom: 12, marginTop: 5 }}>{item.name} - {item.episode}</h4>
                                                            <strong>{item.air_date}</strong>
                                                        </div>
                                                    </div>
                                                </Grid>
                                            )
                                        })
                                    }

                                </Grid>
                                <Stack spacing={2} className="pagination_bar">
                                    <Pagination count={Math.ceil(data?.episodes.info.count / 20)} page={page} onChange={handlePageChange} />
                                </Stack>
                            </Box>
                        </div>
                }

            </Container>
        </div>
    )
}

export default EpisodeList