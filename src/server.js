import express from "express";
import path from "path";

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore, { initializeSession } from "./store";

const app = express();

app.set( "view engine", "pug" );
app.set( "views", path.resolve( __dirname, "views" ) );
app.use( express.static( path.resolve( __dirname, "../dist" ) ) );

app.get( "/*", ( req, res ) => {
    const context = { };
    const store = createStore( );

    store.dispatch( initializeSession( ) );

    const dataRequirements =
        routes
            .filter( route => matchPath( req.url, route ) ) // 匹配路径
            .map( route => route.component ) // 选中组件
            .filter( comp => comp.serverFetch ) // 检测组件是否需要拉取数据
            .map( comp => store.dispatch( comp.serverFetch( ) ) ); // 发起action拉取对应数据存入store

    Promise.all( dataRequirements ).then( ( ) => {
        const jsx = (
            <ReduxProvider store={ store }>
                <StaticRouter context={ context } location={ req.url }>
                    <Layout />
                </StaticRouter>
            </ReduxProvider>
        );
        const reactDom = renderToString( jsx );
        const reduxState = store.getState( );
        res.render( "index", { reactDom, reduxState } );
    } );
} );

app.listen( 2019 );
