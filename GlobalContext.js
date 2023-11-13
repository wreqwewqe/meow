// GlobalContext.js
import React, { createContext, useContext, useReducer } from 'react';

// 定义全局上下文
const GlobalContext = createContext();

// 初始状态
const initialState = {
    lang: 'chinese',
};

// 创建一个 reducer 函数来处理状态变化
function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_VAR':
            return { ...state, lang: action.payload };
        default:
            return state;
    }
}

// 创建提供者组件
export function GlobalContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

// 自定义 hook 用于访问全局状态和 dispatch 函数
export function useGlobalContext() {
    return useContext(GlobalContext);
}
