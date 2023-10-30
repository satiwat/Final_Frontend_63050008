import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import TaskIcon from "@mui/icons-material/Task";
import PostContainer from "../components/PostContainer";
import axios from "axios";

const Todo = () => {
  const [list, setList] = useState([]);

  const totalValue = list.reduce((total, item) => {
    return total + +item.title;
  }, 0);

  console.log("totalValue", totalValue);

  const getData = async () => {
    const url = "http://localhost:8000/todos";

    const response = await axios.get(url);

    setList(response.data.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <Box
        sx={{
          height: "70vh",
          overflowY: "auto",
        }}
      >
        <Card sx={{ marginBottom: "20px" }}>
          <CardContent>จำนวนรวม : {totalValue}</CardContent>
        </Card>

        {posts.length ? (
          <PostContainer posts={posts} callbackFn={getData} />
        ) : (
          <Box
            height="70vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor="white"
          >
            <Box textAlign="center">
              <TaskIcon
                sx={{
                  fontSize: "50px",
                }}
              />
              <Box>
                <Typography>กรุณาเพิ่มข้อมูล</Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      <Form list={list} setList={setList} callbackFn={getData} />
    </Container>
  );
};

export default Todo;
