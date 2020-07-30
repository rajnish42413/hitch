import * as React from "react";
import { NavLink } from "react-router-dom";
import "./app";

import { Layout } from 'antd';

const { Header, Content,Footer} = Layout;

interface IProps {
    children: React.ReactElement;
}

function App({ children }: IProps) {
    return (
        <>
         <Layout>
            <header className="header">
                <h1>PIZZA MENU</h1>
            </header>
              <Content>
                  <div> {children}</div>
               </Content>
            <Footer style={{ textAlign: 'center' }}>©2019 Created by Rajnish Singh</Footer>
          </Layout>
      </>
    );
}

export default App;
