import React, { useEffect, useState } from 'react'
import { useQuery, gql } from '@apollo/client';
import { Chip, Container, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Pagination, Select, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import "./characters.css";
import { Box, Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Characters = () => {
  const navigate = useNavigate();
  const [count, setcount] = useState(0);
  const [page, setpage] = useState();
  const [search, setsearch] = useState("");
  const [status, setstatus] = useState("");
  const [Species, setspecies] = useState();
  const [gender, setgender] = useState("");
  const theme = useTheme();
  const [speciesList] = useState(["Choose", "Humanoid", "unknown", "Poopybutthole", "Alien", "Human", "Mythological Creature", "Cronenberg", "Disease", "Animal", "Robot"]);
  const [genderList] = useState(["Choose", "Male", "Female"]);
  const GET_CHARACTORS = gql`
  query Characters($page: Int ,$filter: FilterCharacter){
    characters(page: $page ,filter:$filter) {
    info {
      pages
      next
      prev
      count
    }
    results {
      id
      name
      image
      gender
      species
      status
    }
  }
  }`;

  const { loading, error, data } = useQuery(GET_CHARACTORS, {
    variables: { page, filter: { name: search, status: status, species: Species, gender: gender } }
  });

  useEffect(() => {
  }, []);

  const handleStatusChange = (event, value) => {
    setstatus(value.props.value);
  }
  const handleChange = (event, value) => {
    setpage(value);
  }

  const HandleGender = (event, value) => {
    setgender(value.props.value);
  }



  const handleSearch = (event, value) => {
    setsearch(event.target.value);
  }

  const HandleSpecies = (event, value) => {
    setspecies(value.props.value);
  }

  const handleOnclick = (user) => {
    navigate(`/character/${user.id}`);
  }

  return (
    <Container maxWidth="xl" style={{ marginTop: '2rem', textAlign: 'center' }}>
      <h1>Characters list</h1>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={2} className='filter_header' style={{marginBottom:29}}>
          <Grid item xl={3} lg={3} md={3} xs={12} sm={12}>
            <div className='userList-searchBar'>
              <div className='userList-search_input'>
                <input type="text" name="" placeholder='search...' onChange={handleSearch} id="" />
              </div>
              <div className='userList-search_icon' onClick={handleSearch}>
                <SearchIcon />
              </div>
            </div>
          </Grid>
          <Grid item xl={3} lg={3} md={2} xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={""}>Choose</MenuItem>
                <MenuItem value={"Alive"}>Alive</MenuItem>
                <MenuItem value={"Dead"}>Dead</MenuItem>
                <MenuItem value={"Unknown"}>Unknown</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xl={3} lg={3} md={2} xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Species</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={Species}
                label="Species"
                onChange={HandleSpecies}
              >
                {speciesList.map((data) => <MenuItem value={data == "Choose" ? "" : data}>{data}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xl={3} lg={3} md={2} xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={HandleGender}
              >
                {genderList.map((data) => <MenuItem value={data == "Choose" ? "" : data}>{data}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <div className='loading'>{loading || error ? <h1>loading...</h1> :
        <div className='char'>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {
                data.characters.results.map((user, key) => {
                  return (
                    <Grid item xl={3} xs={12} lg={3} md={4} sm={6} key={key} style={{ cursor: 'pointer' }}>
                      <div className='userList-user_card' onClick={(() => handleOnclick(user))}>
                        <div className='userList-userImage'>
                          <img src={user.image} alt="" />
                        </div>
                        <div className='userList-user_name'>
                          <h4>{user.name}</h4>
                          <h5 style={{ marginTop: 8 }}>{user.species}</h5>
                        </div>
                      </div>
                    </Grid>
                  )
                })
              }
            </Grid>
            <Stack spacing={2} className="pagination_bar">
              <Pagination count={Math.ceil(data?.characters.info.count / 20)} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </div>}
      </div>
    </Container>
  )
}

export default Characters