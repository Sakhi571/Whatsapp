import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const GetApi = createApi({
    reducerPath: 'getapi',
    baseQuery : fetchBaseQuery({ baseUrl: "http://192.168.1.101:3007/api" }),
    endpoints: builder => ({
        getData : builder.query({
            query: ()=> ({
                url:  '/conversations/667976aa29428f5d4f02f79d',
                method: 'get',
            }),
        }),
        getConservation: builder.query ({
            query: ()=>({
                url:'/chats?senderId=667976aa29428f5d4f02f79d&receiverId=667976aa29428f5d4f02f79c&page=1&pageSize=10',
                method: 'get',
            }),
        }),
        addData: builder.mutation({
            query: data =>({
                url:'/chats',
                method:'POST',
                body: data
            })
        })
    }),
});
export const {useGetDataQuery , useGetConservationQuery , useAddDataMutation} = GetApi;