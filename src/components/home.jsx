import React, { useState } from "react";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";

import Navbar from "./navbar";
import Post from "./post";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReplayIcon from "@mui/icons-material/Replay";
function Home() {
  var navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user_id")) {
      navigate("/login");
    }
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [notes, setNotes] = useState([]);
  const [mainnotes, setMainNotes] = useState([]);
  useEffect(() => {
    // console.log("hallow");
    var token = localStorage.getItem("token");
    axios.post("http://127.0.0.1:8000/notes/", { token: token }).then((a) => {
      setNotes(a.data);
      setMainNotes(a.data);
    });
    console.log(notes);
  }, []);
  const [search, setSearch] = useState("");
  const handleNotesData = async (childKey) => {
    var token = localStorage.getItem("token");
    await axios.delete(`http://127.0.0.1:8000/deletenotes/${childKey}`);
    await axios
      .post("http://127.0.0.1:8000/notes/", { token: token })
      .then((a) => {
        setNotes(a.data);
        setMainNotes(a.data);
      });
  };
  return (
    <>
      <Navbar />
      <Container
        maxWidth="100vw"
        minWidth="300px"
        style={{
          position: "absolute",
          top: "60px",
          paddingLeft: "35px",
          paddingRight: "35px",
          overflow: "hidden",
        }}
      >
        <header>
          <div className="homeheaderdiv">
            <div></div>
            <div
              // className="background"
              className="inp-search"
              style={{ backgroundColor: "white", borderRadius: "10px" }}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={mainnotes.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    className="inp"
                    {...params}
                    label="Search by title"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                    id="searchfield"
                    value={search}
                    onSelect={(e) => {
                      setSearch(e.target.value);
                    }}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                  />
                )}
              />
            </div>
            <div className="header-end">
              <Button
                variant="contained"
                className="inp"
                style={{ height: "100%" }}
                onClick={() => {
                  let arr = [];
                  for (const i of mainnotes) {
                    let title = i.title.toLowerCase();
                    let s = search.toLowerCase();

                    console.log(s);
                    if (title.includes(s)) {
                      console.log(i.title);
                      arr.push(i);
                    }
                  }
                  console.log(arr);
                  setNotes(arr);
                }}
              >
                <SearchIcon />
              </Button>
              <div style={{ justifyContent: "center" }} className="inp-yy">
                <Button
                  id="basic-button"
                  aria-controls="basic-menu"
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={async () => {
                    setSearch("");

                    setNotes(mainnotes);
                  }}
                  style={{ height: "100%" }}
                >
                  <ReplayIcon fontSize="large" />
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            {notes.map((value, key) => {
              return (
                <Post data={value} key={key} notesData={handleNotesData} />
              );
            })}

          </div>
        </main>
      </Container>
    </>
  );
}

export default Home;
