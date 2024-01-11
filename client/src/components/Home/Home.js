import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import StoryList from "../StoryList";
import StoryForm from "../StoryForm";
import { Layout } from "antd";
import style from "./style";

import { getStories } from "../../actions/stories";

const { Sider, Content } = Layout;

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStories());
    }, [dispatch]);

    return (
        <Layout>
            <Sider style={style.sider} width={400}>
                <StoryForm />
            </Sider>
            <Content style={style.content} >
                <StoryList />
            </Content>
        </Layout>
    )
}

export default Home;