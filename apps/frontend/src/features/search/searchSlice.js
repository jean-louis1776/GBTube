import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// адрес отфильтрованной результатом поиска БД видео
const URL = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
	// начальное состояние - список загрузок с главной страницы
	searchResult: []
}

export const getSearchResult = createAsyncThunk(
	'search/getSearchResult',
	async (searchRequest, { rejectWithValue, dispatch }) => {
		// await
		// dispatch(setVideos(searchRequest))
	}
)

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setVideos: (state, action) => {
			// поиск по БД видео
			state.searchResult = state.searchResult.find(
				video => video.title === action.payload
			)
		}
	},
	extraReducers: {
		[getSearchResult.fulfilled]: () => console.log('fulfilled'),
		[getSearchResult.pending]: () => console.log('pending'),
		[getSearchResult.rejected]: () => console.log('rejected')
	}
})

export const { setVideos } = searchSlice.actions
export default searchSlice.reducer
